import { test, assert, assertEqual } from './framework.js';
import { getActiveTrialModifiers, unlockCost, tryUnlock, createDefaultMeta, applyMilestone } from '../js/engine/meta.js';

test('trial modifiers are strictly cumulative', () => {
  const lv0 = getActiveTrialModifiers(0);
  assertEqual(lv0.enemyHpMult, 1);
  assertEqual(lv0.startingCurseCount, 0);
  const lv3 = getActiveTrialModifiers(3);
  assert(lv3.enemyHpMult > 1, 'level 3 should include level 1s hp mult');
  assertEqual(lv3.startingCurseCount, 1);
  assertEqual(lv3.extraEliteActs.has(1), false);
  const lv15 = getActiveTrialModifiers(15);
  assert(lv15.extraEliteActs.has(1) && lv15.extraEliteActs.has(2) && lv15.extraEliteActs.has(3));
  assertEqual(lv15.summitEnrageTurn, 6);
  assertEqual(lv15.startingMaxHpOverride, 63);
});

test('tryUnlock spends sparks exactly once and refuses insufficient funds', () => {
  const meta = createDefaultMeta([], []);
  meta.sparks = 60;
  const cost = unlockCost('card', 'Uncommon');
  assertEqual(cost, 120);
  const fail = tryUnlock(meta, 'card', 'someCard', 'Uncommon');
  assertEqual(fail.ok, false);
  assertEqual(meta.sparks, 60);
  meta.sparks = 200;
  const ok = tryUnlock(meta, 'card', 'someCard', 'Uncommon');
  assertEqual(ok.ok, true);
  assertEqual(meta.sparks, 80);
  assert(meta.unlockedCardIds.includes('someCard'));
  const again = tryUnlock(meta, 'card', 'someCard', 'Uncommon');
  assertEqual(again.ok, false);
  assertEqual(meta.sparks, 80);
});

test('applyMilestone only ever fires its effect once', () => {
  const meta = createDefaultMeta([], []);
  let calls = 0;
  applyMilestone(meta, 'testMilestone', () => { calls += 1; });
  applyMilestone(meta, 'testMilestone', () => { calls += 1; });
  assertEqual(calls, 1);
});
