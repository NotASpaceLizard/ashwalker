import { el, clear } from '../render.js';

export function renderSummaryScreen(app) {
  const s = app.uiTemp.lastRunSummary || {};
  const won = s.outcome === 'victory';
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'center', style: { flex: '1' } }, [
      el('div', { style: { fontSize: '44px' }, text: won ? '🏆' : '💀' }),
      el('h2', { text: won ? 'The Last Flame is quenched.' : 'The climb ends here.' }),
      el('p', { class: 'subtitle', text: `Reached Act ${s.act || 1} · ${s.nodesCleared || 0} nodes cleared · ${s.elitesKilled || 0} elites slain` }),
      el('p', { class: 'stat gold', text: `+${s.sparksAwarded || 0} ✨ Sparks earned` }),
      s.milestonesUnlocked && s.milestonesUnlocked.length
        ? el('div', { class: 'panel' }, s.milestonesUnlocked.map((m) => el('p', { text: `Milestone: ${m}` })))
        : null,
      el('button', { class: 'primary', text: 'Return to Menu', onClick: () => app.goto('menu') }),
    ]),
  ]);
  clear(app.root);
  app.root.appendChild(wrap);
}
