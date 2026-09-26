// Combat orchestration: turn structure, piles, targeting, enemy AI, relic triggers.
// Design contract (see DESIGN_BIBLE.md section 5 & 7):
//  - The engine resolves an entire action (play a card / end turn / resolve a choice) synchronously and
//    produces an ordered `log` of events. The UI layer replays that log with timed animations; engine
//    state is already final the instant the call returns. This keeps the engine trivially unit-testable.
//  - `discard(count, random=false)` : random discards `count` random cards; non-random ALWAYS means
//    "discard the whole hand" (count is ignored) — the only two real uses in this game's content.
//  - Only `scry` and `exhaustCard` with a `hand-chosen(n)` selector can pause mid-effect-list for player
//    input; when that happens the remaining effects of that same list are queued on `pendingChoice` and
//    resumed by `resolvePendingChoice()`.
import { runEffects, evalCondition, livingEnemies, isAlive, scaleEffects } from './effects.js';
import { getStatus, addStatus, setStatus, DECAYS_AT_TURN_END } from './statuses.js';

export const HAND_CAP = 10;
let uid = 0;
function nextId(prefix) { uid += 1; return `${prefix}${uid}`; }

function resolveCardDef(cardStore, instance) {
  const base = cardStore[instance.cardId];
  if (!base) throw new Error(`Unknown card id ${instance.cardId}`);
  if (!instance.upgraded || !base.upgrade) return base;
  const up = base.upgrade;
  return {
    ...base,
    cost: up.cost !== undefined ? up.cost : base.cost,
    effects: up.effects !== undefined ? up.effects : base.effects,
  };
}

function targetModeFor(cardTarget) {
  if (cardTarget === 'Enemy') return 'ChosenEnemy';
  if (cardTarget === 'AllEnemies') return 'AllEnemies';
  return 'Self';
}

function makeCombatant({ id, name, hp, maxHp, isPlayer, enemyDefId }) {
  return { id, name, hp, maxHp, block: 0, statuses: {}, isPlayer: !!isPlayer, enemyDefId };
}

export class Combat {
  constructor({ run, dataStore, enemyDefIds, difficultyMult, extraHpMult = 1, extraDmgMult = 1, eliteStartingStrength = 0, bossSecondActionThreshold = null, summitEnrageTurn = null, rng, onEnd }) {
    this.run = run;
    this.data = dataStore; // { cards, relics, enemies, potions }
    this.rng = rng;
    this.hpMult = (difficultyMult || 1) * extraHpMult;
    this.dmgMult = (difficultyMult || 1) * extraDmgMult;
    this.eliteStartingStrength = eliteStartingStrength;
    this.bossSecondActionThreshold = bossSecondActionThreshold;
    this.summitEnrageTurn = summitEnrageTurn;
    this.onEnd = onEnd || (() => {});
    this.log = [];
    this.cardsPlayedThisTurn = 0;
    this.turnNumber = 0;
    this.outcome = null; // 'victory' | 'defeat' | null
    this.pendingChoice = null;

    // maxHpBonus is intentionally excluded here: it's applied ONCE, permanently, to run.maxHp/run.hp at
    // the moment a relic is granted (see RunController#grantRelic) — recomputing it per-combat would
    // re-heal the player by that amount every single fight, which is the bug this comment is guarding.
    const relicDefs = run.relics.map((rid) => this.data.relics[rid]).filter(Boolean);
    const statMods = relicDefs
      .flatMap((r) => r.triggers.filter((t) => t.on === 'passive').map((t) => t.statMod))
      .filter((m) => m)
      .reduce((acc, m) => ({ ...acc, ...Object.fromEntries(Object.entries(m).filter(([k]) => k !== 'maxHpBonus').map(([k, v]) => [k, (acc[k] || 0) + v])) }), {});

    this.player = makeCombatant({ id: 'player', name: 'Ashwalker', hp: run.hp, maxHp: run.maxHp, isPlayer: true });
    this.player.ember = 0;
    this.player.emberMax = 3 + (statMods.emberPerTurnBonus || 0);
    this.player.hand = [];
    this.player.discardPile = [];
    this.player.exhaustPile = [];
    this.player.drawPile = this.rng.shuffle(run.deck.map((c) => ({ ...c, instanceId: nextId('c'), permanent: true })));
    this.startingBlockBonus = statMods.startingBlockBonus || 0;

    this.relicTriggers = relicDefs.flatMap((r) => r.triggers.filter((t) => t.on !== 'passive').map((t) => ({ ...t, relicId: r.id })));

    this.enemies = enemyDefIds.map((defId, i) => this.instantiateEnemy(defId, i));
    this.enemies.forEach((e) => this.queueNextIntent(e, true));

    this.fireRelicTrigger('onCombatStart', {});
    this.startPlayerTurn();
  }

