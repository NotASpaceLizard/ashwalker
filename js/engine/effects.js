// The effect primitive interpreter — shared by cards, relics, potions, and enemy moves.
// See DESIGN_BIBLE.md section 5. Every op below is intentionally the *only* vocabulary content is
// allowed to use; there is no per-card custom code anywhere in this game.
import { getStatus, addStatus, setStatus, ASH_COMBUST_THRESHOLD } from './statuses.js';

const SELF_OPS = new Set([
  'block', 'draw', 'gainEmber', 'discard', 'exhaustCard', 'addCardToHand', 'addCardToDeck',
  'scry', 'gainGold', 'loseGold', 'selfDamage', 'gainStrength', 'gainDexterity',
  'shuffleDiscardIntoDraw', 'gainBlockEqualToStrength',
]);

function isAlive(c) { return c.hp > 0; }

function livingEnemies(combat) { return combat.enemies.filter(isAlive); }

function resolveKeyword(keyword, ctx) {
  const { combat, source, chosenTarget, eventTarget, eventSource, rng } = ctx;
  switch (keyword) {
    case 'Self': return [source];
    case 'ChosenEnemy': return chosenTarget ? [chosenTarget] : [];
    case 'AllEnemies': return source === combat.player ? livingEnemies(combat) : [combat.player];
    case 'RandomEnemy': {
      const pool = source === combat.player ? livingEnemies(combat) : [combat.player];
      const pick = rng.pick(pool);
      return pick ? [pick] : [];
    }
    case 'EventTarget': return eventTarget ? [eventTarget] : [];
    case 'EventSource': return eventSource ? [eventSource] : [];
    default: return [];
  }
}

function defaultKeywordFor(op, ctx) {
  if (SELF_OPS.has(op)) return 'Self';
  return ctx.defaultTargetMode || 'ChosenEnemy';
}

function resolveTargets(effect, ctx) {
  const keyword = effect.target || defaultKeywordFor(effect.op, ctx);
  return resolveKeyword(keyword, ctx).filter(isAlive);
}

function pushLog(ctx, entry) {
  if (ctx.log) ctx.log.push(entry);
}

function checkAshCombust(combatant, ctx) {
  if (getStatus(combatant, 'Ash') >= ASH_COMBUST_THRESHOLD) {
    const stacks = getStatus(combatant, 'Ash');
    setStatus(combatant, 'Ash', 0);
    applyPureDamage(combatant, stacks * 2, ctx, combatant);
    pushLog(ctx, { type: 'combust', target: combatant.id, amount: stacks * 2 });
  }
}

function applyPureDamage(target, amount, ctx, source) {
  let amt = Math.max(0, amount);
  if (getStatus(target, 'Intangible') > 0) amt = amt > 0 ? 1 : 0;
  target.hp = Math.max(0, target.hp - amt);
  pushLog(ctx, { type: 'damage', source: source ? source.id : null, target: target.id, amount: amt, pure: true });
  return amt;
}

function applyDamageHit(source, target, baseAmount, ctx) {
  let amt = baseAmount + getStatus(source, 'Strength');
  if (getStatus(source, 'Weak') > 0) amt = Math.floor(amt * 0.75);
  if (getStatus(target, 'Vulnerable') > 0) amt = Math.floor(amt * 1.5);
  amt = Math.max(0, amt);
  if (getStatus(target, 'Intangible') > 0) amt = amt > 0 ? 1 : 0;
  const blockAbsorbed = Math.min(target.block, amt);
  target.block -= blockAbsorbed;
  const hpLoss = amt - blockAbsorbed;
  target.hp = Math.max(0, target.hp - hpLoss);
  pushLog(ctx, {
    type: 'damage', source: source.id, target: target.id, amount: amt,
    blocked: blockAbsorbed, hpLoss,
  });
  if (getStatus(target, 'Backdraft') > 0 && target !== source) {
    applyPureDamage(source, getStatus(target, 'Backdraft'), ctx, target);
  }
  if (hpLoss > 0 && target.onDamagedTriggers) {
    target.onDamagedTriggers.forEach((fn) => fn(ctx, hpLoss));
  }
  return { amt, blockAbsorbed, hpLoss };
}

