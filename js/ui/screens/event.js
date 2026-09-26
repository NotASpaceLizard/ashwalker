import { el, clear } from '../render.js';

export function renderEventScreen(app) {
  const node = app.currentNode();
  const ev = app.dataStore.events[node.resolvedData.eventId];
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [el('h2', { text: `❓ ${ev.name}` })]),
    el('div', { class: 'panel' }, [el('p', { text: ev.description })]),
    el('div', { class: 'btnrow', style: { flexDirection: 'column' } }, ev.choices.map((choice) => el('button', {
      text: choice.label,
      onClick: () => {
        if (choice.effects && choice.effects.length) app.rc.runEventEffects(app.run, choice.effects);
        if (app.run.hp <= 0) { app.endRun('defeat'); return; }
        if (choice.startsCombat) app.startForcedCombat(choice.startsCombat);
        else app.finishNodeAction();
      },
    }))),
  ]);
  clear(app.root);
  app.root.appendChild(wrap);
}
