import { el, clear } from '../render.js';
import { getActiveTrialModifiers } from '../../engine/meta.js';

export function renderRestScreen(app) {
  const run = app.run;
  const mods = getActiveTrialModifiers(run.trialLevel);
  const mode = app.uiTemp.restMode || null;
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [el('h2', { text: '🏕️ Rest Site' })]),
  ]);

  if (!mode) {
    const healAmt = Math.floor(run.maxHp * mods.restHealCap);
    const canCleanse = !!app.meta.milestones.cleanseUnlocked;
    wrap.appendChild(el('div', { class: 'choice-grid' }, [
      el('button', { class: 'big-btn primary', onClick: () => { app.rc.resolveRest(run, 'heal'); app.finishNodeAction(); } }, [
        el('div', { text: '🔥' }), el('div', { text: `Heal ${healAmt} HP` }),
      ]),
      el('button', { class: 'big-btn', onClick: () => { app.uiTemp.restMode = 'upgrade'; app.renderScreen(); } }, [
        el('div', { text: '⬆️' }), el('div', { text: 'Upgrade a Card' }),
      ]),
      canCleanse ? el('button', { class: 'big-btn', onClick: () => { app.uiTemp.restMode = 'cleanse'; app.renderScreen(); } }, [
        el('div', { text: '🧹' }), el('div', { text: 'Remove a Card' }),
      ]) : null,
    ]));
  } else {
    const upgrade = mode === 'upgrade';
    const eligible = run.deck.map((c, i) => ({ c, i })).filter(({ c }) => !upgrade || (!c.upgraded && app.dataStore.cards[c.cardId]?.upgrade));
    wrap.appendChild(el('div', { class: 'panel' }, [el('p', { text: upgrade ? 'Choose a card to upgrade permanently.' : 'Choose a card to remove from your deck.' })]));
    wrap.appendChild(el('div', { class: 'deck-list' }, eligible.map(({ c, i }) => {
      const def = app.dataStore.cards[c.cardId];
      return el('div', { class: 'deck-mini', text: `${def?.name || c.cardId}${c.upgraded ? '+' : ''}`, onClick: () => {
        app.rc.resolveRest(run, upgrade ? 'upgrade' : 'cleanse', i);
        app.uiTemp.restMode = null;
        app.finishNodeAction();
      } });
    })));
    wrap.appendChild(el('button', { class: 'ghost', text: 'Back', onClick: () => { app.uiTemp.restMode = null; app.renderScreen(); } }));
  }

  clear(app.root);
  app.root.appendChild(wrap);
}
