import { el, clear, ICON } from '../render.js';
import { renderCard } from '../cardview.js';

export function renderShopScreen(app) {
  const run = app.run;
  const node = app.currentNode();
  const stock = node.resolvedData;
  const removing = app.uiTemp.shopRemoving;

  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [
      el('h2', { text: '🏪 Shop' }),
      el('div', { class: 'stat gold', text: `${ICON.gold} ${run.gold}` }),
    ]),
  ]);

  if (removing) {
    wrap.appendChild(el('div', { class: 'panel' }, [el('p', { text: `Remove a card for ${stock.removalPrice} gold.` })]));
    wrap.appendChild(el('div', { class: 'deck-list' }, run.deck.map((c, i) => {
      const def = app.dataStore.cards[c.cardId];
      return el('div', { class: 'deck-mini', text: `${def?.name || c.cardId}${c.upgraded ? '+' : ''}`, onClick: () => {
        app.rc.removeCard(run, i);
        app.uiTemp.shopRemoving = false;
        app.persistAndRender();
      } });
    })));
    wrap.appendChild(el('button', { class: 'ghost', text: 'Back', onClick: () => { app.uiTemp.shopRemoving = false; app.renderScreen(); } }));
    clear(app.root); app.root.appendChild(wrap);
    return;
  }

  const cardRow = el('div', { class: 'choice-grid' }, stock.cards.filter((it) => !it.sold).map((it) => {
    const def = app.dataStore.cards[it.cardId];
    const affordable = run.gold >= it.price;
    const cardNode = renderCard(def, app.dataStore, { affordable, onClick: () => { if (affordable) { app.rc.buySomething(run, 'card', stock.cards.indexOf(it)); app.persistAndRender(); } } });
    return el('div', {}, [cardNode, el('div', { class: 'subtitle', text: `${it.price}g` })]);
  }));
  wrap.appendChild(el('h3', { text: 'Cards' }));
  wrap.appendChild(cardRow);

  wrap.appendChild(el('h3', { text: 'Relics' }));
  wrap.appendChild(el('div', { class: 'panel' }, stock.relics.filter((it) => !it.sold).map((it) => {
    const def = app.dataStore.relics[it.relicId];
    const affordable = run.gold >= it.price;
    return el('div', { class: 'shop-item-row' }, [
      el('div', {}, [el('div', { text: `${def?.name || it.relicId}` }), el('div', { class: 'subtitle', text: def?.flavor || '' })]),
      el('button', { class: affordable ? 'primary' : '', disabled: !affordable, text: `${it.price}g`, onClick: () => { app.rc.buySomething(run, 'relic', stock.relics.indexOf(it)); app.persistAndRender(); } }),
    ]);
  })));

  wrap.appendChild(el('h3', { text: 'Potions' }));
  wrap.appendChild(el('div', { class: 'panel' }, stock.potions.filter((it) => !it.sold).map((it) => {
    const def = app.dataStore.potions[it.potionId];
    const affordable = run.gold >= it.price && run.potions.length < app.rc.potionSlots(run);
    return el('div', { class: 'shop-item-row' }, [
      el('div', {}, [el('div', { text: `${def?.name || it.potionId}` }), el('div', { class: 'subtitle', text: def?.flavor || '' })]),
      el('button', { class: affordable ? 'primary' : '', disabled: !affordable, text: `${it.price}g`, onClick: () => { app.rc.buySomething(run, 'potion', stock.potions.indexOf(it)); app.persistAndRender(); } }),
    ]);
  })));

  const canAffordRemoval = run.gold >= stock.removalPrice;
  wrap.appendChild(el('button', { disabled: !canAffordRemoval, text: `Remove a card — ${stock.removalPrice}g`, onClick: () => { if (canAffordRemoval) { app.uiTemp.shopRemoving = true; app.renderScreen(); } } }));
  wrap.appendChild(el('button', { class: 'primary', text: 'Leave Shop', onClick: () => app.finishNodeAction() }));

  clear(app.root);
  app.root.appendChild(wrap);
}
