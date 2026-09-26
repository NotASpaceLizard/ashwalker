import { test, assert, assertEqual } from './framework.js';
import { createRng, seedFromString } from '../js/engine/rng.js';
import { getStatus, addStatus } from '../js/engine/statuses.js';
import { runEffects } from '../js/engine/effects.js';
import { Combat, HAND_CAP } from '../js/engine/combat.js';

test('rng is deterministic for a given seed', () => {
  const a = createRng(42);
  const b = createRng(42);
  const seqA = [a.next(), a.next(), a.next()];
  const seqB = [b.next(), b.next(), b.next()];
  assertEqual(seqA, seqB);
});

test('rng state can be saved and restored', () => {
  const a = createRng(seedFromString('ashwalker'));
  a.next(); a.next();
  const state = a.getState();
  const expected = a.next();
  const b = createRng(0);
  b.setState(state);
  assertEqual(b.next(), expected);
});

test('status stacks add and clear at zero', () => {
  const c = { statuses: {} };
  addStatus(c, 'Strength', 2);
  addStatus(c, 'Strength', 3);
  assertEqual(getStatus(c, 'Strength'), 5);
});

function makeDataStore(overrides = {}) {
  return {
    cards: {
      strike: { id: 'strike', name: 'Strike', type: 'Attack', cost: 1, target: 'Enemy', exhaust: false, effects: [{ op: 'damage', amount: 6 }] },
      defend: { id: 'defend', name: 'Defend', type: 'Skill', cost: 1, target: 'Self', exhaust: false, effects: [{ op: 'block', amount: 5 }] },
      scryTest: { id: 'scryTest', name: 'Peer', type: 'Skill', cost: 0, target: 'None', exhaust: false, effects: [{ op: 'scry', count: 2 }] },
      xburn: { id: 'xburn', name: 'Xburn', type: 'Attack', cost: 'X', target: 'Enemy', exhaust: true, effects: [{ op: 'repeatX', effects: [{ op: 'damage', amount: 4 }] }] },
      ...(overrides.cards || {}),
    },
    relics: overrides.relics || {},
    enemies: {
      dummy: { id: 'dummy', name: 'Training Dummy', maxHp: 20, moves: [{ id: 'poke', name: 'Poke', effects: [{ op: 'damage', amount: 5 }], intent: 'attack' }], ai: { type: 'sequence', order: ['poke'], loop: true } },
      ...(overrides.enemies || {}),
    },
    potions: overrides.potions || {},
  };
}

function makeRun(deckIds) {
  return { hp: 50, maxHp: 50, gold: 99, relics: [], deck: deckIds.map((cardId) => ({ cardId, upgraded: false })) };
}

test('damage effect subtracts block then hp, and enemy dies on lethal damage', () => {
  const rng = createRng(1);
  const data = makeDataStore();
  const run = makeRun(['strike', 'strike', 'strike', 'strike', 'defend']);
  const combat = new Combat({ run, dataStore: data, enemyDefIds: ['dummy'], difficultyMult: 1, rng });
  const enemy = combat.enemies[0];
  assertEqual(enemy.hp, 20);
  const strikeInHand = combat.player.hand.find((c) => c.cardId === 'strike');
  assert(strikeInHand, 'expected a strike in opening hand');
  combat.playCard(strikeInHand.instanceId, enemy.id);
  assertEqual(enemy.hp, 14);
});

test('block absorbs damage before hp loss', () => {
  const rng = createRng(2);
  const data = makeDataStore();
  const run = makeRun(['defend', 'strike', 'strike', 'strike', 'strike']);
  const combat = new Combat({ run, dataStore: data, enemyDefIds: ['dummy'], difficultyMult: 1, rng });
  const defendCard = combat.player.hand.find((c) => c.cardId === 'defend');
  combat.playCard(defendCard.instanceId, null);
  assertEqual(combat.player.block, 5);
  combat.endPlayerTurn();
  // dummy's Poke deals 5, fully absorbed by block
  assertEqual(combat.player.hp, 50);
});

