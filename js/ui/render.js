// Tiny DOM helper layer — no framework. iOS Safari gets Apple Color Emoji for free, so functional
// icons use emoji glyphs rather than custom art (guaranteed to render identically on the target device,
// unlike arbitrary Unicode dingbats which can fall back inconsistently across platforms).
export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props || {})) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === 'style' && typeof value === 'object') Object.assign(node.style, value);
    else if (value !== undefined && value !== null) node.setAttribute(key, value);
  }
  for (const child of Array.isArray(children) ? children : [children]) {
    if (child === null || child === undefined || child === false) continue;
    node.appendChild(typeof child === 'string' || typeof child === 'number' ? document.createTextNode(child) : child);
  }
  return node;
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function mount(root, node) {
  clear(root);
  root.appendChild(node);
}

export const ICON = {
  hp: '❤️', gold: '🪙', ember: '🔥', block: '🛡️', sparks: '✨',
  Attack: '⚔️', Skill: '📘', Power: '👑', Curse: '💀',
  Monster: '☠️', Elite: '⚡', Boss: '👹', Rest: '🏕️', Shop: '🏪', Treasure: '🎁', Event: '❓',
  attack: '⚔️', 'attack-heavy': '💥', defend: '🛡️', buff: '⬆️', debuff: '⬇️', summon: '➕', unknown: '❔',
  Strength: '💪', Dexterity: '🌀', Vulnerable: '🎯', Weak: '🥴', Frail: '🍂', Scorch: '🔥', Ash: '🌫️',
  Intangible: '👻', Cinderplate: '🧱', Embermend: '💧', Stagger: '⏸️', Backdraft: '🔁',
};

export function spawnFx(container, text, cls, x, y) {
  // Always anchored to document.body (unpadded), not `container`: #app has safe-area padding, and an
  // absolutely-positioned child's 0,0 starts at the padding edge, not the viewport — using viewport-
  // relative getBoundingClientRect() coordinates against a padded ancestor would drift by the safe-area
  // inset. document.body has no padding, so viewport coordinates map onto it directly.
  const node = el('div', { class: `fx-float ${cls}`, text, style: { left: `${x}px`, top: `${y}px`, position: 'fixed' } });
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 950);
}

export function showToast(root, text) {
  root.querySelectorAll('.toast').forEach((n) => n.remove());
  const node = el('div', { class: 'toast', text });
  root.appendChild(node);
  setTimeout(() => node.remove(), 1800);
}
