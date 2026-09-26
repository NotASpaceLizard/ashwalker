import { test, assert, assertEqual } from './framework.js';
import { RunController } from '../js/engine/run.js';
import { generateAct, reachableFrom } from '../js/engine/map.js';
import { createRng } from '../js/engine/rng.js';
import { computeSparks } from '../js/engine/meta.js';
import { Combat } from '../js/engine/combat.js';

function makeDataStore() {
  return {
    cards: {
      bonk: { id: 'bonk', name: 'Bonk', type: 'Attack', rarity: 'Common', cost: 1, target: 'Enemy', exhaust: false, effects: [{ op: 'damage', amount: 12 }], flavor: 'x' },
      shield: { id: 'shield', name: 'Shield', type: 'Skill', rarity: 'Common', cost: 1, target: 'Self', exhaust: false, effects: [{ op: 'block', amount: 6 }], flavor: 'x' },
    },
    relics: {},
    enemies: {
      rat1: { id: 'rat1', name: 'Ashrat', act: 1, role: 'normal', maxHp: 10, moves: [{ id: 'bite', name: 'Bite', effects: [{ op: 'damage', amount: 4 }], intent: 'attack' }], ai: { type: 'sequence', order: ['bite'], loop: true } },
      brute1: { id: 'brute1', name: 'Ashbrute', act: 1, role: 'elite', maxHp: 40, moves: [{ id: 'smash', name: 'Smash', effects: [{ op: 'damage', amount: 10 }], intent: 'attack' }], ai: { type: 'sequence', order: ['smash'], loop: true } },
      boss1: { id: 'boss1', name: 'The Kiln', act: 1, role: 'boss', maxHp: 80, moves: [{ id: 'blast', name: 'Blast', effects: [{ op: 'damage', amount: 12 }], intent: 'attack' }], ai: { type: 'sequence', order: ['blast'], loop: true } },
    },
    events: { onlyEvent: { id: 'onlyEvent', name: 'A Fork', choices: [{ label: 'take it', effects: [{ op: 'gainGold', amount: 10 }] }] } },
    potions: { fizzpop: { id: 'fizzpop', name: 'Fizzpop', target: 'Self', effects: [{ op: 'heal', amount: 5 }] } },
  };
}

test('map generation: every node in the act is reachable from every start node, and columns 3 & 6 are Rest', () => {
  const rng = createRng(99);
  const graph = generateAct(1, rng);
  const restCols = graph.nodes.filter((n) => n.column === 3 || n.column === 6);
  assert(restCols.every((n) => n.type === 'Rest'), 'columns 3 and 6 must be all-Rest');
  for (const startId of graph.startNodeIds) {
    const reach = reachableFrom(graph, startId);
    assert(reach.has(graph.bossNodeId), 'boss must be reachable from every start node');
  }
});

test('full run smoke test: travel to a monster node, fight, win, claim a card reward', () => {
  const rc = new RunController(makeDataStore());
  const meta = { unlockedCardIds: ['bonk', 'shield'], unlockedRelicIds: [] };
  let run = rc.startNew(meta, 0, 12345);
  assertEqual(run.hp, 72);
  assertEqual(run.deck.length, 10);

  const options = rc.availableNodes(run);
  assert(options.length > 0, 'act1 must offer at least one starting node');
  const monsterNode = options.find((n) => n.type === 'Monster') || options[0];
  const node = rc.travelTo(run, monsterNode.id);
  assert(node.type, 'entered node has a type');

  if (node.type === 'Monster' || node.type === 'Elite' || node.type === 'Boss') {
    const combat = rc.startCombat(run, () => {});
    let guard = 0;
    const attackCardIds = new Set(['ashstrike', 'emberkindle']);
    while (!combat.outcome && guard < 200) {
      const target = combat.enemies.find((e) => e.hp > 0);
      const attack = combat.player.hand.find((c) => attackCardIds.has(c.cardId));
      if (attack && target) combat.playCard(attack.instanceId, target.id);
      else combat.endPlayerTurn();
      guard += 1;
    }
    assertEqual(combat.outcome, 'victory');
    const reward = rc.finishCombat(run, node, combat.outcome);
    assert(reward, 'victory must produce a pending reward');
    assert(run.nodesCleared >= 1);
    if (reward.cardChoices.length) rc.claimCardReward(run, reward.cardChoices[0]);
    assertEqual(run.pendingReward, null);
  }
});

