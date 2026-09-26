// Run state machine: map traversal + node resolution (Rest/Shop/Event/Treasure) glue around Combat.
// See DESIGN_BIBLE.md sections 2, 9, 10, 11, 13, 13b.
import { createRng } from './rng.js';
import { generateAct, reachableFrom } from './map.js';
import { Combat } from './combat.js';
import { runEffects } from './effects.js';
import { getActiveTrialModifiers } from './meta.js';
import { STARTER_CARDS } from '../data/starters.js';

const ACT_HP_MULT = { 1: 1.0, 2: 1.35, 3: 1.75, 4: 2.2 };
const MONSTER_GROUP_ODDS = { 1: [0.6, 0.35, 0.05], 2: [0.4, 0.45, 0.15], 3: [0.25, 0.45, 0.3] };

function findNode(run, id) {
  return run.mapsByAct[run.act].nodes.find((n) => n.id === id);
}

export class RunController {
  constructor(dataStore) {
    this.data = { ...dataStore, cards: { ...STARTER_CARDS, ...dataStore.cards } };
    this.meta = { unlockedCardIds: [], unlockedRelicIds: [] };
  }

  // Called once right after construction (and again on startNew) — RunController holds a *reference*
  // to the live meta object, so later Archive unlocks are visible immediately without re-wiring.
  setMeta(meta) {
    this.meta = meta;
  }

  startNew(meta, trialLevel, seedInt) {
    this.meta = meta;
    const rng = createRng(seedInt);
    const mods = getActiveTrialModifiers(trialLevel);
    const maxHp = mods.startingMaxHpOverride || 72;
    const curseIds = Object.values(this.data.cards).filter((c) => c.rarity === 'Curse').map((c) => c.id);
    const deck = [
      ...Array.from({ length: 5 }, () => ({ cardId: 'ashstrike', upgraded: false })),
      ...Array.from({ length: 4 }, () => ({ cardId: 'ashguard', upgraded: false })),
      { cardId: 'emberkindle', upgraded: false },
    ];
    for (let i = 0; i < mods.startingCurseCount && curseIds.length; i++) deck.push({ cardId: rng.pick(curseIds), upgraded: false });

    const run = {
      seed: seedInt, trialLevel, act: 1, rngState: rng.getState(),
      hp: maxHp, maxHp, gold: 99, relics: ['cinderheart'], potions: [], deck,
      mapsByAct: { 1: generateAct(1, rng, { extraElites: mods.extraEliteActs.has(1) ? 1 : 0 }) }, currentNodeId: null, visitedNodeIds: [],
      combat: null, pendingReward: null, cardsRemovedThisRun: 0, eventsSeen: [],
      nodesCleared: 0, elitesKilled: 0, actBossesKilled: 0, gaveUp: false,
    };
    run.rngState = rng.getState();
    return run;
  }

  // The single place a relic is ever added to a run — applies a one-time maxHpBonus permanently to
  // run.maxHp/run.hp here (NOT inside Combat, which would re-apply it, i.e. re-heal, every fight).
  grantRelic(run, relicId) {
    if (!relicId || run.relics.includes(relicId)) return;
    run.relics.push(relicId);
    const def = this.data.relics[relicId];
    const bonus = def?.triggers?.filter((t) => t.on === 'passive').reduce((sum, t) => sum + (t.statMod?.maxHpBonus || 0), 0) || 0;
    if (bonus) { run.maxHp = Math.max(1, run.maxHp + bonus); run.hp = Math.max(1, run.hp + bonus); }
  }

  rngFor(run) {
    const rng = createRng(1);
    rng.setState(run.rngState);
    return rng;
  }

  commitRng(run, rng) {
    run.rngState = rng.getState();
  }

  availableNodes(run) {
    const graph = run.mapsByAct[run.act];
    const ids = run.currentNodeId === null ? (graph.startNodeIds || [graph.startNodeId]) : (findNode(run, run.currentNodeId)?.edges || []);
    return ids.map((id) => graph.nodes.find((n) => n.id === id));
  }

  travelTo(run, nodeId) {
    const options = this.availableNodes(run).map((n) => n.id);
    if (!options.includes(nodeId)) throw new Error('node not reachable');
    run.currentNodeId = nodeId;
    run.visitedNodeIds.push(nodeId);
    return this.enterNode(run);
  }

