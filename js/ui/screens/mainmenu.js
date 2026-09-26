import { el, clear } from '../render.js';
import { isMuted, setMuted, sfx } from '../audio.js';

function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export function renderMainMenu(app) {
  const hasRun = !!app.run;
  const showInstallHint = !isStandalone() && !app.uiTemp.installHintDismissed;
  const wrap = el('div', { class: 'screen' }, [
    showInstallHint ? el('div', { class: 'panel', style: { fontSize: '12px', textAlign: 'center' } }, [
      el('p', { text: 'Tip: tap Share, then "Add to Home Screen" for the full-screen, offline experience.' }),
      el('button', { class: 'ghost', text: 'Got it', onClick: () => { app.uiTemp.installHintDismissed = true; app.renderScreen(); } }),
    ]) : null,
    el('div', { class: 'center', style: { flex: '1' } }, [
      el('div', { class: 'title-flame flame-loader', text: '🔥' }),
      el('div', { class: 'title-text', text: 'ASHWALKER' }),
      el('div', { class: 'subtitle', text: 'Climb the Cinderspire. Die. Learn. Climb again.' }),
      el('div', { class: 'btnrow', style: { flexDirection: 'column', width: '220px', marginTop: '18px' } }, [
        hasRun ? el('button', { class: 'primary', text: 'Continue Climb', onClick: () => app.continueRun() }) : null,
        el('button', { class: hasRun ? 'ghost' : 'primary', text: hasRun ? 'Abandon & Start New' : 'Begin Climb', onClick: () => app.startNewRun() }),
        el('button', { text: `Archive  (${app.meta.sparks} ${'✨'})`, onClick: () => app.goto('archive') }),
        el('button', { text: `Trials  (Lv ${app.meta.trialLevel})`, onClick: () => app.goto('trials') }),
        el('button', { text: 'How to Play', onClick: () => app.goto('howto') }),
      ]),
      el('div', { class: 'subtitle', style: { marginTop: '10px' }, text: `Runs: ${app.meta.stats.runs}  ·  Wins: ${app.meta.stats.wins}` }),
      el('button', { class: 'ghost', style: { marginTop: '6px' }, text: isMuted() ? '🔇 Sound Off' : '🔊 Sound On', onClick: () => { setMuted(!isMuted()); if (!isMuted()) sfx.click(); app.renderScreen(); } }),
    ]),
  ]);
  clear(app.root);
  app.root.appendChild(wrap);
}

export function renderHowTo(app) {
  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [el('h2', { text: 'How to Play' }), el('button', { text: 'Back', onClick: () => app.goto('menu') })]),
    el('div', { class: 'panel' }, [
      el('p', { text: 'Climb the Cinderspire through Acts of branching map nodes. Fight monsters, rest, shop, and open events on the way to each Act boss.' }),
    ]),
    el('div', { class: 'panel' }, [
      el('p', { text: 'Each turn you get 3 Ember. Cards cost Ember to play. Attacks need a target; Skills and Powers usually don\'t. Unplayed cards discard at end of turn.' }),
    ]),
    el('div', { class: 'panel' }, [
      el('p', { text: 'Block absorbs damage but resets at the start of your next turn. Watch enemy intent icons above their HP — they tell you what\'s coming.' }),
    ]),
    el('div', { class: 'panel' }, [
      el('p', { text: 'Win runs to earn Sparks — spend them in the Archive to permanently unlock more cards and relics for future runs. Trials add optional extra challenge once you\'ve won once.' }),
    ]),
  ]);
  clear(app.root);
  app.root.appendChild(wrap);
}
