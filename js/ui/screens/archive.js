import { el, clear, ICON } from '../render.js';
import { unlockCost, tryUnlock } from '../../engine/meta.js';
import { renderCard } from '../cardview.js';

export function renderArchiveScreen(app) {
  const meta = app.meta;
  const tab = app.uiTemp.archiveTab || 'cards';
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [
      el('h2', { text: 'Archive' }),
      el('div', { class: 'stat gold', text: `${ICON.sparks} ${meta.sparks}` }),
      el('button', { text: 'Back', onClick: () => app.goto('menu') }),
    ]),
    el('div', { class: 'btnrow' }, [
      el('button', { class: tab === 'cards' ? 'primary' : 'ghost', text: 'Cards', onClick: () => { app.uiTemp.archiveTab = 'cards'; app.renderScreen(); } }),
      el('button', { class: tab === 'relics' ? 'primary' : 'ghost', text: 'Relics', onClick: () => { app.uiTemp.archiveTab = 'relics'; app.renderScreen(); } }),
    ]),
  ]);

  if (tab === 'cards') {
    const cards = Object.values(app.dataStore.cards).filter((c) => c.rarity !== 'Starter' && c.rarity !== 'Curse');
    wrap.appendChild(el('div', { class: 'choice-grid' }, cards.map((c) => {
      const unlocked = meta.unlockedCardIds.includes(c.id);
      const cost = unlockCost('card', c.rarity);
      const node = renderCard(c, app.dataStore, { affordable: unlocked || meta.sparks >= cost, onClick: () => {
        if (!unlocked) { tryUnlock(meta, 'card', c.id, c.rarity); app.persistAndRender(); }
      } });
      if (!unlocked) node.style.filter = 'grayscale(1) brightness(0.6)';
      return el('div', {}, [node, el('div', { class: 'subtitle', text: unlocked ? 'Unlocked' : `${cost} ✨` })]);
    })));
  } else {
    const relics = Object.values(app.dataStore.relics).filter((r) => r.rarity !== 'Starter');
    wrap.appendChild(el('div', { class: 'panel' }, relics.map((r) => {
      const unlocked = meta.unlockedRelicIds.includes(r.id);
      const cost = unlockCost('relic', r.rarity);
      return el('div', { class: 'shop-item-row' }, [
        el('div', {}, [el('div', { text: `${r.name}${unlocked ? '' : '  🔒'}` }), el('div', { class: 'subtitle', text: r.flavor })]),
        unlocked ? el('span', { class: 'subtitle', text: 'Unlocked' }) : el('button', { class: meta.sparks >= cost ? 'primary' : '', disabled: meta.sparks < cost, text: `${cost} ✨`, onClick: () => { tryUnlock(meta, 'relic', r.id, r.rarity); app.persistAndRender(); } }),
      ]);
    })));
  }

  clear(app.root);
  app.root.appendChild(wrap);
}