  enterNode(run) {
    const node = findNode(run, run.currentNodeId);
    const mods = getActiveTrialModifiers(run.trialLevel);
    if (!node.resolvedData) {
      const rng = this.rngFor(run);
      if (node.type === 'Monster' || node.type === 'Elite' || node.type === 'Boss') {
        node.resolvedData = { enemyIds: this.pickEncounter(run, node, rng, mods) };
      } else if (node.type === 'Event') {
        const unseen = Object.values(this.data.events).filter((e) => !run.eventsSeen.includes(e.id));
        const pool = unseen.length ? unseen : Object.values(this.data.events);
        const ev = rng.pick(pool);
        run.eventsSeen.push(ev.id);
        node.resolvedData = { eventId: ev.id };
      } else if (node.type === 'Shop') {
        node.resolvedData = this.rollShop(run, rng, mods);
      } else if (node.type === 'Treasure') {
        node.resolvedData = this.rollTreasure(run, rng, node);
      }
      this.commitRng(run, rng);
    }
    return node;
  }

  pickEncounter(run, node, rng, mods) {
    const act = run.act;
    const pool = Object.values(this.data.enemies).filter((e) => e.act === act);
    if (node.type === 'Boss') {
      const boss = pool.find((e) => e.role === 'boss');
      return boss ? [boss.id] : [];
    }
    if (node.type === 'Elite') {
      const elites = pool.filter((e) => e.role === 'elite');
      const count = rng.bool(0.8) ? 1 : Math.min(2, elites.length);
      return rng.sample(elites, count).map((e) => e.id);
    }
    const normals = pool.filter((e) => e.role === 'normal');
    const odds = MONSTER_GROUP_ODDS[act] || MONSTER_GROUP_ODDS[3];
    const count = rng.weighted([1, 2, 3], (n) => odds[n - 1]);
    return rng.sample(normals.length >= count ? normals : normals, Math.min(count, normals.length)).map((e) => e.id);
  }

  rollShop(run, rng, mods) {
    const unlockedCards = Object.values(this.data.cards).filter((c) => c.rarity !== 'Starter' && c.rarity !== 'Curse' && this.meta.unlockedCardIds.includes(c.id));
    const unlockedRelics = Object.values(this.data.relics).filter((r) => !['Starter', 'Boss'].includes(r.rarity) && this.meta.unlockedRelicIds.includes(r.id));
    const cardPrice = { Common: 55, Uncommon: 80, Rare: 140 };
    const relicPrice = { Common: 100, Uncommon: 150, Rare: 235, Event: 100, Shop: 100 };
    const cards = rng.sample(unlockedCards, Math.min(5, unlockedCards.length))
      .map((c) => ({ cardId: c.id, price: Math.round((cardPrice[c.rarity] || 60) * mods.shopPriceMult), sold: false }));
    const relics = rng.sample(unlockedRelics, Math.min(3, unlockedRelics.length))
      .map((r) => ({ relicId: r.id, price: Math.round((relicPrice[r.rarity] || 100) * mods.shopPriceMult), sold: false }));
    const potionPool = Object.values(this.data.potions);
    const potions = rng.sample(potionPool, Math.min(2, potionPool.length))
      .map((p) => ({ potionId: p.id, price: Math.round(45 * mods.shopPriceMult), sold: false }));
    return { cards, relics, potions, removalPrice: Math.round((75 + 25 * run.cardsRemovedThisRun) * mods.shopPriceMult) };
  }

  rollTreasure(run, rng, node) {
    const owned = new Set(run.relics);
    const pool = Object.values(this.data.relics).filter((r) => ['Common', 'Uncommon', 'Rare'].includes(r.rarity) && !owned.has(r.id) && this.meta.unlockedRelicIds.includes(r.id));
    const odds = node.eliteBonus ? { Common: 0.30, Uncommon: 0.45, Rare: 0.25 } : { Common: 0.50, Uncommon: 0.33, Rare: 0.17 };
    const rarity = rng.weighted(Object.keys(odds), (k) => odds[k]);
    const choices = pool.filter((r) => r.rarity === rarity);
    const relic = rng.pick(choices.length ? choices : pool);
    return { relicId: relic ? relic.id : null, gold: rng.int(20, 41) };
  }