  instantiateEnemy(defId, index) {
    const def = this.data.enemies[defId];
    if (!def) throw new Error(`Unknown enemy id ${defId}`);
    const maxHp = Math.round(def.maxHp * this.hpMult);
    const e = makeCombatant({ id: nextId('e'), name: def.name, hp: maxHp, maxHp, enemyDefId: defId });
    e.aiState = {};
    e.boardIndex = index;
    if (def.role === 'elite' && this.eliteStartingStrength) addStatus(e, 'Strength', this.eliteStartingStrength);
    return e;
  }

  ctxFor(source, chosenTarget, defaultTargetMode, spentEmber) {
    return { combat: this, source, chosenTarget, defaultTargetMode, rng: this.rng, log: this.log, spentEmber };
  }

  // ---------- turn lifecycle ----------
  startPlayerTurn() {
    this.log = [];
    this.turnNumber += 1;
    this.player.block = this.turnNumber === 1 ? this.startingBlockBonus : 0;
    this.cardsPlayedThisTurn = 0;
    this.player.ember = this.player.emberMax;
    const innate = this.turnNumber === 1 ? this.player.drawPile.filter((c) => this.data.cards[c.cardId]?.innate) : [];
    innate.forEach((c) => {
      this.player.drawPile.splice(this.player.drawPile.indexOf(c), 1);
      this.player.hand.push(c);
    });
    this.drawCards(Math.max(0, 5 - this.player.hand.length));
    this.fireRelicTrigger('onTurnStart', {});
    return this.log;
  }

  playCard(instanceId, chosenEnemyId) {
    this.log = [];
    if (this.outcome) return { log: this.log, outcome: this.outcome };
    const cardInst = this.player.hand.find((c) => c.instanceId === instanceId);
    if (!cardInst) { this.log.push({ type: 'error', message: 'card not in hand' }); return { log: this.log }; }
    const def = resolveCardDef(this.data.cards, cardInst);
    const cost = def.cost === 'X' ? this.player.ember : def.cost;
    if (this.player.ember < cost) { this.log.push({ type: 'error', message: 'not enough ember' }); return { log: this.log }; }
    let chosenTarget = null;
    if (def.target === 'Enemy') {
      chosenTarget = this.enemies.find((e) => e.id === chosenEnemyId && isAlive(e));
      if (!chosenTarget) { this.log.push({ type: 'error', message: 'needs a target' }); return { log: this.log }; }
    }
    this.player.ember -= cost;
    this.player.hand.splice(this.player.hand.indexOf(cardInst), 1);
    (def.exhaust ? this.player.exhaustPile : this.player.discardPile).push(cardInst);
    this.cardsPlayedThisTurn += 1;
    this.log.push({ type: 'cardPlayed', cardId: def.id, name: def.name });

    const ctx = this.ctxFor(this.player, chosenTarget, targetModeFor(def.target), def.cost === 'X' ? cost : undefined);
    runEffects(def.effects, ctx);
    this.afterEffects(ctx);
    this.fireRelicTrigger('onCardPlayed', { cardType: def.type });
    return { log: this.log, outcome: this.outcome, pendingChoice: this.describeChoice() };
  }

  usePotion(potionDef, chosenEnemyId) {
    this.log = [];
    if (this.outcome) return { log: this.log, outcome: this.outcome };
    let chosenTarget = null;
    if (potionDef.target === 'Enemy') {
      chosenTarget = this.enemies.find((e) => e.id === chosenEnemyId && isAlive(e));
      if (!chosenTarget) { this.log.push({ type: 'error', message: 'needs a target' }); return { log: this.log }; }
    }
    const ctx = this.ctxFor(this.player, chosenTarget, targetModeFor(potionDef.target));
    runEffects(potionDef.effects, ctx);
    this.afterEffects(ctx);
    return { log: this.log, outcome: this.outcome, pendingChoice: this.describeChoice() };
  }

