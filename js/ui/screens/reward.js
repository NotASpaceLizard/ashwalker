import { el, clear, ICON } from '../render.js';
import { renderCard } from '../cardview.js';

export function renderRewardScreen(app) {
  const run = app.run;
  const reward = run.pendingReward;
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [
      el('h2', { text: 'Victory' }),
      el('div', { class: 'stat gold', text: `+${reward.gold} ${ICON.gold}` }),
    ]),
  ]);

  if (reward.relicId) {
    const def = app.dataStore.relics[reward.relicId];
    wrap.appendChild(el('div', { class: 'panel' }, [el('p', { text: `You also found: ${def ? def.name : reward.relicId}` })]));
  }
  if (reward.potionId) {
    const def = app.dataStore.potions[reward.potionId];
    wrap.appendChild(el('div', { class: 'panel' }, [el('p', { text: `Potion found: ${def ? def.name : reward.potionId}` })]));
  }

  if (reward.bossRelicChoices && reward.bossRelicChoices.length) {
    wrap.appendChild(el('h3', { text: 'Choose a Boss Relic' }));
    wrap.appendChild(el('div', { class: 'panel' }, reward.bossRelicChoices.map((rid) => {
      const def = app.dataStore.relics[rid];
      return el('div', { class: 'shop-item-row' }, [
        el('div', {}, [el('div', { text: def?.name || rid }), el('div', { class: 'subtitle', text: def?.flavor || '' })]),
        el('button', { class: 'primary', text: 'Take', onClick: () => { app.rc.claimBossRelic(run, rid); app.afterRewardClaim(); } }),
      ]);
    })));
  } else if (reward.cardChoices && reward.cardChoices.length) {
    wrap.appendChild(el('h3', { text: 'Choose a Card' }));
    wrap.appendChild(el('div', { class: 'choice-grid' }, reward.cardChoices.map((cid) => {
      const def = app.dataStore.cards[cid];
      return renderCard(def, app.dataStore, { onClick: () => { app.rc.claimCardReward(run, cid); app.afterRewardClaim(); } });
    })));
    wrap.appendChild(el('button', { class: 'ghost', text: 'Skip', onClick: () => { app.rc.claimCardReward(run, null); app.afterRewardClaim(); } }));
  } else {
    wrap.appendChild(el('button', { class: 'primary', text: 'Continue', onClick: () => app.finishNodeAction() }));
  }

  clear(app.root);
  app.root.appendChild(wrap);
}