  startCombat(run, onEnd) {
    const node = findNode(run, run.currentNodeId);
    const mods = getActiveTrialModifiers(run.trialLevel);
    const rng = this.rngFor(run);
    const combat = new Combat({
      run, dataStore: this.data, enemyDefIds: node.resolvedData.enemyIds,
      difficultyMult: ACT_HP_MULT[run.act], extraHpMult: mods.enemyHpMult, extraDmgMult: mods.enemyDmgMult,
      eliteStartingStrength: mods.eliteStartingStrength, bossSecondActionThreshold: mods.bossSecondActionThreshold,
      summitEnrageTurn: run.act === 4 ? mods.summitEnrageTurn : null, rng, onEnd,
    });
    run.combat = combat;
    return combat;
  }

  finishCombat(run, node, outcome) {
    const combat = run.combat;
    if (!combat) return run.pendingReward; // already finalized — a duplicate outcome timer (see main.js) is a no-op, not an error
    run.hp = combat.player.hp;
    run.deck = combat.serializablePlayerDeck();
    this.commitRng(run, combat.rng);
    run.combat = null;
    if (outcome === 'victory') {
      run.nodesCleared += 1;
      if (node.type === 'Elite') run.elitesKilled += 1;
      if (node.type === 'Boss') run.actBossesKilled += 1;
      run.pendingReward = this.buildCombatReward(run, node);
    }
    return run.pendingReward;
  }

  buildCombatReward(run, node) {
    const rng = this.rngFor(run);
    const mods = getActiveTrialModifiers(run.trialLevel);
    const goldWon = node.type === 'Boss' ? rng.int(90, 141) : node.type === 'Elite' ? rng.int(35, 61) : rng.int(15, 36);
    run.gold += goldWon;
    const pool = Object.values(this.data.cards).filter((c) => !['Starter', 'Curse'].includes(c.rarity) && this.meta.unlockedCardIds.includes(c.id));
    const rarityRoll = () => rng.weighted(['Common', 'Uncommon', 'Rare'], (r) => ({ Common: 0.6, Uncommon: 0.33, Rare: 0.07 }[r]));
    const offerCount = mods.cardRewardReduced ? 2 : 3;
    const cardChoices = [];
    const seen = new Set();
    while (cardChoices.length < offerCount) {
      const rarity = rarityRoll();
      const candidates = pool.filter((c) => c.rarity === rarity && !seen.has(c.id));
      const pick = rng.pick(candidates.length ? candidates : pool.filter((c) => !seen.has(c.id)));
      if (!pick) break;
      seen.add(pick.id);
      cardChoices.push(pick.id);
    }
    this.commitRng(run, rng);
    const reward = { gold: goldWon, cardChoices };
    if (node.type === 'Elite') {
      const eliteRng = this.rngFor(run);
      const relicPool = Object.values(this.data.relics).filter((r) => ['Common', 'Uncommon', 'Rare'].includes(r.rarity) && !run.relics.includes(r.id) && this.meta.unlockedRelicIds.includes(r.id));
      const odds = { Common: 0.30, Uncommon: 0.45, Rare: 0.25 };
      const rarity = eliteRng.weighted(Object.keys(odds), (k) => odds[k]);
      const choices = relicPool.filter((r) => r.rarity === rarity);
      const relic = eliteRng.pick(choices.length ? choices : relicPool);
      if (relic) { reward.relicId = relic.id; this.grantRelic(run, relic.id); }
      this.commitRng(run, eliteRng);
    }
    if (node.type === 'Boss') {
      const pairIndex = run.act - 1;
      const bossRelics = Object.values(this.data.relics).filter((r) => r.rarity === 'Boss' && r.pairIndex === pairIndex);
      reward.bossRelicChoices = bossRelics.map((r) => r.id);
    }
    if (!mods.potionsShopOnly && run.potions.length < this.potionSlots(run)) {
      const dropChance = node.type === 'Elite' ? 1 : 0.25;
      const potionRng = this.rngFor(run);
      if (potionRng.bool(dropChance)) {
        const potion = potionRng.pick(Object.values(this.data.potions));
        if (potion) { run.potions.push(potion.id); reward.potionId = potion.id; }
      }
      this.commitRng(run, potionRng);
    }
    return reward;
  }

