// Starter content — authored directly (not by the content-generation pass) because the engine's own
// bootstrapping/tests depend on concrete starter data existing from the start. See DESIGN_BIBLE.md 4 & 12.
export const STARTER_CARDS = {
  ashstrike: {
    id: 'ashstrike', name: 'Ashstrike', type: 'Attack', rarity: 'Starter', cost: 1, target: 'Enemy',
    exhaust: false, effects: [{ op: 'damage', amount: 6 }],
    upgrade: { effects: [{ op: 'damage', amount: 9 }] },
    flavor: 'A simple, burning blow.',
  },
  ashguard: {
    id: 'ashguard', name: 'Ashguard', type: 'Skill', rarity: 'Starter', cost: 1, target: 'Self',
    exhaust: false, effects: [{ op: 'block', amount: 5 }],
    upgrade: { effects: [{ op: 'block', amount: 8 }] },
    flavor: 'Ash hardens to armor, briefly.',
  },
  emberkindle: {
    id: 'emberkindle', name: 'Emberkindle', type: 'Attack', rarity: 'Starter', cost: 1, target: 'Enemy',
    exhaust: false, effects: [{ op: 'damage', amount: 8 }, { op: 'applyStatus', status: 'Vulnerable', stacks: 1 }],
    upgrade: { effects: [{ op: 'damage', amount: 8 }, { op: 'applyStatus', status: 'Vulnerable', stacks: 2 }] },
    flavor: 'Strike the coal until it catches.',
  },
};

export const STARTER_RELIC = {
  cinderheart: {
    id: 'cinderheart', name: 'Cinderheart', rarity: 'Starter',
    flavor: "A coal that never quite goes out — it keeps you going between fights.",
    triggers: [{ on: 'onCombatEnd', effects: [{ op: 'heal', amount: 8 }] }],
  },
};
