import { el, clear } from '../render.js';
import { renderCard } from '../cardview.js';

export function renderDeckViewScreen(app) {
  const run = app.run;
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [
      el('h2', { text: `Deck (${run.deck.length})` }),
      el('button', { text: 'Back', onClick: () => app.goto(app.uiTemp.returnTo || 'map') }),
    ]),
    el('div', { class: 'choice-grid' }, run.deck.map((c) => {
      const def = app.dataStore.cards[c.cardId];
      return def ? renderCard(def, app.dataStore, { upgraded: c.upgraded }) : null;
    })),
    el('h3', { text: `Relics (${run.relics.length})` }),
    el('div', { class: 'panel' }, run.relics.map((rid) => {
      const def = app.dataStore.relics[rid];
      return el('div', { class: 'shop-item-row' }, [el('div', { text: def?.name || rid }), el('div', { class: 'subtitle', text: def?.flavor || '' })]);
    })),
  ]);
  clear(app.root);
  app.root.appendChild(wrap);
}
