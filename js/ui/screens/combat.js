import { el, clear, ICON, spawnFx } from '../render.js';
import { renderCard } from '../cardview.js';
import { sfx } from '../audio.js';

function statusChips(combatant) {
  return Object.entries(combatant.statuses || {}).filter(([, v]) => v > 0).map(([id, v]) =>
    el('span', { class: 'status-chip', text: `${ICON[id] || ''} ${v}` }));
}

function playLogFx(app, log) {
  const root = app.root;
  log.forEach((entry, i) => {
    setTimeout(() => {
      if (entry.type === 'enemyDefeated') { sfx.enemyDeath(); return; }
      const target = entry.target ? root.querySelector(`[data-combatant="${entry.target}"]`) : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width / 2 - 10;
      const y = rect.top;
      if (entry.amount === 0 && entry.type !== 'status') return;
      if (entry.type === 'damage' || entry.type === 'scorch' || entry.type === 'combust') {
        spawnFx(root, `-${entry.amount}`, 'fx-damage', x, y);
        sfx.damage();
      } else if (entry.type === 'block' || entry.type === 'cinderplate') {
        spawnFx(root, `+${entry.amount}`, 'fx-block', x, y);
        sfx.block();
      } else if (entry.type === 'heal' || entry.type === 'embermend') {
        spawnFx(root, `+${entry.amount}`, 'fx-heal', x, y);
        sfx.heal();
      } else if (entry.type === 'status') {
        spawnFx(root, `${ICON[entry.status] || ''}${entry.stacks > 0 ? '+' : ''}${entry.stacks}`, 'fx-status', x, y);
        sfx.status();
      }
    }, i * 140);
  });
  const lastMeaningful = [...log].reverse().find((e) => e.type === 'enemyMove' || e.type === 'cardPlayed');
  if (lastMeaningful) {
    app.combatUI.lastLog = lastMeaningful.name ? `${lastMeaningful.name}` : '';
  }
}

function afterAction(app, res) {
  if (res && res.log) playLogFx(app, res.log);
  app.renderScreen();
  // Guard against scheduling this more than once: any action taken in the ~700ms grace window after
  // victory/defeat (the engine already no-ops further play, but a tap can still land and re-run this
  // path) would otherwise queue a second handleCombatOutcome call against an already-finalized combat.
  if (res && res.outcome && !app.combatUI.outcomeScheduled) {
    app.combatUI.outcomeScheduled = true;
    setTimeout(() => app.handleCombatOutcome(res.outcome), 700);
  }
}