function computeBlockGain(baseAmount, holder) {
  let amt = baseAmount + getStatus(holder, 'Dexterity');
  if (getStatus(holder, 'Frail') > 0) amt = Math.floor(amt * 0.75);
  return Math.max(0, amt);
}

// Runs one effect list against a context. ctx must provide: combat, source, chosenTarget (maybe null),
// defaultTargetMode ('ChosenEnemy'|'AllEnemies'|'Self'), rng, log, spentEmber (for repeatX), draw/discard
// pile access via combat.player.
export function runEffects(effects, ctx) {
  for (let i = 0; i < effects.length; i++) {
    runOne(effects[i], ctx);
    const pc = ctx.combat.pendingChoice;
    if (pc && !pc.ctx) {
      // Freshly raised by this op (scry / exhaustCard hand-chosen) — stash the rest of this list so
      // Combat#resolvePendingChoice can continue exactly where we left off once the player answers.
      pc.remaining = effects.slice(i + 1);
      pc.ctx = ctx;
      return;
    }
  }
}

function runOne(effect, ctx) {
  const { combat, source, rng } = ctx;
  switch (effect.op) {
    case 'damage': {
      const targets = resolveTargets(effect, ctx);
      const hits = effect.hits || 1;
      for (const t of targets) {
        for (let i = 0; i < hits; i++) {
          if (!isAlive(t)) break;
          applyDamageHit(source, t, effect.amount, ctx);
          if (t !== combat.player) checkAshCombust(t, ctx);
        }
      }
      break;
    }
    case 'pureDamage': {
      const targets = resolveTargets(effect, ctx);
      const hits = effect.hits || 1;
      for (const t of targets) {
        for (let i = 0; i < hits; i++) {
          if (!isAlive(t)) break;
          applyPureDamage(t, effect.amount, ctx, source);
        }
      }
      break;
    }
    case 'block': {
      const targets = resolveTargets(effect, ctx);
      for (const t of targets) {
        const gained = computeBlockGain(effect.amount, t);
        t.block += gained;
        pushLog(ctx, { type: 'block', target: t.id, amount: gained });
      }
      break;
    }
    case 'heal': {
      const targets = resolveTargets(effect, ctx);
      for (const t of targets) {
        const before = t.hp;
        t.hp = Math.min(t.maxHp, t.hp + effect.amount);
        pushLog(ctx, { type: 'heal', target: t.id, amount: t.hp - before });
      }
      break;
    }
    case 'draw': {
      combat.drawCards(effect.count);
      break;
    }
    case 'gainEmber': {
      combat.player.ember += effect.count;
      pushLog(ctx, { type: 'ember', amount: effect.count });
      break;
    }
    case 'applyStatus': {
      const targets = resolveTargets(effect, ctx);
      for (const t of targets) {
        addStatus(t, effect.status, effect.stacks);
        pushLog(ctx, { type: 'status', target: t.id, status: effect.status, stacks: effect.stacks });
        if (effect.status === 'Ash') checkAshCombust(t, ctx);
      }
      break;
    }
    case 'removeStatus': {
      const targets = resolveTargets(effect, ctx);
      for (const t of targets) {
        const cur = getStatus(t, effect.status);
        setStatus(t, effect.status, Math.max(0, cur - effect.stacks));
      }
      break;
    }
    case 'gainStrength': {
      const targets = resolveTargets(effect, ctx);
      for (const t of targets) addStatus(t, 'Strength', effect.stacks);
      break;
    }
    case 'gainDexterity': {
      const targets = resolveTargets(effect, ctx);
      for (const t of targets) addStatus(t, 'Dexterity', effect.stacks);
      break;
    }
    case 'discard': {
      combat.discardFromHand(effect.count, !!effect.random);
      break;
    }
    case 'exhaustCard': {
      combat.exhaustSelector(effect.selector);
      break;
    }
    case 'addCardToHand': {
      combat.addCardInstanceToHand(effect.cardId, effect.count || 1, !!effect.alsoAddToDeck);
      break;
    }
    case 'addCardToDeck': {
      combat.addCardToDeck(effect.cardId, effect.count || 1, effect.location || 'discard');
      break;
    }
    case 'scry': {
      combat.beginScry(effect.count);
      break;
    }
    case 'gainGold': {
      combat.run.gold += effect.amount;
      break;
    }
    case 'loseGold': {
      combat.run.gold = Math.max(0, combat.run.gold - effect.amount);
      break;
    }
    case 'selfDamage': {
      applyPureDamage(source, effect.amount, ctx, source);
      break;
    }
    case 'repeatX': {
      const times = Math.max(1, ctx.spentEmber || 1);
      for (let i = 0; i < times; i++) runEffects(effect.effects, ctx);
      break;
    }
    case 'conditional': {
      const branch = evalCondition(effect.condition, ctx) ? effect.then : (effect.else || []);
      runEffects(branch, ctx);
      break;
    }
    case 'shuffleDiscardIntoDraw': {
      combat.shuffleDiscardIntoDraw();
      break;
    }
    case 'gainBlockEqualToStrength': {
      const t = source;
      const gained = computeBlockGain(getStatus(source, 'Strength'), t);
      t.block += gained;
      pushLog(ctx, { type: 'block', target: t.id, amount: gained });
      break;
    }
    case 'dealDamageEqualToBlock': {
      const targets = resolveTargets(effect, ctx);
      for (const t of targets) applyDamageHit(source, t, source.block, ctx);
      break;
    }
    case 'summon': {
      combat.summonEnemy(effect.enemyId, effect.count || 1);
      break;
    }
    case 'splitOnDeath': {
      source.splitOnDeath = { enemyId: effect.enemyId, count: effect.count || 2 };
      break;
    }
    case 'enrageOnHit': {
      source.onDamagedTriggers = source.onDamagedTriggers || [];
      source.onDamagedTriggers.push((innerCtx) => addStatus(source, 'Strength', effect.strengthPerHit));
      break;
    }
    case 'buffAllAllies': {
      for (const e of livingEnemies(combat)) addStatus(e, effect.status, effect.stacks);
      break;
    }
    default:
      throw new Error(`Unknown effect op: ${effect.op}`);
  }
}