  resolvePendingChoice(selection) {
    if (!this.pendingChoice) return { log: [], outcome: this.outcome };
    this.log = [];
    const pc = this.pendingChoice;
    this.pendingChoice = null;
    pc.resolve(selection || []);
    if (pc.remaining && pc.remaining.length) runEffects(pc.remaining, pc.ctx);
    this.afterEffects(pc.ctx);
    return { log: this.log, outcome: this.outcome, pendingChoice: this.describeChoice() };
  }

  describeChoice() {
    if (!this.pendingChoice) return null;
    const { type, count, cards } = this.pendingChoice;
    return { type, count, cards: cards.map((c) => ({ instanceId: c.instanceId, cardId: c.cardId })) };
  }

  endPlayerTurn() {
    this.log = [];
    if (this.outcome) return { log: this.log, outcome: this.outcome };
    const toDiscard = this.player.hand.filter((c) => !resolveCardDef(this.data.cards, c).retain);
    toDiscard.forEach((c) => this.player.hand.splice(this.player.hand.indexOf(c), 1));
    this.player.discardPile.push(...toDiscard);
    this.endOfTurnStatusTick(this.player);
    this.fireRelicTrigger('onTurnEnd', {});
    if (!this.outcome) this.runEnemyTurn();
    if (!this.outcome) this.startPlayerTurn();
    return { log: this.log, outcome: this.outcome };
  }

  runEnemyTurn() {
    for (const enemy of this.enemies) {
      if (!isAlive(enemy) || this.outcome) continue;
      this.resolveEnemyIntent(enemy);
      const def = this.data.enemies[enemy.enemyDefId];
      if (isAlive(enemy) && !this.outcome && def.role === 'boss' && this.bossSecondActionThreshold != null
        && enemy.hp / enemy.maxHp <= this.bossSecondActionThreshold) {
        this.log.push({ type: 'enrageSecondAction', source: enemy.id });
        this.resolveEnemyIntent(enemy);
      }
      if (isAlive(enemy) && !this.outcome) {
        this.endOfTurnStatusTick(enemy);
        this.queueNextIntent(enemy, false);
      }
    }
  }

  resolveEnemyIntent(enemy) {
    if (getStatus(enemy, 'Stagger') > 0) {
      setStatus(enemy, 'Stagger', 0);
      this.log.push({ type: 'staggered', target: enemy.id });
      return;
    }
    if (!enemy.intent) return;
    const def = this.data.enemies[enemy.enemyDefId];
    const move = def.moves.find((m) => m.id === enemy.intent.moveId);
    this.log.push({ type: 'enemyMove', source: enemy.id, moveId: move.id, name: move.name });
    let mult = this.dmgMult;
    if (this.summitEnrageTurn && this.turnNumber > this.summitEnrageTurn && def.role === 'boss') mult *= 1.5;
    const ctx = this.ctxFor(enemy, this.player, 'ChosenEnemy');
    runEffects(scaleEffects(move.effects, mult), ctx);
    this.afterEffects(ctx, true);
  }

  endOfTurnStatusTick(c) {
    DECAYS_AT_TURN_END.forEach((s) => {
      const cur = getStatus(c, s);
      if (cur > 0) setStatus(c, s, cur - 1);
    });
    const scorch = getStatus(c, 'Scorch');
    if (scorch > 0) {
      c.hp = Math.max(0, c.hp - scorch);
      setStatus(c, 'Scorch', scorch - 1);
      this.log.push({ type: 'scorch', target: c.id, amount: scorch });
    }
    const mend = getStatus(c, 'Embermend');
    if (mend > 0) {
      c.hp = Math.min(c.maxHp, c.hp + mend);
      setStatus(c, 'Embermend', mend - 1);
      this.log.push({ type: 'embermend', target: c.id, amount: mend });
    }
    const plate = getStatus(c, 'Cinderplate');
    if (plate > 0) {
      c.block += plate;
      this.log.push({ type: 'cinderplate', target: c.id, amount: plate });
    }
    this.checkDeathsAndVictory();
  }

  // ---------- helpers invoked by the effect interpreter ----------
  drawCards(n) {
    for (let i = 0; i < n; i++) {
      if (this.player.hand.length >= HAND_CAP) {
        if (this.player.drawPile.length === 0) { if (!this.reshuffleIfPossible()) break; }
        this.player.discardPile.push(this.player.drawPile.pop());
        continue;
      }
      if (this.player.drawPile.length === 0) { if (!this.reshuffleIfPossible()) break; }
      this.player.hand.push(this.player.drawPile.pop());
    }
  }