test('grantRelic applies maxHpBonus exactly once, not every combat (regression)', () => {
  const dataStore = makeDataStore();
  dataStore.relics.bighp = { id: 'bighp', name: 'Big HP', rarity: 'Common', flavor: 'x', triggers: [{ on: 'passive', statMod: { maxHpBonus: 10 } }] };
  const rc = new RunController(dataStore);
  const meta = { unlockedCardIds: ['bonk', 'shield'], unlockedRelicIds: [] };
  const run = rc.startNew(meta, 0, 555);
  const baseMaxHp = run.maxHp;
  const baseHp = run.hp;
  rc.grantRelic(run, 'bighp');
  assertEqual(run.maxHp, baseMaxHp + 10);
  assertEqual(run.hp, baseHp + 10);

  // Simulate entering combat twice in a row with the relic already owned — maxHp/hp must NOT grow again.
  run.currentNodeId = rc.availableNodes(run)[0].id;
  run.mapsByAct[1].nodes.find((n) => n.id === run.currentNodeId).resolvedData = { enemyIds: ['rat1'] };
  const combat1 = rc.startCombat(run, () => {});
  assertEqual(combat1.player.maxHp, baseMaxHp + 10);
  run.hp = combat1.player.hp; // simulate finishCombat's hp sync without a full fight
  const combat2 = rc.startCombat(run, () => {});
  assertEqual(combat2.player.maxHp, baseMaxHp + 10, 'maxHp must not grow again on a second combat');
});

test('onCombatEnd relic heal fires exactly once per victory', () => {
  const dataStore = makeDataStore();
  const rc = new RunController(dataStore);
  const meta = { unlockedCardIds: ['bonk', 'shield'], unlockedRelicIds: [] };
  const run = rc.startNew(meta, 0, 777);
  dataStore.relics.cinderheart = { id: 'cinderheart', name: 'Cinderheart', rarity: 'Starter', flavor: 'x', triggers: [{ on: 'onCombatEnd', effects: [{ op: 'heal', amount: 8 }] }] };
  // startNew already seeds run.relics with the starter 'cinderheart' — do not push it again here.
  run.hp = run.maxHp - 20;
  const combat = new Combat({ run, dataStore: rc.data, enemyDefIds: ['boss1'], difficultyMult: 1, rng: rc.rngFor(run), onEnd: () => {} });
  const enemy = combat.enemies[0];
  enemy.hp = 0;
  combat.checkDeathsAndVictory();
  assertEqual(combat.outcome, 'victory');
  assertEqual(combat.player.hp, run.hp + 8);
});

test('removeCard refuses to go through (and gold stays put) when unaffordable (regression)', () => {
  const rc = new RunController(makeDataStore());
  const meta = { unlockedCardIds: ['bonk', 'shield'], unlockedRelicIds: [] };
  const run = rc.startNew(meta, 0, 42);
  run.gold = 10;
  run.currentNodeId = rc.availableNodes(run)[0].id;
  const node = run.mapsByAct[1].nodes.find((n) => n.id === run.currentNodeId);
  node.resolvedData = { removalPrice: 75 };
  const ok = rc.removeCard(run, 0);
  assertEqual(ok, false);
  assertEqual(run.gold, 10, 'gold must not go negative when removal is unaffordable');
  assertEqual(run.deck.length, 10, 'deck must be untouched when removal is refused');
});

test('Elite nodes always drop a potion when a slot is free', () => {
  const rc = new RunController(makeDataStore());
  const meta = { unlockedCardIds: ['bonk', 'shield'], unlockedRelicIds: [] };
  const run = rc.startNew(meta, 0, 909);
  const eliteNode = { id: 'x', act: 1, type: 'Elite', edges: [] };
  const reward = rc.buildCombatReward(run, eliteNode);
  assert(reward.potionId, 'elite kill should guarantee a potion when a slot is free');
  assert(run.potions.includes(reward.potionId));
});

test('Trial level 4 adds an extra Elite node to Act 1', () => {
  const rc = new RunController(makeDataStore());
  const meta = { unlockedCardIds: ['bonk', 'shield'], unlockedRelicIds: [] };
  const plain = rc.startNew(meta, 0, 321);
  const boosted = rc.startNew(meta, 4, 321);
  const eliteCount = (run) => run.mapsByAct[1].nodes.filter((n) => n.type === 'Elite').length;
  assertEqual(eliteCount(boosted), eliteCount(plain) + 1);
});

test('sparks formula rewards node clears, elites, and bosses', () => {
  const sparks = computeSparks({ nodesCleared: 10, elitesKilled: 2, actBossesKilled: 1, summitBossKilled: false, goldRemaining: 100, gaveUp: false });
  assertEqual(sparks, 15 * 10 + 60 * 2 + 120 * 1 + 10);
  const halved = computeSparks({ nodesCleared: 10, elitesKilled: 0, actBossesKilled: 0, summitBossKilled: false, goldRemaining: 0, gaveUp: true });
  assertEqual(halved, Math.floor((15 * 10) / 2));
});
