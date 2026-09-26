// Turns raw effect-primitive JSON (see DESIGN_BIBLE.md section 5) into short human-readable card text.
// Content data has no hand-written descriptions — this is the only renderer, shared by every screen.
const STATUS_LABEL = {
  Strength: 'Strength', Dexterity: 'Dexterity', Vulnerable: 'Vulnerable', Weak: 'Weak', Frail: 'Frail',
  Scorch: 'Scorch', Ash: 'Ash', Intangible: 'Intangible', Cinderplate: 'Cinderplate',
  Embermend: 'Embermend', Stagger: 'Stagger', Backdraft: 'Backdraft',
};

function targetSuffix(effect) {
  switch (effect.target) {
    case 'AllEnemies': return ' to all enemies';
    case 'RandomEnemy': return ' to a random enemy';
    case 'Self': return ' to yourself';
    case 'ChosenEnemy': return '';
    default: return '';
  }
}

function describeCondition(cond) {
  if (!cond) return 'a condition';
  const who = cond.who === 'player' ? 'the player' : 'it';
  switch (cond.type) {
    case 'hasStatus': return `${who} has ${STATUS_LABEL[cond.statusId] || cond.statusId}`;
    case 'statusStacksGTE': return `${who} has ${cond.n}+ ${STATUS_LABEL[cond.statusId] || cond.statusId}`;
    case 'handSizeGTE': return `you have ${cond.n}+ cards in hand`;
    case 'hpBelowPercent': return `${who} is below ${Math.round(cond.pct * 100)}% HP`;
    case 'isFirstCardThisTurn': return 'this is your first card this turn';
    case 'cardsPlayedThisTurnGTE': return `you've played ${cond.n}+ cards this turn`;
    case 'enemyCountGTE': return `there are ${cond.n}+ enemies`;
    default: return 'a condition';
  }
}

function describeOne(effect, dataStore) {
  switch (effect.op) {
    case 'damage': {
      const hits = effect.hits || 1;
      return `Deal ${effect.amount} damage${hits > 1 ? ` ${hits} times` : ''}${targetSuffix(effect)}.`;
    }
    case 'pureDamage': {
      const hits = effect.hits || 1;
      return `Deal ${effect.amount} damage (ignores Block)${hits > 1 ? ` ${hits} times` : ''}${targetSuffix(effect)}.`;
    }
    case 'block': return `Gain ${effect.amount} Block${targetSuffix(effect)}.`;
    case 'heal': return `Heal ${effect.amount} HP${targetSuffix(effect)}.`;
    case 'draw': return `Draw ${effect.count} card${effect.count === 1 ? '' : 's'}.`;
    case 'gainEmber': return effect.count ? `Gain ${effect.count} Ember.` : '';
    case 'applyStatus': return `Apply ${effect.stacks} ${STATUS_LABEL[effect.status] || effect.status}${targetSuffix(effect)}.`;
    case 'removeStatus': return `Remove ${effect.stacks} ${STATUS_LABEL[effect.status] || effect.status}${targetSuffix(effect)}.`;
    case 'gainStrength': return `Gain ${effect.stacks} Strength${targetSuffix(effect)}.`;
    case 'gainDexterity': return `Gain ${effect.stacks} Dexterity${targetSuffix(effect)}.`;
    case 'discard': return effect.random ? `Discard ${effect.count} random card${effect.count === 1 ? '' : 's'}.` : 'Discard your hand.';
    case 'exhaustCard': {
      const m = /^(hand-random|hand-chosen|all-hand)(?:\((\d+)\))?$/.exec(effect.selector || '');
      if (!m) return 'Exhaust a card.';
      if (m[1] === 'all-hand') return 'Exhaust your hand.';
      if (m[1] === 'hand-random') return `Exhaust ${m[2] || 1} random card(s) from your hand.`;
      return `Exhaust ${m[2] || 1} card(s) of your choice.`;
    }
    case 'addCardToHand': {
      const name = dataStore?.cards?.[effect.cardId]?.name || effect.cardId;
      return `Add ${effect.count || 1}x ${name} to your hand.`;
    }
    case 'addCardToDeck': {
      const name = dataStore?.cards?.[effect.cardId]?.name || effect.cardId;
      return `Add ${effect.count || 1}x ${name} to your deck.`;
    }
    case 'scry': return `Scry ${effect.count}.`;
    case 'gainGold': return `Gain ${effect.amount} Gold.`;
    case 'loseGold': return `Lose ${effect.amount} Gold.`;
    case 'selfDamage': return `Lose ${effect.amount} HP.`;
    case 'repeatX': return `For each Ember spent: ${describeEffects(effect.effects, dataStore)}`;
    case 'conditional': {
      const then = describeEffects(effect.then, dataStore);
      const els = effect.else && effect.else.length ? ` Otherwise: ${describeEffects(effect.else, dataStore)}` : '';
      return `If ${describeCondition(effect.condition)}: ${then}${els}`;
    }
    case 'shuffleDiscardIntoDraw': return 'Shuffle your discard pile into your draw pile.';
    case 'gainBlockEqualToStrength': return 'Gain Block equal to your Strength.';
    case 'dealDamageEqualToBlock': return `Deal damage equal to your Block${targetSuffix(effect)}.`;
    case 'summon': {
      const name = dataStore?.enemies?.[effect.enemyId]?.name || 'a creature';
      return `Summon ${effect.count || 1}x ${name}.`;
    }
    case 'splitOnDeath': return 'Splits into two on death.';
    case 'enrageOnHit': return `Gains ${effect.strengthPerHit} Strength whenever hit.`;
    case 'buffAllAllies': return `Grant all allies ${effect.stacks} ${STATUS_LABEL[effect.status] || effect.status}.`;
    default: return '';
  }
}

export function describeEffects(effects, dataStore) {
  return (effects || []).map((e) => describeOne(e, dataStore)).filter(Boolean).join(' ');
}

export function describeCard(cardDef, dataStore, upgraded) {
  const effects = upgraded && cardDef.upgrade?.effects ? cardDef.upgrade.effects : cardDef.effects;
  return describeEffects(effects, dataStore);
}

export function effectiveCost(cardDef, upgraded) {
  return upgraded && cardDef.upgrade?.cost !== undefined ? cardDef.upgrade.cost : cardDef.cost;
}
