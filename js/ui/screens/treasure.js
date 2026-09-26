import { el, clear } from '../render.js';

export function renderTreasureScreen(app) {
  const node = app.currentNode();
  const data = node.resolvedData;
  const claimed = !!data.claimed;
  const relicDef = data.relicId ? app.dataStore.relics[data.relicId] : null;
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [el('h2', { text: '🎁 Treasure' })]),
    el('div', { class: 'center', style: { flex: '1' } }, claimed ? [
      el('div', { text: '✨' , style: {fontSize: '40px'}}),
      el('p', { text: `You found ${relicDef ? relicDef.name : 'nothing but dust'} and ${data.gold} gold.` }),
      el('button', { class: 'primary', text: 'Continue', onClick: () => app.finishNodeAction() }),
    ] : [
      el('div', { text: '🔒', style: { fontSize: '40px' } }),
      el('p', { text: 'A sealed chest, warm to the touch.' }),
      el('button', { class: 'primary', text: 'Open it', onClick: () => { app.rc.claimTreasure(app.run); app.renderScreen(); } }),
    ]),
  ]);
  clear(app.root);
  app.root.appendChild(wrap);
}