  claimCardReward(run, cardId) {
    if (cardId) run.deck.push({ cardId, upgraded: false });
    run.pendingReward.cardChoices = null;
    this.clearRewardIfDone(run);
  }

  claimBossRelic(run, relicId) {
    if (relicId) this.grantRelic(run, relicId);
    run.pendingReward.bossRelicChoices = null;
    this.clearRewardIfDone(run);
  }

  clearRewardIfDone(run) {
    const r = run.pendingReward;
    if (r && !r.cardChoices && !r.bossRelicChoices) run.pendingReward = null;
  }

  resolveRest(run, choice, cardInstanceIndex) {
    const mods = getActiveTrialModifiers(run.trialLevel);
    if (choice === 'heal') {
      run.hp = Math.min(run.maxHp, run.hp + Math.floor(run.maxHp * mods.restHealCap));
    } else if (choice === 'upgrade') {
      const card = run.deck[cardInstanceIndex];
      if (card && !card.upgraded && this.data.cards[card.cardId]?.upgrade) card.upgraded = true;
    } else if (choice === 'cleanse') {
      run.deck.splice(cardInstanceIndex, 1);
    }
  }

  runEventEffects(run, effects) {
    const rng = this.rngFor(run);
    const playerLike = { hp: run.hp, maxHp: run.maxHp, statuses: {} };
    const shimCombat = {
      run,
      player: playerLike,
      addCardToDeck: (cardId, count) => {
        if (!this.data.cards[cardId]) return; // guards against a content reference to an id that was never authored
        for (let i = 0; i < (count || 1); i++) run.deck.push({ cardId, upgraded: false });
      },
    };
    const ctx = { combat: shimCombat, source: playerLike, chosenTarget: null, defaultTargetMode: 'Self', rng, log: [] };
    runEffects(effects, ctx);
    run.hp = Math.max(0, Math.min(run.maxHp, playerLike.hp));
    this.commitRng(run, rng);
  }

  buySomething(run, kind, index) {
    const node = findNode(run, run.currentNodeId);
    const stock = node.resolvedData;
    if (kind === 'card') {
      const item = stock.cards[index];
      if (item.sold || run.gold < item.price) return false;
      run.gold -= item.price; item.sold = true; run.deck.push({ cardId: item.cardId, upgraded: false });
    } else if (kind === 'relic') {
      const item = stock.relics[index];
      if (item.sold || run.gold < item.price) return false;
      run.gold -= item.price; item.sold = true; this.grantRelic(run, item.relicId);
    } else if (kind === 'potion') {
      const item = stock.potions[index];
      if (item.sold || run.gold < item.price || run.potions.length >= this.potionSlots(run)) return false;
      run.gold -= item.price; item.sold = true; run.potions.push(item.potionId);
    }
    return true;
  }

  removeCard(run, deckIndex) {
    const node = findNode(run, run.currentNodeId);
    if (run.gold < node.resolvedData.removalPrice) return false;
    run.gold -= node.resolvedData.removalPrice;
    run.deck.splice(deckIndex, 1);
    run.cardsRemovedThisRun += 1;
    return true;
  }

  potionSlots(run) {
    const bonus = run.relics.includes('flaskstrap') ? 1 : 0; // flaskstrap: +1 potion slot (see relics data)
    return 3 + bonus;
  }

  claimTreasure(run) {
    const node = findNode(run, run.currentNodeId);
    if (node.resolvedData.relicId) this.grantRelic(run, node.resolvedData.relicId);
    run.gold += node.resolvedData.gold;
    node.resolvedData.claimed = true;
  }

  advanceAct(run) {
    const rng = this.rngFor(run);
    run.act += 1;
    run.currentNodeId = null;
    const mods = getActiveTrialModifiers(run.trialLevel);
    run.mapsByAct[run.act] = generateAct(run.act, rng, { summit: run.act === 4, extraElites: mods.extraEliteActs.has(run.act) ? 1 : 0 });
    this.commitRng(run, rng);
  }

  isPathClearOfBoss(run) {
    const node = findNode(run, run.currentNodeId);
    return node && node.type === 'Boss' && node.resolved;
  }

  reachableSet(run) {
    return run.currentNodeId ? reachableFrom(run.mapsByAct[run.act], run.currentNodeId) : new Set();
  }
}
