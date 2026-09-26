import { RunController } from './engine/run.js';
import { createDefaultMeta, computeSparks, applyMilestone } from './engine/meta.js';
import * as save from './engine/save.js';
import { STARTER_CARDS, STARTER_RELIC } from './data/starters.js';
import * as generated from './data/generated.js';
import { clear } from './ui/render.js';
import { sfx, setMuted, isMuted } from './ui/audio.js';

import { renderMainMenu, renderHowTo } from './ui/screens/mainmenu.js';
import { renderMapScreen } from './ui/screens/mapscreen.js';
import { renderCombatScreen, afterAction } from './ui/screens/combat.js';
import { renderRestScreen } from './ui/screens/rest.js';
import { renderShopScreen } from './ui/screens/shop.js';
import { renderEventScreen } from './ui/screens/event.js';
import { renderTreasureScreen } from './ui/screens/treasure.js';
import { renderRewardScreen } from './ui/screens/reward.js';
import { renderSummaryScreen } from './ui/screens/summary.js';
import { renderArchiveScreen } from './ui/screens/archive.js';
import { renderTrialsScreen } from './ui/screens/trials.js';
import { renderDeckViewScreen } from './ui/screens/deckview.js';

function buildDataStore() {
  return {
    cards: { ...STARTER_CARDS, ...generated.CARDS },
    relics: { ...STARTER_RELIC, ...generated.RELICS },
    enemies: { ...generated.ENEMIES },
    events: { ...generated.EVENTS },
    potions: { ...generated.POTIONS },
  };
}

class App {
  constructor() {
    this.root = document.getElementById('app');
    this.dataStore = buildDataStore();
    this.rc = new RunController(this.dataStore);
    this.meta = save.loadMeta() || createDefaultMeta(generated.STARTING_UNLOCKED_CARD_IDS, generated.STARTING_UNLOCKED_RELIC_IDS);
    this.rc.setMeta(this.meta);
    this.run = save.loadRun();
    this.combat = null;
    this.combatUI = {};
    this.uiTemp = {};
    this.screen = 'menu';
    if (this.run) {
      const node = this.currentNode();
      if (node && ['Monster', 'Elite', 'Boss'].includes(node.type) && !this.run.pendingReward) {
        // Mid-combat progress can't be resumed exactly (see REPORT.md) — restart this node's fight fresh.
        this.combatUI = {};
        this.combat = this.rc.startCombat(this.run, () => {});
        this.screen = 'combat';
      } else if (this.run.pendingReward) {
        this.screen = 'reward';
      } else if (node && node.type === 'Rest') this.screen = 'rest';
      else if (node && node.type === 'Shop') this.screen = 'shop';
      else if (node && node.type === 'Event') this.screen = 'event';
      else if (node && node.type === 'Treasure') this.screen = 'treasure';
      else this.screen = 'map';
    }
    this.renderScreen();
  }

  currentNode() {
    if (!this.run || this.run.currentNodeId === null) return null;
    return this.run.mapsByAct[this.run.act].nodes.find((n) => n.id === this.run.currentNodeId);
  }

  persist() {
    save.saveMeta(this.meta);
    save.saveRun(this.run);
  }

  persistAndRender(screen) {
    this.persist();
    if (screen) this.screen = screen;
    this.renderScreen();
  }

  goto(screen, extra) {
    this.screen = screen;
    Object.assign(this.uiTemp, extra || {});
    this.persist();
    this.renderScreen();
  }

  renderScreen() {
    clear(this.root);
    switch (this.screen) {
      case 'menu': return renderMainMenu(this);
      case 'howto': return renderHowTo(this);
      case 'map': return renderMapScreen(this);
      case 'combat': return renderCombatScreen(this);
      case 'rest': return renderRestScreen(this);
      case 'shop': return renderShopScreen(this);
      case 'event': return renderEventScreen(this);
      case 'treasure': return renderTreasureScreen(this);
      case 'reward': return renderRewardScreen(this);
      case 'summary': return renderSummaryScreen(this);
      case 'archive': return renderArchiveScreen(this);
      case 'trials': return renderTrialsScreen(this);
      case 'deckview': return renderDeckViewScreen(this);
      default: return renderMainMenu(this);
    }
  }

