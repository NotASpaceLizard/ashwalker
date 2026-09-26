// Meta-progression: Sparks, the Archive (unlocks), milestones, Trials. See DESIGN_BIBLE.md 13 / 13b.
export function createDefaultMeta(startingUnlockedCardIds, startingUnlockedRelicIds) {
  return {
    unlockedCardIds: [...startingUnlockedCardIds],
    unlockedRelicIds: [...startingUnlockedRelicIds],
    sparks: 0,
    milestones: {},
    trialLevel: 0,
    stats: { runs: 0, wins: 0, losses: 0 },
  };
}

export function computeSparks({ nodesCleared, elitesKilled, actBossesKilled, summitBossKilled, goldRemaining, gaveUp }) {
  let sparks = 15 * nodesCleared + 60 * elitesKilled + 120 * actBossesKilled
    + (summitBossKilled ? 400 : 0) + Math.floor(goldRemaining / 10);
  if (gaveUp) sparks = Math.floor(sparks / 2);
  return Math.max(0, sparks);
}

export const UNLOCK_COSTS = {
  card: { Common: 50, Uncommon: 120, Rare: 250 },
  relic: { Common: 60, Uncommon: 144, Rare: 300, Boss: 300, Event: 60, Shop: 60 },
};

export function unlockCost(kind, rarity) {
  return UNLOCK_COSTS[kind][rarity] ?? UNLOCK_COSTS[kind].Common;
}

export function tryUnlock(meta, kind, id, rarity) {
  const cost = unlockCost(kind, rarity);
  if (meta.sparks < cost) return { ok: false, reason: 'not enough sparks' };
  const listKey = kind === 'card' ? 'unlockedCardIds' : 'unlockedRelicIds';
  if (meta[listKey].includes(id)) return { ok: false, reason: 'already unlocked' };
  meta.sparks -= cost;
  meta[listKey].push(id);
  return { ok: true };
}

export function applyMilestone(meta, milestoneId, effect) {
  if (meta.milestones[milestoneId]) return false;
  meta.milestones[milestoneId] = true;
  effect(meta);
  return true;
}

// Trial modifiers are strictly cumulative: level N includes every effect from level 1..N.
export function getActiveTrialModifiers(level) {
  const m = {
    enemyHpMult: 1, enemyDmgMult: 1, eliteStartingStrength: 0, startingCurseCount: 0,
    extraEliteActs: new Set(), restHealCap: 0.30, shopPriceMult: 1, bossSecondActionThreshold: null,
    startingMaxHpOverride: null, potionsShopOnly: false, cardRewardReduced: false, summitEnrageTurn: null,
  };
  if (level >= 1) m.enemyHpMult *= 1.10;
  if (level >= 2) m.eliteStartingStrength += 1;
  if (level >= 3) m.startingCurseCount += 1;
  if (level >= 4) m.extraEliteActs.add(1);
  if (level >= 5) m.restHealCap = 0.20;
  if (level >= 6) m.enemyDmgMult *= 1.15;
  if (level >= 7) m.shopPriceMult *= 1.20;
  if (level >= 8) m.extraEliteActs.add(2);
  if (level >= 9) m.bossSecondActionThreshold = 0.25;
  if (level >= 10) m.startingMaxHpOverride = 63;
  if (level >= 11) m.extraEliteActs.add(3);
  if (level >= 12) m.potionsShopOnly = true;
  if (level >= 13) m.enemyHpMult *= 1.15;
  if (level >= 14) m.cardRewardReduced = true;
  if (level >= 15) m.summitEnrageTurn = 6;
  return m;
}

export const TRIAL_DESCRIPTIONS = [
  'Enemies gain +10% max HP.',
  'Elites start combat with 1 Strength.',
  'Your starting deck includes 1 random Curse.',
  'Act 1 gains an additional Elite encounter.',
  'Rest sites can restore at most 20% max HP (down from 30%).',
  'Enemies deal +15% damage.',
  'Shop prices increase by 20%.',
  'Act 2 gains an additional Elite encounter.',
  'Bosses act twice per turn once below 25% HP.',
  'You start each run with 63 max HP instead of 72.',
  'Act 3 gains an additional Elite encounter.',
  'Potions can no longer drop from combat — shop only.',
  'Enemies gain a further +15% max HP.',
  'Card rewards offer one fewer choice.',
  'The Summit boss enrages (+50% damage) after turn 6.',
];