export function evalCondition(cond, ctx) {
  const { combat, source } = ctx;
  const who = (w) => (w === 'self' ? source : w === 'player' ? combat.player : w);
  switch (cond.type) {
    case 'hasStatus': return getStatus(who(cond.who), cond.statusId) > 0;
    case 'statusStacksGTE': return getStatus(who(cond.who), cond.statusId) >= cond.n;
    case 'handSizeGTE': return combat.player.hand.length >= cond.n;
    case 'hpBelowPercent': { const w = who(cond.who); return w.hp / w.maxHp < cond.pct; }
    case 'isFirstCardThisTurn': return combat.cardsPlayedThisTurn === 0;
    case 'cardsPlayedThisTurnGTE': return combat.cardsPlayedThisTurn >= cond.n;
    case 'enemyCountGTE': return livingEnemies(combat).length >= cond.n;
    default: return false;
  }
}

const SCALABLE_OPS = new Set(['damage', 'pureDamage', 'block']);

// Enemy authors write moves at Act-1 baseline (see DESIGN_BIBLE.md section 9); the engine scales the
// flat numbers up per-act at execution time so content never has to be hand-duplicated per act.
export function scaleEffects(effects, mult) {
  if (mult === 1) return effects;
  return effects.map((e) => {
    const clone = { ...e };
    if (SCALABLE_OPS.has(e.op) && typeof e.amount === 'number') clone.amount = Math.max(1, Math.round(e.amount * mult));
    if (e.effects) clone.effects = scaleEffects(e.effects, mult);
    if (e.then) clone.then = scaleEffects(e.then, mult);
    if (e.else) clone.else = scaleEffects(e.else, mult);
    return clone;
  });
}

export { applyDamageHit, applyPureDamage, computeBlockGain, checkAshCombust, livingEnemies, isAlive };