  // ---------- menu ----------
  continueRun() {
    this.screen = this.run ? this.screen : 'menu';
    this.renderScreen();
  }

  startNewRun() {
    if (this.run) this.settleRun('defeat', true); // abandoning from the menu counts as a give-up, same half-Sparks rule
    const seed = ((Date.now ? Date.now() : 0) ^ Math.floor(this.meta.sparks * 7919 + 12345)) >>> 0;
    this.run = this.rc.startNew(this.meta, this.meta.trialLevel, seed || 1);
    this.combat = null;
    this.uiTemp = {};
    this.goto('map');
  }

  // ---------- map / node flow ----------
  travelToNode(nodeId) {
    const node = this.rc.travelTo(this.run, nodeId);
    this.persist();
    if (['Monster', 'Elite', 'Boss'].includes(node.type)) {
      this.combatUI = {};
      this.combat = this.rc.startCombat(this.run, () => {});
      this.goto('combat');
    } else if (node.type === 'Rest') this.goto('rest');
    else if (node.type === 'Shop') this.goto('shop');
    else if (node.type === 'Event') this.goto('event');
    else if (node.type === 'Treasure') this.goto('treasure');
  }

  startForcedCombat(enemyId) {
    const node = this.currentNode();
    const known = this.dataStore.enemies[enemyId] ? enemyId : this.rc.rngFor(this.run).pick(
      Object.values(this.dataStore.enemies).filter((e) => e.act === this.run.act && e.role === 'normal').map((e) => e.id)
    );
    node.resolvedData = { ...(node.resolvedData || {}), enemyIds: [known] };
    this.combatUI = {};
    this.combat = this.rc.startCombat(this.run, () => {});
    this.goto('combat');
  }

  // Called after claiming (or skipping) any part of a combat reward. A reward can have an independent
  // card-choice part AND a boss-relic part; only navigate off the reward screen once BOTH are resolved
  // (run.pendingReward null) — otherwise stay put and re-render whatever's still pending. Navigating
  // away is required, not optional: re-rendering the reward screen with pendingReward already null
  // would crash (see REPORT.md) and re-running the *default* persistAndRender() path used to do exactly
  // that on every second claim.
  afterRewardClaim() {
    if (this.run.pendingReward) this.persistAndRender();
    else this.finishNodeAction();
  }

  finishNodeAction() {
    const node = this.currentNode();
    if (node && node.type === 'Boss') {
      if (this.run.act === 4) { this.endRun('victory'); return; }
      this.rc.advanceAct(this.run);
      this.persistAndRender('map');
      return;
    }
    this.persistAndRender('map');
  }

  // ---------- combat actions ----------
  onCardTap(inst, def) {
    if (def.target === 'Enemy') {
      if (this.combatUI.targetingCardId === inst.instanceId) {
        this.combatUI.selectedInstanceId = null;
        this.combatUI.targetingCardId = null;
        this.renderScreen();
      } else {
        this.combatUI.selectedInstanceId = inst.instanceId;
        this.combatUI.targetingCardId = inst.instanceId;
        this.renderScreen();
      }
      return;
    }
    const res = this.combat.playCard(inst.instanceId, null);
    this.combatUI.selectedInstanceId = null;
    this.combatUI.targetingCardId = null;
    afterAction(this, res);
  }

  onPotionTap(idx, potionDef) {
    if (!potionDef) return;
    const sentinel = `POTION:${idx}`;
    if (potionDef.target === 'Enemy') {
      this.combatUI.targetingCardId = this.combatUI.targetingCardId === sentinel ? null : sentinel;
      this.renderScreen();
      return;
    }
    const res = this.combat.usePotion(potionDef, null);
    this.run.potions.splice(idx, 1);
    afterAction(this, res);
  }

