// Programmatic SFX via Web Audio oscillators — no asset files, works fully offline. iOS Safari requires
// the AudioContext be created/resumed from within a user-gesture handler, so it's lazily constructed on
// the first tap rather than at module load.
let ctx = null;
let muted = false;

try {
  muted = localStorage.getItem('ashwalker.muted') === '1';
} catch (e) { /* private mode etc. — default unmuted */ }

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) ctx = new AC();
  }
  if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function tone({ freq, duration, type = 'sine', volume = 0.18, delay = 0, slideTo = null }) {
  if (muted) return;
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);
  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export function setMuted(value) {
  muted = value;
  try { localStorage.setItem('ashwalker.muted', value ? '1' : '0'); } catch (e) { /* ignore */ }
}

export function isMuted() { return muted; }

export const sfx = {
  unlock: () => getCtx(),
  click: () => tone({ freq: 320, duration: 0.05, type: 'square', volume: 0.06 }),
  cardPlay: () => tone({ freq: 260, duration: 0.09, type: 'triangle', volume: 0.14, slideTo: 180 }),
  damage: () => tone({ freq: 140, duration: 0.14, type: 'sawtooth', volume: 0.16, slideTo: 60 }),
  block: () => tone({ freq: 500, duration: 0.08, type: 'square', volume: 0.1, slideTo: 700 }),
  heal: () => tone({ freq: 440, duration: 0.16, type: 'sine', volume: 0.14, slideTo: 660 }),
  status: () => tone({ freq: 620, duration: 0.07, type: 'triangle', volume: 0.1 }),
  enemyDeath: () => { tone({ freq: 300, duration: 0.18, type: 'sawtooth', volume: 0.14, slideTo: 80 }); tone({ freq: 150, duration: 0.22, type: 'sine', volume: 0.1, delay: 0.05 }); },
  victory: () => { [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, duration: 0.22, type: 'triangle', volume: 0.14, delay: i * 0.11 })); },
  defeat: () => { [300, 250, 200, 140].forEach((f, i) => tone({ freq: f, duration: 0.3, type: 'sawtooth', volume: 0.12, delay: i * 0.12 })); },
  error: () => tone({ freq: 160, duration: 0.09, type: 'square', volume: 0.1 }),
};