  reshuffleIfPossible() {
    if (this.player.discardPile.length === 0) return false;
    this.player.drawPile = this.rng.shuffle(this.player.discardPile);
    this.player.discardPile = [];
    this.log.push({ type: 'reshuffle' });
    return true;
  }

  shuffleDiscardIntoDraw() {
    this.player.drawPile = this.rng.shuffle([...this.player.drawPile, ...this.player.discardPile]);
    this.player.discardPile = [];
  }

  discardFromHand(count, random) {
    const hand = this.player.hand;
    const toMove = random ? this.rng.sample(hand, Math.min(count, hand.length)) : hand.slice();
    toMove.forEach((c) => hand.splice(hand.indexOf(c), 1));
    this.player.discardPile.push(...toMove);
  }

  exhaustSelector(selector) {
    const m = /^(hand-random|hand-chosen|all-hand)(?:\((\d+)\))?$/.exec(selector);
    if (!m) return;
    const kind = m[1];
    const n = m[2] ? parseInt(m[2], 10) : this.player.hand.length;
    if (kind === 'all-hand') {
      const all = this.player.hand.splice(0);
      this.player.exhaustPile.push(...all);
    } else if (kind === 'hand-random') {
      const picked = this.rng.sample(this.player.hand, Math.min(n, this.player.hand.length));
      picked.forEach((c) => this.player.hand.splice(this.player.hand.indexOf(c), 1));
      this.player.exhaustPile.push(...picked);
    } else if (kind === 'hand-chosen') {
      this.queueChoice({
        type: 'exhaustChoice', count: Math.min(n, this.player.hand.length), cards: this.player.hand.slice(),
        apply: (selectedIds) => {
          const picked = this.player.hand.filter((c) => selectedIds.includes(c.instanceId));
          picked.forEach((c) => this.player.hand.splice(this.player.hand.indexOf(c), 1));
          this.player.exhaustPile.push(...picked);
        },
      });
    }
  }

  addCardInstanceToHand(cardId, count, alsoAddToDeck) {
    if (!this.data.cards[cardId]) return; // unknown id — never let a broken reference reach a real pile
    for (let i = 0; i < count; i++) {
      if (this.player.hand.length >= HAND_CAP) break;
      this.player.hand.push({ instanceId: nextId('t'), cardId, permanent: !!alsoAddToDeck });
    }
  }

  addCardToDeck(cardId, count, location) {
    if (!this.data.cards[cardId]) return;
    for (let i = 0; i < count; i++) {
      const inst = { instanceId: nextId('d'), cardId, permanent: true };
      if (location === 'hand') this.player.hand.push(inst);
      else if (location === 'draw') this.player.drawPile.push(inst);
      else this.player.discardPile.push(inst);
    }
  }

  beginScry(count) {
    const n = Math.min(count, this.player.drawPile.length);
    const revealed = this.player.drawPile.splice(this.player.drawPile.length - n, n);
    this.queueChoice({
      type: 'scry', count: n, cards: revealed,
      apply: (selectedIds) => {
        const kept = revealed.filter((c) => !selectedIds.includes(c.instanceId));
        const discarded = revealed.filter((c) => selectedIds.includes(c.instanceId));
        this.player.drawPile.push(...kept);
        this.player.discardPile.push(...discarded);
      },
    });
  }

  queueChoice({ type, count, cards, apply }) {
    // Called from inside runOne() while runEffects() is mid-list. runEffects() notices this object
    // right after the current op returns and stamps `.remaining` (the rest of that effect list) and
    // `.ctx` onto it before handing control back — see effects.js. resolvePendingChoice() uses those
    // to finish the list once the player has answered.
    this.pendingChoice = { type, count, cards, resolve: apply };
  }

  summonEnemy(enemyId, count) {
    for (let i = 0; i < count; i++) {
      const e = this.instantiateEnemy(enemyId, this.enemies.length);
      this.enemies.push(e);
      this.queueNextIntent(e, true);
    }
  }