  playSelectedCardOn(enemyId) {
    const id = this.combatUI.targetingCardId;
    if (!id) return;
    this.combatUI.selectedInstanceId = null;
    this.combatUI.targetingCardId = null;
    if (typeof id === 'string' && id.startsWith('POTION:')) {
      const idx = parseInt(id.slice(7), 10);
      const potionId = this.run.potions[idx];
      const def = this.dataStore.potions[potionId];
      const res = this.combat.usePotion(def, enemyId);
      this.run.potions.splice(idx, 1);
      afterAction(this, res);
      return;
    }
    const res = this.combat.playCard(id, enemyId);
    afterAction(this, res);
  }

  endTurn() {
    const res = this.combat.endPlayerTurn();
    afterAction(this, res);
  }

  confirmChoice(selection) {
    const res = this.combat.resolvePendingChoice(selection);
    this.combatUI.choiceSelection = [];
    afterAction(this, res);
  }

  handleCombatOutcome(outcome) {
    const node = this.currentNode();
    if (outcome === 'victory') {
      sfx.victory();
      const reward = this.rc.finishCombat(this.run, node, 'victory');
      this.combat = null;
      if (reward) this.goto('reward');
      else this.finishNodeAction();
    } else {
      sfx.defeat();
      this.rc.finishCombat(this.run, node, 'defeat');
      this.combat = null;
      this.endRun('defeat');
    }
  }

  giveUpRun() {
    if (!window.confirm('Give up this climb? You will keep half the Sparks you would have earned.')) return;
    this.endRun('defeat', true);
  }

  // Shared bookkeeping for any run ending (victory, defeat, or a voluntary give-up/abandon). Updates
  // meta/stats/milestones and clears the run, but does NOT touch screen/navigation — callers decide
  // whether the player sees a summary screen (a real ending) or just silently moves on (menu abandon).
  settleRun(outcome, gaveUp) {
    const run = this.run;
    const sparks = computeSparks({
      nodesCleared: run.nodesCleared, elitesKilled: run.elitesKilled, actBossesKilled: run.actBossesKilled,
      summitBossKilled: outcome === 'victory', goldRemaining: run.gold, gaveUp,
    });
    this.meta.sparks += sparks;
    this.meta.stats.runs += 1;
    if (outcome === 'victory') this.meta.stats.wins += 1; else this.meta.stats.losses += 1;

    const unlockedNames = [];
    const grantRandom = (pool, listKey) => {
      const candidates = pool.filter((x) => !this.meta[listKey].includes(x.id));
      const pick = candidates[Math.floor(Math.random() * candidates.length) % (candidates.length || 1)];
      if (pick) this.meta[listKey].push(pick.id);
      return pick;
    };
    if (run.actBossesKilled >= 1) {
      applyMilestone(this.meta, 'cleanseUnlocked', () => unlockedNames.push('Cleanse now available at Rest sites.'));
    }
    if (run.actBossesKilled >= 2) {
      applyMilestone(this.meta, 'uncommonMilestone', () => {
        const pick = grantRandom(Object.values(this.dataStore.cards).filter((c) => c.rarity === 'Uncommon'), 'unlockedCardIds');
        if (pick) unlockedNames.push(`Unlocked card: ${pick.name}`);
      });
    }
    if (run.actBossesKilled >= 3) {
      applyMilestone(this.meta, 'rareMilestone', () => {
        const pick = grantRandom(Object.values(this.dataStore.relics).filter((r) => r.rarity === 'Rare'), 'unlockedRelicIds');
        if (pick) unlockedNames.push(`Unlocked relic: ${pick.name}`);
      });
    }
    if (outcome === 'victory') {
      applyMilestone(this.meta, 'trialsUnlocked', () => unlockedNames.push('Trials unlocked!'));
    }

    this.run = null;
    save.clearRun();
    return { sparks, unlockedNames, endedRun: run };
  }

  // ---------- run end / meta ----------
  endRun(outcome, gaveUp = false) {
    const run = this.run;
    const { sparks, unlockedNames } = this.settleRun(outcome, gaveUp);
    this.uiTemp.lastRunSummary = {
      outcome, act: run.act, nodesCleared: run.nodesCleared, elitesKilled: run.elitesKilled,
      sparksAwarded: sparks, milestonesUnlocked: unlockedNames,
    };
    this.persist();
    this.goto('summary');
  }
}

window.__ASHWALKER_APP__ = new App();
