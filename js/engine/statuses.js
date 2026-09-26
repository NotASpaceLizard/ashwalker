// Status effect rules — see DESIGN_BIBLE.md section 6. This is the full, closed list.
export const STATUS_DEFS = {
  Strength:    { name: 'Strength',    good: true,  permanent: true,  desc: (n) => `+${n} damage on Attacks.` },
  Dexterity:   { name: 'Dexterity',   good: true,  permanent: true,  desc: (n) => `+${n} Block on Block effects.` },
  Vulnerable:  { name: 'Vulnerable',  good: false, permanent: false, desc: (n) => `Takes 50% more damage (${n} turn${n === 1 ? '' : 's'}).` },
  Weak:        { name: 'Weak',        good: false, permanent: false, desc: (n) => `Deals 25% less damage (${n} turn${n === 1 ? '' : 's'}).` },
  Frail:       { name: 'Frail',       good: false, permanent: false, desc: (n) => `Gains 25% less Block (${n} turn${n === 1 ? '' : 's'}).` },
  Scorch:      { name: 'Scorch',      good: false, permanent: false, desc: (n) => `Takes ${n} damage at end of turn, then loses 1 stack.` },
  Ash:         { name: 'Ash',        good: false, permanent: true,  desc: (n) => `At 5 stacks: Combust (${n}/5).` },
  Intangible:  { name: 'Intangible',  good: true,  permanent: false, desc: (n) => `Reduces all damage taken to 1 (${n} turn${n === 1 ? '' : 's'}).` },
  Cinderplate:{ name: 'Cinderplate', good: true,  permanent: true,  desc: (n) => `Gains ${n} Block at end of turn.` },
  Embermend:   { name: 'Embermend',   good: true,  permanent: false, desc: (n) => `Heals ${n} at end of turn, then loses 1 stack.` },
  Stagger:     { name: 'Stagger',     good: false, permanent: false, desc: () => `Next action is skipped.` },
  Backdraft:   { name: 'Backdraft',   good: true,  permanent: true,  desc: (n) => `Reflects ${n} damage when hit by an Attack.` },
};

export const DECAYS_AT_TURN_END = ['Vulnerable', 'Weak', 'Frail', 'Intangible'];
export const ASH_COMBUST_THRESHOLD = 5;

export function getStatus(combatant, id) {
  return combatant.statuses[id] || 0;
}

export function setStatus(combatant, id, value) {
  if (value <= 0) delete combatant.statuses[id];
  else combatant.statuses[id] = value;
}

export function addStatus(combatant, id, stacks) {
  if (!stacks) return;
  const cur = getStatus(combatant, id);
  setStatus(combatant, id, cur + stacks);
}