  // ---------- AI ----------
  queueNextIntent(enemy, isOpening) {
    const def = this.data.enemies[enemy.enemyDefId];
    let moveId;
    if (isOpening && def.ai.openingMove) moveId = def.ai.openingMove;
    else moveId = this.selectMove(enemy, def, def.ai);
    const move = def.moves.find((m) => m.id === moveId) || def.moves[0];
    enemy.intent = { moveId: move.id, icon: move.intent };
  }

  selectMove(enemy, def, aiRule) {
    if (aiRule.type === 'sequence') {
      const idx = enemy.aiState.seqIndex || 0;
      enemy.aiState.seqIndex = (idx + 1) % aiRule.order.length;
      return aiRule.order[idx];
    }
    if (aiRule.type === 'random-weighted') {
      const moves = aiRule.pool.map((id) => def.moves.find((m) => m.id === id));
      return this.rng.weighted(moves, (m) => m.weight || 1).id;
    }
    if (aiRule.type === 'conditional') {
      for (const rule of aiRule.rules) {
        if (evalCondition(rule.when, this.ctxFor(enemy, this.player, 'Self'))) return rule.move;
      }
      return this.selectMove(enemy, def, aiRule.fallback);
    }
    if (aiRule.type === 'no-repeat-random') {
      let candidatePool = aiRule.pool;
      if (enemy.aiState.lastMoveId && enemy.aiState.lastStreak >= (aiRule.maxRepeat || 1)) {
        candidatePool = aiRule.pool.filter((id) => id !== enemy.aiState.lastMoveId);
        if (candidatePool.length === 0) candidatePool = aiRule.pool;
      }
      const moves = candidatePool.map((id) => def.moves.find((m) => m.id === id));
      const chosen = this.rng.weighted(moves, (m) => m.weight || 1).id;
      enemy.aiState.lastStreak = chosen === enemy.aiState.lastMoveId ? (enemy.aiState.lastStreak || 0) + 1 : 1;
      enemy.aiState.lastMoveId = chosen;
      return chosen;
    }
    return def.moves[0].id;
  }

  // ---------- post-effect bookkeeping ----------
  afterEffects(ctx, isEnemyAction) {
    // relic reactions driven off the log this action produced
    for (const entry of this.log) {
      if (entry.type === 'damage' && entry.target === 'player' && entry.hpLoss > 0) {
        this.fireRelicTrigger('onDamageTaken', { amount: entry.hpLoss });
      }
    }
    this.checkDeathsAndVictory();
  }

  checkDeathsAndVictory() {
    for (const enemy of this.enemies) {
      if (enemy.hp <= 0 && !enemy.deathHandled) {
        enemy.deathHandled = true;
        this.log.push({ type: 'enemyDefeated', target: enemy.id });
        this.fireRelicTrigger('onKillEnemy', {});
        if (enemy.splitOnDeath) {
          const { enemyId, count } = enemy.splitOnDeath;
          for (let i = 0; i < count; i++) {
            const child = this.instantiateEnemy(enemyId, this.enemies.length);
            child.hp = Math.max(1, Math.floor(enemy.maxHp / 2));
            child.maxHp = child.hp;
            this.enemies.push(child);
            this.queueNextIntent(child, true);
          }
        }
      }
    }
    if (!this.outcome && livingEnemies(this).length === 0) {
      this.outcome = 'victory';
      this.log.push({ type: 'victory' });
      this.fireRelicTrigger('onCombatEnd', {});
      this.onEnd('victory');
    } else if (!this.outcome && this.player.hp <= 0) {
      this.outcome = 'defeat';
      this.log.push({ type: 'defeat' });
      this.onEnd('defeat');
    }
  }

  fireRelicTrigger(eventName, payload) {
    for (const trig of this.relicTriggers) {
      if (trig.on !== eventName) continue;
      if (trig.condition && !evalCondition(trig.condition, this.ctxFor(this.player, payload.chosenTarget || null, 'Self'))) continue;
      if (trig.on === 'onCardPlayed' && trig.cardType && trig.cardType !== payload.cardType) continue;
      const ctx = this.ctxFor(this.player, payload.chosenTarget || null, 'Self');
      runEffects(trig.effects, ctx);
      this.checkDeathsAndVictory();
    }
  }

  serializablePlayerDeck() {
    const all = [...this.player.hand, ...this.player.drawPile, ...this.player.discardPile, ...this.player.exhaustPile];
    return all.filter((c) => c.permanent).map((c) => ({ cardId: c.cardId, upgraded: !!c.upgraded }));
  }
}