export function renderCombatScreen(app) {
  const combat = app.combat;
  const ui = app.combatUI;
  const wrap = el('div', { class: 'screen no-scroll combat-screen' });

  wrap.appendChild(el('div', { class: 'topbar' }, [
    el('div', { class: 'stat hp', text: `${ICON.hp} ${combat.player.hp}/${combat.player.maxHp}` }),
    el('div', { class: 'stat ember', text: `${ICON.ember} ${combat.player.ember}/${combat.player.emberMax}` }),
    el('div', { class: 'stat', text: `Turn ${combat.turnNumber}` }),
  ]));

  const enemyRow = el('div', { class: 'enemy-row' });
  combat.enemies.forEach((e) => {
    const dead = e.hp <= 0;
    const targetable = !dead && ui.targetingCardId;
    const enemyDef = app.dataStore.enemies[e.enemyDefId];
    const pct = Math.max(0, Math.round((e.hp / e.maxHp) * 100));
    const node = el('div', {
      class: `enemy ${dead ? 'dead' : ''} ${targetable ? 'targetable' : ''} ${ui.hoverTarget === e.id ? 'targeting' : ''}`,
      'data-combatant': e.id,
      onClick: () => { if (targetable) app.playSelectedCardOn(e.id); },
    }, [
      el('div', { class: 'intent', text: e.intent ? (ICON[e.intent.icon] || '❔') : '' }),
      el('div', { class: 'enemy-portrait', text: '👤' }),
      el('div', { class: 'enemy-name', text: enemyDef ? enemyDef.name : e.id }),
      el('div', { class: 'hpbar' }, [el('div', { class: 'hpbar-fill', style: { width: `${pct}%` } })]),
      el('div', { class: 'hp-label', text: `${Math.max(0, e.hp)}/${e.maxHp}${e.block > 0 ? ` 🛡${e.block}` : ''}` }),
      el('div', { class: 'status-row' }, statusChips(e)),
    ]);
    enemyRow.appendChild(node);
  });
  wrap.appendChild(enemyRow);

  wrap.appendChild(el('div', { class: 'player-row' }, [
    el('div', { class: 'playerwrap', 'data-combatant': 'player' }, [
      el('div', { class: 'player-portrait', text: '🥷' }),
      combat.player.block > 0 ? el('div', { class: 'player-block-badge', text: String(combat.player.block) }) : null,
    ]),
    el('div', { class: 'status-row' }, statusChips(combat.player)),
  ]));

  wrap.appendChild(el('div', { class: 'log-line', text: ui.lastLog || '' }));

  const handWrap = el('div', { class: 'hand-wrap' });
  const hand = el('div', { class: 'hand' });
  combat.player.hand.forEach((inst) => {
    const def = app.dataStore.cards[inst.cardId];
    if (!def) return;
    const cost = def.cost === 'X' ? combat.player.ember : (inst.upgraded && def.upgrade?.cost !== undefined ? def.upgrade.cost : def.cost);
    const affordable = def.cost === 'X' ? true : combat.player.ember >= cost;
    hand.appendChild(renderCard(def, app.dataStore, {
      upgraded: inst.upgraded, affordable, selected: ui.selectedInstanceId === inst.instanceId,
      onClick: () => { sfx.cardPlay(); app.onCardTap(inst, def); },
    }));
  });
  handWrap.appendChild(hand);
  wrap.appendChild(handWrap);

  wrap.appendChild(el('div', { class: 'potion-row' }, app.run.potions.map((pid, idx) => {
    const p = app.dataStore.potions[pid];
    const active = ui.targetingCardId === `POTION:${idx}`;
    return el('div', { class: `potion-slot ${active ? 'selected' : ''}`, text: '🧪', title: p?.name, onClick: () => app.onPotionTap(idx, p) });
  })));

  wrap.appendChild(el('div', { class: 'combat-actionbar' }, [
    el('button', { class: 'pile-btn ghost', text: `📥 ${combat.player.drawPile.length}` }),
    el('button', { class: 'pile-btn ghost', text: `📤 ${combat.player.discardPile.length}` }),
    el('button', { class: 'endturn-btn primary', text: 'End Turn', onClick: () => { sfx.click(); app.endTurn(); } }),
    el('button', { class: 'pile-btn ghost', text: `⚱️ ${combat.player.exhaustPile.length}` }),
  ]));

  if (combat.pendingChoice) {
    wrap.appendChild(renderChoiceOverlay(app, combat.pendingChoice));
  }

  clear(app.root);
  app.root.appendChild(wrap);
}

function renderChoiceOverlay(app, choice) {
  const selected = new Set(app.combatUI.choiceSelection || []);
  const isScry = choice.type === 'scry';
  const title = isScry ? `Scry ${choice.count} — choose cards to discard` : `Choose ${choice.count} card(s) to exhaust`;
  const list = el('div', { class: 'deck-list' }, choice.cards.map((c) => {
    const def = app.dataStore.cards[c.cardId];
    const isSel = selected.has(c.instanceId);
    return el('div', {
      class: `deck-mini ${isSel ? 'selected' : ''}`,
      style: { border: isSel ? '2px solid var(--ember-bright)' : '1px solid var(--border)' },
      text: def ? def.name : c.cardId,
      onClick: () => {
        if (isScry) {
          if (selected.has(c.instanceId)) selected.delete(c.instanceId); else selected.add(c.instanceId);
        } else {
          if (selected.has(c.instanceId)) selected.delete(c.instanceId);
          else if (selected.size < choice.count) selected.add(c.instanceId);
        }
        app.combatUI.choiceSelection = [...selected];
        app.renderScreen();
      },
    });
  }));
  return el('div', { class: 'overlay' }, [
    el('div', { class: 'overlay-panel' }, [
      el('h3', { text: title }),
      list,
      el('div', { class: 'btnrow', style: { marginTop: '12px', justifyContent: 'center' } }, [
        el('button', { class: 'primary', text: 'Confirm', onClick: () => app.confirmChoice([...selected]) }),
      ]),
    ]),
  ]);
}

export { afterAction };
