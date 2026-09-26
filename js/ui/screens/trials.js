import { el, clear } from '../render.js';
import { TRIAL_DESCRIPTIONS } from '../../engine/meta.js';

export function renderTrialsScreen(app) {
  const meta = app.meta;
  const unlocked = !!meta.milestones.trialsUnlocked;
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [el('h2', { text: 'Trials' }), el('button', { text: 'Back', onClick: () => app.goto('menu') })]),
  ]);

  if (!unlocked) {
    wrap.appendChild(el('div', { class: 'panel' }, [el('p', { text: 'Defeat the Last Flame once to unlock Trials — optional, cumulative difficulty modifiers for a harder climb.' })]));
  } else {
    wrap.appendChild(el('div', { class: 'panel' }, [el('p', { text: `Trial Level: ${meta.trialLevel}. Each level is permanent and includes every modifier below it.` })]));
    wrap.appendChild(el('div', { class: 'trial-list' }, TRIAL_DESCRIPTIONS.map((desc, i) => {
      const level = i + 1;
      const active = meta.trialLevel >= level;
      return el('div', { class: `trial-row ${active ? 'active' : ''}`, text: `Lv${level}: ${desc}` });
    })));
    wrap.appendChild(el('div', { class: 'btnrow' }, [
      el('button', { text: '−', onClick: () => { meta.trialLevel = Math.max(0, meta.trialLevel - 1); app.persistAndRender(); } }),
      el('div', { class: 'stat', text: `Level ${meta.trialLevel}` }),
      el('button', { text: '+', onClick: () => { meta.trialLevel = Math.min(15, meta.trialLevel + 1); app.persistAndRender(); } }),
    ]));
  }

  clear(app.root);
  app.root.appendChild(wrap);
}
