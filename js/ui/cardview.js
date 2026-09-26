import { el } from './render.js';
import { describeCard, effectiveCost } from './cardtext.js';
import { ICON } from './render.js';

export function renderCard(cardDef, dataStore, opts = {}) {
  const { upgraded = false, affordable = true, selected = false, onClick, onLongInfo } = opts;
  const cost = effectiveCost(cardDef, upgraded);
  const name = upgraded ? `${cardDef.name}+` : cardDef.name;
  const body = describeCard(cardDef, dataStore, upgraded);
  const classes = [
    'card', `type-${cardDef.type}`, `rarity-${cardDef.rarity}`,
    selected ? 'selected' : '', affordable ? '' : 'unaffordable',
  ].filter(Boolean).join(' ');
  const card = el('div', { class: classes, onClick: onClick || onLongInfo }, [
    el('div', { class: 'card-cost', text: cost === 'X' ? 'X' : String(cost) }),
    el('div', { class: 'card-name', text: name }),
    el('div', { class: 'card-body', text: body || cardDef.flavor || '' }),
    el('div', { class: 'card-rarity-bar' }),
  ]);
  return card;
}

export function cardTypeIcon(type) { return ICON[type] || ''; }