test('Vulnerable increases damage taken by 50%, floored', () => {
  const rng = createRng(3);
  const data = makeDataStore();
  const run = makeRun(['strike', 'strike', 'strike', 'strike', 'defend']);
  const combat = new Combat({ run, dataStore: data, enemyDefIds: ['dummy'], difficultyMult: 1, rng });
  const enemy = combat.enemies[0];
  addStatus(enemy, 'Vulnerable', 1);
  const strikeInHand = combat.player.hand.find((c) => c.cardId === 'strike');
  combat.playCard(strikeInHand.instanceId, enemy.id);
  // 6 base * 1.5 = 9
  assertEqual(enemy.hp, 11);
});

test('X-cost card spends all ember and repeats effect that many times', () => {
  const rng = createRng(4);
  const data = makeDataStore();
  const run = makeRun(['xburn', 'defend', 'defend', 'defend', 'defend']);
  const combat = new Combat({ run, dataStore: data, enemyDefIds: ['dummy'], difficultyMult: 1, rng });
  const enemy = combat.enemies[0];
  const xburn = combat.player.hand.find((c) => c.cardId === 'xburn');
  assertEqual(combat.player.ember, 3);
  combat.playCard(xburn.instanceId, enemy.id);
  assertEqual(combat.player.ember, 0);
  // 3 hits of 4 damage = 12
  assertEqual(enemy.hp, 8);
  assert(combat.player.exhaustPile.some((c) => c.cardId === 'xburn'), 'xburn should exhaust');
});

test('scry raises a pending choice and resolving it discards the chosen cards', () => {
  const rng = createRng(5);
  const data = makeDataStore();
  const run = makeRun(['scryTest', 'strike', 'strike', 'strike', 'strike', 'defend', 'defend', 'defend']);
  const combat = new Combat({ run, dataStore: data, enemyDefIds: ['dummy'], difficultyMult: 1, rng });
  const scryCard = combat.player.hand.find((c) => c.cardId === 'scryTest');
  const beforeDrawLen = combat.player.drawPile.length;
  const res = combat.playCard(scryCard.instanceId, null);
  assert(res.pendingChoice, 'expected a pending choice from scry');
  assertEqual(res.pendingChoice.type, 'scry');
  const toDiscard = res.pendingChoice.cards.map((c) => c.instanceId).slice(0, 1);
  const before = combat.player.discardPile.length;
  combat.resolvePendingChoice(toDiscard);
  assertEqual(combat.player.discardPile.length, before + 1);
  assertEqual(combat.player.drawPile.length + combat.player.discardPile.length, beforeDrawLen + before);
});

test('hand cap discards drawn cards immediately once hand is full', () => {
  const rng = createRng(6);
  const data = makeDataStore();
  const deck = Array.from({ length: 15 }, () => 'strike');
  const run = makeRun(deck);
  const combat = new Combat({ run, dataStore: data, enemyDefIds: ['dummy'], difficultyMult: 1, rng });
  combat.drawCards(20);
  assert(combat.player.hand.length <= HAND_CAP, 'hand must never exceed HAND_CAP');
});

test('victory is detected when all enemies reach 0 hp', () => {
  const rng = createRng(7);
  const data = makeDataStore({ enemies: { weak: { id: 'weak', name: 'Weak Thing', maxHp: 1, moves: [{ id: 'nop', name: 'Nop', effects: [], intent: 'unknown' }], ai: { type: 'sequence', order: ['nop'], loop: true } } } });
  const run = makeRun(['strike', 'strike', 'strike', 'strike', 'defend']);
  const combat = new Combat({ run, dataStore: data, enemyDefIds: ['weak'], difficultyMult: 1, rng });
  const strikeInHand = combat.player.hand.find((c) => c.cardId === 'strike');
  const res = combat.playCard(strikeInHand.instanceId, combat.enemies[0].id);
  assertEqual(res.outcome, 'victory');
});

test('difficulty multiplier scales enemy max hp', () => {
  const rng = createRng(8);
  const data = makeDataStore();
  const run = makeRun(['defend', 'defend', 'defend', 'defend', 'defend']);
  const combat = new Combat({ run, dataStore: data, enemyDefIds: ['dummy'], difficultyMult: 1.35, rng });
  assertEqual(combat.enemies[0].maxHp, Math.round(20 * 1.35));
});
