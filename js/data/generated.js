// Auto-generated content data for Ashwalker.
// Generated from a content-generation pass; do not hand-edit lightly.

export const CARDS = {
  "cc1_cinderstrike": {
    "id": "cc1_cinderstrike",
    "name": "Cinderstrike",
    "type": "Attack",
    "rarity": "Common",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 7, "hits": 1 }
    ],
    "flavor": "The ash remembers every wound it has given.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 9, "hits": 1 }
      ]
    }
  },
  "cc1_ashjab": {
    "id": "cc1_ashjab",
    "name": "Ash Jab",
    "type": "Attack",
    "rarity": "Common",
    "cost": 0,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 4, "hits": 1 },
      { "op": "applyStatus", "status": "Ash", "stacks": 1 }
    ],
    "flavor": "A flick of grey, a promise of fire to come.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 5, "hits": 1 },
        { "op": "applyStatus", "status": "Ash", "stacks": 1 }
      ]
    }
  },
  "cc1_cinderguard": {
    "id": "cc1_cinderguard",
    "name": "Cinderguard",
    "type": "Skill",
    "rarity": "Common",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "block", "amount": 6 }
    ],
    "flavor": "Ember-scarred skin turns aside the falling soot.",
    "upgrade": {
      "effects": [
        { "op": "block", "amount": 8 }
      ]
    }
  },
  "cc1_kindlewound": {
    "id": "cc1_kindlewound",
    "name": "Kindling Wound",
    "type": "Attack",
    "rarity": "Common",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 5, "hits": 1 },
      { "op": "applyStatus", "status": "Scorch", "stacks": 1 }
    ],
    "flavor": "A shallow cut that never stops burning.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 5, "hits": 1 },
        { "op": "applyStatus", "status": "Scorch", "stacks": 2 }
      ]
    }
  },
  "cc1_twincinders": {
    "id": "cc1_twincinders",
    "name": "Twin Cinders",
    "type": "Attack",
    "rarity": "Common",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 3, "hits": 2 }
    ],
    "flavor": "Two sparks land where one would miss.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 4, "hits": 2 }
      ]
    }
  },
  "cc1_scorchward": {
    "id": "cc1_scorchward",
    "name": "Scorchward",
    "type": "Skill",
    "rarity": "Common",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Scorch", "stacks": 3 }
    ],
    "flavor": "You breathe the tower's heat back at it.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Scorch", "stacks": 4 }
      ]
    }
  },
  "cc1_immolatingblow": {
    "id": "cc1_immolatingblow",
    "name": "Immolating Blow",
    "type": "Attack",
    "rarity": "Common",
    "cost": 2,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 12, "hits": 1 },
      { "op": "applyStatus", "status": "Scorch", "stacks": 2 }
    ],
    "flavor": "It catches. It always catches.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 14, "hits": 1 },
        { "op": "applyStatus", "status": "Scorch", "stacks": 2 }
      ]
    }
  },
  "cc1_smolderingresolve": {
    "id": "cc1_smolderingresolve",
    "name": "Smoldering Resolve",
    "type": "Power",
    "rarity": "Common",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Backdraft", "stacks": 3 }
    ],
    "flavor": "Strike the revenant and the tower strikes back.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Backdraft", "stacks": 4 }
      ]
    }
  },
  "cc1_cinderplatewall": {
    "id": "cc1_cinderplatewall",
    "name": "Cinderplate Wall",
    "type": "Power",
    "rarity": "Common",
    "cost": 2,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Cinderplate", "stacks": 3 }
    ],
    "flavor": "Ash hardens to armor for those who do not flinch.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 4 }
      ]
    }
  },
  "cc1_ashscatter": {
    "id": "cc1_ashscatter",
    "name": "Ash Scatter",
    "type": "Skill",
    "rarity": "Common",
    "cost": 0,
    "target": "AllEnemies",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Ash", "stacks": 1 }
    ],
    "flavor": "A grey ash settles over every foe.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Ash", "stacks": 2 }
      ]
    }
  },
  "cc1_cinderwave": {
    "id": "cc1_cinderwave",
    "name": "Cinderwave",
    "type": "Attack",
    "rarity": "Common",
    "cost": 1,
    "target": "AllEnemies",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 4, "hits": 1 }
    ],
    "flavor": "Fire does not choose favorites.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 5, "hits": 1 }
      ]
    }
  },
  "cc1_pyresmash": {
    "id": "cc1_pyresmash",
    "name": "Pyre Smash",
    "type": "Attack",
    "rarity": "Common",
    "cost": 3,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 20, "hits": 1 },
      { "op": "applyStatus", "status": "Scorch", "stacks": 2 }
    ],
    "flavor": "The tower's heart, briefly, in your fist.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 24, "hits": 1 },
        { "op": "applyStatus", "status": "Scorch", "stacks": 2 }
      ]
    }
  },
  "cc1_cauterize": {
    "id": "cc1_cauterize",
    "name": "Cauterize",
    "type": "Skill",
    "rarity": "Common",
    "cost": 2,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "heal", "amount": 8 },
      { "op": "removeStatus", "status": "Scorch", "stacks": 2 }
    ],
    "flavor": "Seal the wound before the fire spreads further.",
    "upgrade": {
      "effects": [
        { "op": "heal", "amount": 10 },
        { "op": "removeStatus", "status": "Scorch", "stacks": 3 }
      ]
    }
  },
  "cc1_infernalbarrage": {
    "id": "cc1_infernalbarrage",
    "name": "Infernal Barrage",
    "type": "Attack",
    "rarity": "Common",
    "cost": "X",
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "repeatX", "effects": [
        { "op": "damage", "amount": 5, "hits": 1 },
        { "op": "applyStatus", "status": "Scorch", "stacks": 1 }
      ] }
    ],
    "flavor": "Spend every last coal; leave nothing unburnt.",
    "upgrade": {
      "effects": [
        { "op": "repeatX", "effects": [
          { "op": "damage", "amount": 6, "hits": 1 },
          { "op": "applyStatus", "status": "Scorch", "stacks": 1 }
        ] }
      ]
    }
  },
  "cc1_recklessember": {
    "id": "cc1_recklessember",
    "name": "Reckless Ember",
    "type": "Skill",
    "rarity": "Common",
    "cost": 0,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "selfDamage", "amount": 1 },
      { "op": "draw", "count": 1 }
    ],
    "flavor": "Insight costs blood in the Cinderspire.",
    "upgrade": {
      "effects": [
        { "op": "selfDamage", "amount": 1 },
        { "op": "draw", "count": 2 }
      ]
    }
  },
  "cc2_guard": {
    "id": "cc2_guard",
    "name": "Guard",
    "type": "Skill",
    "rarity": "Common",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "block", "amount": 6 }
    ],
    "flavor": "The ash settles where the flame cannot reach.",
    "upgrade": {
      "effects": [
        { "op": "block", "amount": 8 }
      ]
    }
  },
  "cc2_ashen_ward": {
    "id": "cc2_ashen_ward",
    "name": "Ashen Ward",
    "type": "Skill",
    "rarity": "Common",
    "cost": 2,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "block", "amount": 12 }
    ],
    "flavor": "Wrap yourself in cinder and silence.",
    "upgrade": {
      "effects": [
        { "op": "block", "amount": 14 }
      ]
    }
  },
  "cc2_cinderplate_shell": {
    "id": "cc2_cinderplate_shell",
    "name": "Cinderplate Shell",
    "type": "Skill",
    "rarity": "Common",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "block", "amount": 5 },
      { "op": "applyStatus", "status": "Cinderplate", "stacks": 1 }
    ],
    "flavor": "One scale of the tower's endless burn, now yours.",
    "upgrade": {
      "effects": [
        { "op": "block", "amount": 5 },
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 2 }
      ]
    }
  },
  "cc2_smoldering_bulwark": {
    "id": "cc2_smoldering_bulwark",
    "name": "Smoldering Bulwark",
    "type": "Skill",
    "rarity": "Common",
    "cost": 3,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "block", "amount": 18 }
    ],
    "flavor": "Stand still long enough and the tower forgets you.",
    "upgrade": {
      "effects": [
        { "op": "block", "amount": 21 }
      ]
    }
  },
  "cc2_frailing_strike": {
    "id": "cc2_frailing_strike",
    "name": "Frailing Strike",
    "type": "Attack",
    "rarity": "Common",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 5, "hits": 1 },
      { "op": "applyStatus", "status": "Frail", "stacks": 1 }
    ],
    "flavor": "Ash settles in the joints, and the armor forgets how to hold.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 6, "hits": 1 },
        { "op": "applyStatus", "status": "Frail", "stacks": 1 }
      ]
    }
  },
  "cc2_backdraft_jab": {
    "id": "cc2_backdraft_jab",
    "name": "Backdraft Jab",
    "type": "Attack",
    "rarity": "Common",
    "cost": 2,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 12 },
      { "op": "applyStatus", "status": "Weak", "stacks": 1 }
    ],
    "flavor": "The air ignites before the blow lands.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 14 },
        { "op": "applyStatus", "status": "Weak", "stacks": 1 }
      ]
    }
  },
  "cc2_scorchline": {
    "id": "cc2_scorchline",
    "name": "Scorchline",
    "type": "Attack",
    "rarity": "Common",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 6 },
      { "op": "applyStatus", "status": "Scorch", "stacks": 1 }
    ],
    "flavor": "It burns long after you've walked away.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 8 },
        { "op": "applyStatus", "status": "Scorch", "stacks": 1 }
      ]
    }
  },
  "cc2_quick_study": {
    "id": "cc2_quick_study",
    "name": "Quick Study",
    "type": "Skill",
    "rarity": "Common",
    "cost": 1,
    "target": "None",
    "exhaust": true,
    "effects": [
      { "op": "draw", "count": 2 }
    ],
    "flavor": "Even revenants remember how to learn.",
    "upgrade": {
      "effects": [
        { "op": "draw", "count": 3 }
      ]
    }
  },
  "cc2_cinder_surge": {
    "id": "cc2_cinder_surge",
    "name": "Cinder Surge",
    "type": "Skill",
    "rarity": "Common",
    "cost": "X",
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "repeatX", "effects": [
        { "op": "block", "amount": 5 }
      ] }
    ],
    "flavor": "Feed the fire everything you have left.",
    "upgrade": {
      "effects": [
        { "op": "repeatX", "effects": [
          { "op": "block", "amount": 6 }
        ] }
      ]
    }
  },
  "cc2_kindle": {
    "id": "cc2_kindle",
    "name": "Kindle",
    "type": "Skill",
    "rarity": "Common",
    "cost": 0,
    "target": "None",
    "exhaust": true,
    "effects": [
      { "op": "gainEmber", "count": 1 }
    ],
    "flavor": "A spark remembered, a fire renewed.",
    "upgrade": {
      "effects": [
        { "op": "gainEmber", "count": 2 }
      ]
    }
  },
  "cc2_stoke_the_flame": {
    "id": "cc2_stoke_the_flame",
    "name": "Stoke the Flame",
    "type": "Skill",
    "rarity": "Common",
    "cost": 1,
    "target": "None",
    "exhaust": false,
    "effects": [
      { "op": "gainEmber", "count": 1 },
      { "op": "draw", "count": 1 }
    ],
    "flavor": "Breathe in ash; breathe out purpose.",
    "upgrade": {
      "effects": [
        { "op": "gainEmber", "count": 1 },
        { "op": "draw", "count": 2 }
      ]
    }
  },
  "cc2_ashfall": {
    "id": "cc2_ashfall",
    "name": "Ashfall",
    "type": "Skill",
    "rarity": "Common",
    "cost": 2,
    "target": "AllEnemies",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Vulnerable", "stacks": 2 }
    ],
    "flavor": "Soft as snow, and it still finds every wound.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 3 }
      ]
    }
  },
  "cc2_smother": {
    "id": "cc2_smother",
    "name": "Smother",
    "type": "Skill",
    "rarity": "Common",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Weak", "stacks": 2 },
      { "op": "block", "amount": 3 }
    ],
    "flavor": "Choke the flame, if only for a moment.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 3 },
        { "op": "block", "amount": 3 }
      ]
    }
  },
  "cc2_embercore": {
    "id": "cc2_embercore",
    "name": "Embercore",
    "type": "Power",
    "rarity": "Common",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Cinderplate", "stacks": 2 }
    ],
    "flavor": "A coal lodged where a heart once was.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 3 }
      ]
    }
  },
  "cc2_dexterous_ashes": {
    "id": "cc2_dexterous_ashes",
    "name": "Dexterous Ashes",
    "type": "Power",
    "rarity": "Common",
    "cost": 2,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "gainDexterity", "stacks": 2 }
    ],
    "flavor": "Even cinders learn to dodge.",
    "upgrade": {
      "effects": [
        { "op": "gainDexterity", "stacks": 3 }
      ]
    }
  },
  "cu1_cinderjab": {
    "id": "cu1_cinderjab",
    "name": "Cinder Jab",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 6 },
      { "op": "applyStatus", "status": "Ash", "stacks": 2 }
    ],
    "flavor": "A quick stab, and the wound blackens to soot.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 6 },
        { "op": "applyStatus", "status": "Ash", "stacks": 3 }
      ]
    }
  },
  "cu1_wildfirelash": {
    "id": "cu1_wildfirelash",
    "name": "Wildfire Lash",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "AllEnemies",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 4 },
      { "op": "applyStatus", "status": "Ash", "stacks": 2 }
    ],
    "flavor": "Flame does not choose; it only spreads.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 4 },
        { "op": "applyStatus", "status": "Ash", "stacks": 3 }
      ]
    }
  },
  "cu1_detonatingblow": {
    "id": "cu1_detonatingblow",
    "name": "Detonating Blow",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 3,
    "target": "Enemy",
    "exhaust": true,
    "effects": [
      { "op": "damage", "amount": 16 },
      { "op": "applyStatus", "status": "Ash", "stacks": 4 }
    ],
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 18 },
        { "op": "applyStatus", "status": "Ash", "stacks": 5 }
      ]
    },
    "flavor": "One strike, and the air itself catches fire."
  },
  "cu1_bloodember": {
    "id": "cu1_bloodember",
    "name": "Blood Ember",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "selfDamage", "amount": 2 },
      { "op": "damage", "amount": 10 }
    ],
    "flavor": "Burn your own blood to make the ember roar.",
    "upgrade": {
      "effects": [
        { "op": "selfDamage", "amount": 2 },
        { "op": "damage", "amount": 13 }
      ]
    }
  },
  "cu1_ashenmight": {
    "id": "cu1_ashenmight",
    "name": "Ashen Might",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 6 },
      { "op": "gainStrength", "stacks": 1 }
    ],
    "flavor": "Every wound feeds the fire in your marrow.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 7 },
        { "op": "gainStrength", "stacks": 1 }
      ]
    }
  },
  "cu1_ashenmomentum": {
    "id": "cu1_ashenmomentum",
    "name": "Ashen Momentum",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 2,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 10 },
      { "op": "conditional",
        "condition": { "type": "statusStacksGTE", "who": "self", "statusId": "Strength", "n": 3 },
        "then": [ { "op": "applyStatus", "status": "Vulnerable", "stacks": 2 } ],
        "else": [ { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 } ]
      }
    ],
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 12 },
        { "op": "conditional",
          "condition": { "type": "statusStacksGTE", "who": "self", "statusId": "Strength", "n": 3 },
          "then": [ { "op": "applyStatus", "status": "Vulnerable", "stacks": 3 } ],
          "else": [ { "op": "applyStatus", "status": "Vulnerable", "stacks": 2 } ]
        }
      ]
    },
    "flavor": "The stronger the revenant, the deeper the scar."
  },
  "cu1_infernalcinders": {
    "id": "cu1_infernalcinders",
    "name": "Infernal Cinders",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": "X",
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "repeatX", "effects": [
        { "op": "damage", "amount": 3 },
        { "op": "applyStatus", "status": "Ash", "stacks": 1 }
      ] }
    ],
    "upgrade": {
      "effects": [
        { "op": "repeatX", "effects": [
          { "op": "damage", "amount": 4 },
          { "op": "applyStatus", "status": "Ash", "stacks": 1 }
        ] }
      ]
    },
    "flavor": "Feed the fire everything you have; it always wants more."
  },
  "cu1_ashheap": {
    "id": "cu1_ashheap",
    "name": "Ash Heap",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Ash", "stacks": 4 }
    ],
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Ash", "stacks": 5 }
      ]
    },
    "flavor": "Bury your foe in the last breath of a dying star."
  },
  "cu1_emberrage": {
    "id": "cu1_emberrage",
    "name": "Ember Rage",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "selfDamage", "amount": 2 },
      { "op": "gainStrength", "stacks": 2 }
    ],
    "flavor": "Pain is only fuel to a heart that already burns.",
    "upgrade": {
      "effects": [
        { "op": "selfDamage", "amount": 2 },
        { "op": "gainStrength", "stacks": 3 }
      ]
    }
  },
  "cu1_furnaceflesh": {
    "id": "cu1_furnaceflesh",
    "name": "Furnace Flesh",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 0,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "gainStrength", "stacks": 1 }
    ],
    "upgrade": {
      "effects": [
        { "op": "gainStrength", "stacks": 2 }
      ]
    },
    "flavor": "Your flesh remembers being forged, not born."
  },
  "cu1_cinderbrand": {
    "id": "cu1_cinderbrand",
    "name": "Cinderbrand",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Weak", "stacks": 2 },
      { "op": "applyStatus", "status": "Ash", "stacks": 2 }
    ],
    "flavor": "Weakness is just ash that hasn't caught fire yet.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 2 },
        { "op": "applyStatus", "status": "Ash", "stacks": 3 }
      ]
    }
  },
  "cu1_infernaltempo": {
    "id": "cu1_infernaltempo",
    "name": "Infernal Tempo",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 2,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "draw", "count": 2 },
      { "op": "gainStrength", "stacks": 1 }
    ],
    "flavor": "The Cinderspire does not wait for the slow.",
    "upgrade": {
      "effects": [
        { "op": "draw", "count": 2 },
        { "op": "gainStrength", "stacks": 2 }
      ]
    }
  },
  "cu1_cinderplating": {
    "id": "cu1_cinderplating",
    "name": "Cinderplating",
    "type": "Power",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Cinderplate", "stacks": 3 }
    ],
    "flavor": "Let the soot harden into something like armor.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 4 }
      ]
    }
  },
  "cu1_backdraftaura": {
    "id": "cu1_backdraftaura",
    "name": "Backdraft Aura",
    "type": "Power",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Backdraft", "stacks": 5 }
    ],
    "flavor": "Strike the revenant, and the fire strikes back.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Backdraft", "stacks": 6 }
      ]
    }
  },
  "cu1_risingheat": {
    "id": "cu1_risingheat",
    "name": "Rising Heat",
    "type": "Power",
    "rarity": "Uncommon",
    "cost": 2,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "gainStrength", "stacks": 2 },
      { "op": "applyStatus", "status": "Embermend", "stacks": 2 }
    ],
    "flavor": "The climb burns hotter with every step upward.",
    "upgrade": {
      "effects": [
        { "op": "gainStrength", "stacks": 2 },
        { "op": "applyStatus", "status": "Embermend", "stacks": 3 }
      ]
    }
  },
  "cu2_creeping_dread": {
    "id": "cu2_creeping_dread",
    "name": "Creeping Dread",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 7, "hits": 1 },
      { "op": "applyStatus", "status": "Weak", "stacks": 1 }
    ],
    "flavor": "The ash remembers every wound it has caused.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 9, "hits": 1 },
        { "op": "applyStatus", "status": "Weak", "stacks": 2 }
      ]
    }
  },
  "cu2_ashen_snare": {
    "id": "cu2_ashen_snare",
    "name": "Ashen Snare",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 2,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 12, "hits": 1 },
      { "op": "applyStatus", "status": "Vulnerable", "stacks": 2 }
    ],
    "flavor": "Even stone forgets how to stand once it's afraid.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 14, "hits": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 2 }
      ]
    }
  },
  "cu2_choking_ash": {
    "id": "cu2_choking_ash",
    "name": "Choking Ash",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "AllEnemies",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Weak", "stacks": 2 }
    ],
    "flavor": "Breathe deep. Breathe last.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 3 }
      ]
    }
  },
  "cu2_stagger_step": {
    "id": "cu2_stagger_step",
    "name": "Stagger Step",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 2,
    "target": "Enemy",
    "exhaust": true,
    "effects": [
      { "op": "damage", "amount": 9, "hits": 1 },
      { "op": "applyStatus", "status": "Stagger", "stacks": 1 }
    ],
    "flavor": "One perfect strike, spent forever.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 11, "hits": 1 },
        { "op": "applyStatus", "status": "Stagger", "stacks": 1 }
      ]
    }
  },
  "cu2_embersight": {
    "id": "cu2_embersight",
    "name": "Embersight",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "None",
    "exhaust": false,
    "effects": [
      { "op": "scry", "count": 3 },
      { "op": "draw", "count": 1 }
    ],
    "flavor": "The tower shows you tomorrow's fire.",
    "upgrade": {
      "effects": [
        { "op": "scry", "count": 4 },
        { "op": "draw", "count": 1 }
      ]
    }
  },
  "cu2_cinder_purge": {
    "id": "cu2_cinder_purge",
    "name": "Cinder Purge",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "None",
    "exhaust": false,
    "effects": [
      { "op": "exhaustCard", "selector": "hand-chosen(1)" },
      { "op": "draw", "count": 2 }
    ],
    "flavor": "Let the weak card burn; keep what still burns hotter.",
    "upgrade": {
      "effects": [
        { "op": "exhaustCard", "selector": "hand-chosen(1)" },
        { "op": "draw", "count": 3 }
      ]
    }
  },
  "cu2_hollow_offering": {
    "id": "cu2_hollow_offering",
    "name": "Hollow Offering",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 2,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "exhaustCard", "selector": "hand-random(1)" },
      { "op": "damage", "amount": 18, "hits": 1 }
    ],
    "flavor": "Feed the Cinderspire what it wants, and take more than it gives.",
    "upgrade": {
      "effects": [
        { "op": "exhaustCard", "selector": "hand-random(1)" },
        { "op": "damage", "amount": 22, "hits": 1 }
      ]
    }
  },
  "cu2_ashbound_resolve": {
    "id": "cu2_ashbound_resolve",
    "name": "Ashbound Resolve",
    "type": "Power",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "exhaustCard", "selector": "hand-random(1)" },
      { "op": "applyStatus", "status": "Cinderplate", "stacks": 3 }
    ],
    "flavor": "Discard the tinder. Keep the coal.",
    "upgrade": {
      "effects": [
        { "op": "exhaustCard", "selector": "hand-random(1)" },
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 4 }
      ]
    }
  },
  "cu2_last_look": {
    "id": "cu2_last_look",
    "name": "Last Look",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 0,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "scry", "count": 2 },
      { "op": "applyStatus", "status": "Weak", "stacks": 1 }
    ],
    "flavor": "Even the dying glance twice.",
    "upgrade": {
      "effects": [
        { "op": "scry", "count": 3 },
        { "op": "applyStatus", "status": "Weak", "stacks": 1 }
      ]
    }
  },
  "cu2_binding_cinders": {
    "id": "cu2_binding_cinders",
    "name": "Binding Cinders",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 3,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Vulnerable", "stacks": 3 },
      { "op": "applyStatus", "status": "Weak", "stacks": 3 },
      { "op": "block", "amount": 8 }
    ],
    "flavor": "Wrap them in smoke until the fear catches.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 4 },
        { "op": "applyStatus", "status": "Weak", "stacks": 4 },
        { "op": "block", "amount": 8 }
      ]
    }
  },
  "cu2_smoldering_grip": {
    "id": "cu2_smoldering_grip",
    "name": "Smoldering Grip",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 4, "hits": 2 },
      { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
    ],
    "flavor": "Twice struck, twice marked.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 5, "hits": 2 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ]
    }
  },
  "cu2_the_long_exhale": {
    "id": "cu2_the_long_exhale",
    "name": "The Long Exhale",
    "type": "Power",
    "rarity": "Uncommon",
    "cost": 2,
    "target": "AllEnemies",
    "exhaust": true,
    "effects": [
      { "op": "applyStatus", "status": "Dexterity", "stacks": 3, "target": "Self" },
      { "op": "applyStatus", "status": "Weak", "stacks": 1 }
    ],
    "flavor": "Smoke lingers longer than the fire that made it.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Dexterity", "stacks": 4, "target": "Self" },
        { "op": "applyStatus", "status": "Weak", "stacks": 1 }
      ]
    }
  },
  "cu2_pyre_ledger": {
    "id": "cu2_pyre_ledger",
    "name": "Pyre Ledger",
    "type": "Skill",
    "rarity": "Uncommon",
    "cost": 2,
    "target": "None",
    "exhaust": false,
    "effects": [
      { "op": "exhaustCard", "selector": "all-hand" },
      { "op": "draw", "count": 4 }
    ],
    "flavor": "Burn the ledger; write a new one in ash.",
    "upgrade": {
      "effects": [
        { "op": "exhaustCard", "selector": "all-hand" },
        { "op": "draw", "count": 5 }
      ]
    }
  },
  "cu2_grasping_ember": {
    "id": "cu2_grasping_ember",
    "name": "Grasping Ember",
    "type": "Attack",
    "rarity": "Uncommon",
    "cost": "X",
    "target": "Enemy",
    "exhaust": true,
    "effects": [
      { "op": "repeatX", "effects": [
        { "op": "damage", "amount": 5, "hits": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] }
    ],
    "flavor": "However much you feed it, it always wants more.",
    "upgrade": {
      "effects": [
        { "op": "repeatX", "effects": [
          { "op": "damage", "amount": 6, "hits": 1 },
          { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
        ] }
      ]
    }
  },
  "cu2_spire_widow_ward": {
    "id": "cu2_spire_widow_ward",
    "name": "Spire Widow's Ward",
    "type": "Power",
    "rarity": "Uncommon",
    "cost": 3,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "applyStatus", "status": "Backdraft", "stacks": 4 },
      { "op": "applyStatus", "status": "Dexterity", "stacks": 2 }
    ],
    "flavor": "Strike the revenant and wear its burn home.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Backdraft", "stacks": 5 },
        { "op": "applyStatus", "status": "Dexterity", "stacks": 3 }
      ]
    }
  },
  "cr_cinderspire_reckoning": {
    "id": "cr_cinderspire_reckoning",
    "name": "Cinderspire Reckoning",
    "type": "Attack",
    "rarity": "Rare",
    "cost": "X",
    "target": "Enemy",
    "exhaust": true,
    "effects": [
      { "op": "repeatX", "effects": [
        { "op": "damage", "amount": 6, "hits": 1 },
        { "op": "applyStatus", "status": "Ash", "stacks": 1 }
      ] }
    ],
    "flavor": "The tower does not forgive; it only compounds.",
    "upgrade": {
      "effects": [
        { "op": "repeatX", "effects": [
          { "op": "damage", "amount": 7, "hits": 1 },
          { "op": "applyStatus", "status": "Ash", "stacks": 1 }
        ] }
      ]
    }
  },
  "cr_backdraft_core": {
    "id": "cr_backdraft_core",
    "name": "Backdraft Core",
    "type": "Power",
    "rarity": "Rare",
    "cost": 1,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "applyStatus", "status": "Backdraft", "stacks": 8 }
    ],
    "flavor": "Wounds answered in kind, forever.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Backdraft", "stacks": 10 }
      ]
    }
  },
  "cr_spinebark_retort": {
    "id": "cr_spinebark_retort",
    "name": "Spinebark Retort",
    "type": "Attack",
    "rarity": "Rare",
    "cost": 2,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 13, "hits": 1 },
      { "op": "applyStatus", "status": "Backdraft", "stacks": 3, "target": "Self" }
    ],
    "flavor": "Strike the revenant, and carry its fire home.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 15, "hits": 1 },
        { "op": "applyStatus", "status": "Backdraft", "stacks": 3, "target": "Self" }
      ]
    }
  },
  "cr_molten_retaliation": {
    "id": "cr_molten_retaliation",
    "name": "Molten Retaliation",
    "type": "Skill",
    "rarity": "Rare",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "block", "amount": 8 },
      { "op": "applyStatus", "status": "Backdraft", "stacks": 3 }
    ],
    "flavor": "Ash settles into armor; armor bites back.",
    "upgrade": {
      "effects": [
        { "op": "block", "amount": 10 },
        { "op": "applyStatus", "status": "Backdraft", "stacks": 3 }
      ]
    }
  },
  "cr_barrage_of_embers": {
    "id": "cr_barrage_of_embers",
    "name": "Barrage of Embers",
    "type": "Attack",
    "rarity": "Rare",
    "cost": 3,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 7, "hits": 5 }
    ],
    "flavor": "Five embers, one verdict.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 8, "hits": 5 }
      ]
    }
  },
  "cr_ashfall_volley": {
    "id": "cr_ashfall_volley",
    "name": "Ashfall Volley",
    "type": "Attack",
    "rarity": "Rare",
    "cost": 2,
    "target": "AllEnemies",
    "exhaust": false,
    "effects": [
      { "op": "applyStatus", "status": "Vulnerable", "stacks": 1, "target": "AllEnemies" },
      { "op": "damage", "amount": 4, "hits": 4, "target": "AllEnemies" }
    ],
    "flavor": "Cinders don't choose favorites.",
    "upgrade": {
      "effects": [
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1, "target": "AllEnemies" },
        { "op": "damage", "amount": 5, "hits": 4, "target": "AllEnemies" }
      ]
    }
  },
  "cr_flurry_of_ash": {
    "id": "cr_flurry_of_ash",
    "name": "Flurry of Ash",
    "type": "Attack",
    "rarity": "Rare",
    "cost": 1,
    "target": "Enemy",
    "exhaust": false,
    "effects": [
      { "op": "damage", "amount": 3, "hits": 4 }
    ],
    "flavor": "Every scar swings again.",
    "upgrade": {
      "effects": [
        { "op": "damage", "amount": 4, "hits": 4 }
      ]
    }
  },
  "cr_molten_bulwark": {
    "id": "cr_molten_bulwark",
    "name": "Molten Bulwark",
    "type": "Power",
    "rarity": "Rare",
    "cost": 2,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "block", "amount": 6 },
      { "op": "applyStatus", "status": "Cinderplate", "stacks": 4 }
    ],
    "flavor": "The tower's heat, worn like a second skin.",
    "upgrade": {
      "effects": [
        { "op": "block", "amount": 6 },
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 6 }
      ]
    }
  },
  "cr_undying_ember": {
    "id": "cr_undying_ember",
    "name": "Undying Ember",
    "type": "Power",
    "rarity": "Rare",
    "cost": 2,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "heal", "amount": 3 },
      { "op": "applyStatus", "status": "Embermend", "stacks": 5 }
    ],
    "flavor": "Even snuffed, the revenant remembers how to burn.",
    "upgrade": {
      "effects": [
        { "op": "heal", "amount": 5 },
        { "op": "applyStatus", "status": "Embermend", "stacks": 7 }
      ]
    }
  },
  "cr_ashwalkers_communion": {
    "id": "cr_ashwalkers_communion",
    "name": "Ashwalker's Communion",
    "type": "Power",
    "rarity": "Rare",
    "cost": 1,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "conditional",
        "condition": { "type": "handSizeGTE", "n": 4 },
        "then": [ { "op": "gainStrength", "stacks": 2 } ],
        "else": [ { "op": "draw", "count": 1 } ]
      }
    ],
    "flavor": "The tower listens to those who still carry choices.",
    "upgrade": {
      "effects": [
        { "op": "conditional",
          "condition": { "type": "handSizeGTE", "n": 4 },
          "then": [ { "op": "gainStrength", "stacks": 3 } ],
          "else": [ { "op": "draw", "count": 2 } ]
        }
      ]
    }
  },
  "cr_cindercore_ascendance": {
    "id": "cr_cindercore_ascendance",
    "name": "Cindercore Ascendance",
    "type": "Power",
    "rarity": "Rare",
    "cost": 3,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "gainStrength", "stacks": 3 },
      { "op": "gainDexterity", "stacks": 3 },
      { "op": "applyStatus", "status": "Backdraft", "stacks": 2 }
    ],
    "flavor": "What the summit demands, the revenant becomes.",
    "upgrade": {
      "effects": [
        { "op": "gainStrength", "stacks": 4 },
        { "op": "gainDexterity", "stacks": 4 },
        { "op": "applyStatus", "status": "Backdraft", "stacks": 2 }
      ]
    }
  },
  "cr_last_ember_stand": {
    "id": "cr_last_ember_stand",
    "name": "Last Ember Stand",
    "type": "Skill",
    "rarity": "Rare",
    "cost": 0,
    "target": "Self",
    "exhaust": true,
    "effects": [
      { "op": "conditional",
        "condition": { "type": "hpBelowPercent", "who": "player", "pct": 0.3 },
        "then": [
          { "op": "block", "amount": 15 },
          { "op": "applyStatus", "status": "Intangible", "stacks": 1 }
        ],
        "else": [ { "op": "block", "amount": 5 } ]
      }
    ],
    "flavor": "One ember left. Make it count.",
    "upgrade": {
      "effects": [
        { "op": "conditional",
          "condition": { "type": "hpBelowPercent", "who": "player", "pct": 0.3 },
          "then": [
            { "op": "block", "amount": 20 },
            { "op": "applyStatus", "status": "Intangible", "stacks": 1 }
          ],
          "else": [ { "op": "block", "amount": 8 } ]
        }
      ]
    }
  },
  "cr_pyres_bargain": {
    "id": "cr_pyres_bargain",
    "name": "Pyre's Bargain",
    "type": "Skill",
    "rarity": "Rare",
    "cost": 2,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "exhaustCard", "selector": "hand-chosen(1)" },
      { "op": "gainStrength", "stacks": 2 },
      { "op": "draw", "count": 1 }
    ],
    "flavor": "Feed the fire a memory; it gives back power.",
    "upgrade": {
      "effects": [
        { "op": "exhaustCard", "selector": "hand-chosen(1)" },
        { "op": "gainStrength", "stacks": 3 },
        { "op": "draw", "count": 1 }
      ]
    }
  },
  "cr_ashsight": {
    "id": "cr_ashsight",
    "name": "Ashsight",
    "type": "Skill",
    "rarity": "Rare",
    "cost": 1,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "scry", "count": 3 },
      { "op": "gainEmber", "count": 1 }
    ],
    "flavor": "See the climb before you take the step.",
    "upgrade": {
      "effects": [
        { "op": "scry", "count": 4 },
        { "op": "gainEmber", "count": 1 }
      ]
    }
  },
  "cr_cauterize": {
    "id": "cr_cauterize",
    "name": "Cauterizing Rite",
    "type": "Skill",
    "rarity": "Rare",
    "cost": 2,
    "target": "Self",
    "exhaust": false,
    "effects": [
      { "op": "removeStatus", "status": "Weak", "stacks": 99 },
      { "op": "removeStatus", "status": "Frail", "stacks": 99 },
      { "op": "removeStatus", "status": "Vulnerable", "stacks": 99 },
      { "op": "heal", "amount": 8 }
    ],
    "flavor": "Burn away what the climb has weakened.",
    "upgrade": {
      "effects": [
        { "op": "removeStatus", "status": "Weak", "stacks": 99 },
        { "op": "removeStatus", "status": "Frail", "stacks": 99 },
        { "op": "removeStatus", "status": "Vulnerable", "stacks": 99 },
        { "op": "heal", "amount": 12 }
      ]
    }
  },
  "ccx_ashlung": {
    "id": "ccx_ashlung",
    "name": "Ashlung",
    "flavor": "Every breath tastes of the tower's dead fires.",
    "type": "Curse",
    "rarity": "Curse",
    "target": "None",
    "cost": 0,
    "exhaust": false,
    "effects": []
  },
  "ccx_sunlessweight": {
    "id": "ccx_sunlessweight",
    "name": "Sunless Weight",
    "flavor": "You climb, but the dark sky gives nothing back.",
    "type": "Curse",
    "rarity": "Curse",
    "target": "None",
    "cost": 0,
    "exhaust": false,
    "effects": []
  },
  "ccx_hollowrevenant": {
    "id": "ccx_hollowrevenant",
    "name": "Hollow Revenant",
    "flavor": "What burns away does not return.",
    "type": "Curse",
    "rarity": "Curse",
    "target": "None",
    "cost": 0,
    "exhaust": false,
    "effects": []
  },
  "ccx_cinderrot": {
    "id": "ccx_cinderrot",
    "name": "Cinder Rot",
    "flavor": "The embers in your chest have gone to soot.",
    "type": "Curse",
    "rarity": "Curse",
    "target": "None",
    "cost": 0,
    "exhaust": false,
    "effects": []
  },
  "ccx_emberdebt": {
    "id": "ccx_emberdebt",
    "name": "Ember Debt",
    "flavor": "The Cinderspire remembers every flame it lent you.",
    "type": "Curse",
    "rarity": "Curse",
    "target": "None",
    "cost": 0,
    "exhaust": false,
    "effects": []
  }
};

export const RELICS = {
  "rc_cindermark": {
    "id": "rc_cindermark",
    "name": "Cindermark",
    "rarity": "Common",
    "flavor": "The Cinderspire brands the weak before the first blow falls.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1, "target": "AllEnemies" }
      ] }
    ]
  },
  "rc_lastember": {
    "id": "rc_lastember",
    "name": "Last Ember",
    "rarity": "Common",
    "flavor": "When the coal in your chest dims, the tower lends its last warmth.",
    "triggers": [
      { "on": "onTurnStart",
        "condition": { "type": "hpBelowPercent", "who": "player", "pct": 0.5 },
        "effects": [ { "op": "block", "amount": 3, "target": "Self" } ]
      }
    ]
  },
  "rc_preparedtinder": {
    "id": "rc_preparedtinder",
    "name": "Prepared Tinder",
    "rarity": "Common",
    "flavor": "Kindling laid before the spark ever arrives.",
    "triggers": [
      { "on": "onCombatStart", "effects": [ { "op": "draw", "count": 2 } ] }
    ]
  },
  "rc_smolderstone": {
    "id": "rc_smolderstone",
    "name": "Smolder Stone",
    "rarity": "Common",
    "flavor": "A river stone, still warm, teaches the body to bend from flame.",
    "triggers": [
      { "on": "onCombatStart", "effects": [ { "op": "gainDexterity", "stacks": 1, "target": "Self" } ] }
    ]
  },
  "rc_gravecoal": {
    "id": "rc_gravecoal",
    "name": "Grave Coal",
    "rarity": "Common",
    "flavor": "Every ember spent returns a fraction to the spire's debtor.",
    "triggers": [
      { "on": "onKillEnemy", "effects": [ { "op": "heal", "amount": 2, "target": "Self" } ] }
    ]
  },
  "rc_lastrites": {
    "id": "rc_lastrites",
    "name": "Last Rites",
    "rarity": "Common",
    "flavor": "The dead tend to their own, however briefly you count among them.",
    "triggers": [
      { "on": "onCombatEnd", "effects": [ { "op": "heal", "amount": 4, "target": "Self" } ] }
    ]
  },
  "rc_widowsember": {
    "id": "rc_widowsember",
    "name": "Widow's Ember",
    "rarity": "Common",
    "flavor": "Grief burns cleanest when given a moment's rest.",
    "triggers": [
      { "on": "onRest", "effects": [ { "op": "removeStatus", "status": "Ash", "stacks": 1, "target": "Self" } ] }
    ]
  },
  "rc_pyreflask": {
    "id": "rc_pyreflask",
    "name": "Pyre Flask",
    "rarity": "Common",
    "flavor": "Merchants of the Spire trade freely with those who still smell of smoke.",
    "triggers": [
      { "on": "onShopEnter", "effects": [ { "op": "gainGold", "amount": 15 } ] }
    ]
  },
  "rc_emberscale": {
    "id": "rc_emberscale",
    "name": "Ember Scale",
    "rarity": "Common",
    "flavor": "Scale and soot; the tower's hide bites back.",
    "triggers": [
      { "on": "onDamageTaken", "effects": [ { "op": "pureDamage", "amount": 2, "target": "RandomEnemy" } ] }
    ]
  },
  "rc_vigilplate": {
    "id": "rc_vigilplate",
    "name": "Vigil Plate",
    "rarity": "Common",
    "flavor": "The first breath of caution is worth more than the last.",
    "triggers": [
      { "on": "onCardPlayed", "cardType": "Skill",
        "condition": { "type": "isFirstCardThisTurn" },
        "effects": [ { "op": "block", "amount": 3, "target": "Self" } ]
      }
    ]
  },
  "rc_charcoalcharm": {
    "id": "rc_charcoalcharm",
    "name": "Charcoal Charm",
    "rarity": "Common",
    "flavor": "A charm cooled from the spire's first floor, warding without asking.",
    "triggers": [
      { "on": "passive", "statMod": { "startingBlockBonus": 3 } }
    ]
  },
  "rc_bittercinder": {
    "id": "rc_bittercinder",
    "name": "Bitter Cinder",
    "rarity": "Common",
    "flavor": "Bitter ash thickens the revenant's borrowed flesh.",
    "triggers": [
      { "on": "passive", "statMod": { "maxHpBonus": 5 } }
    ]
  },
  "rc_ashenledger": {
    "id": "rc_ashenledger",
    "name": "Ashen Ledger",
    "rarity": "Common",
    "flavor": "Even in victory, the tower keeps its books.",
    "triggers": [
      { "on": "onCombatEnd", "effects": [ { "op": "gainGold", "amount": 5 } ] }
    ]
  },
  "rc_kindledvow": {
    "id": "rc_kindledvow",
    "name": "Kindled Vow",
    "rarity": "Common",
    "flavor": "The first strike swears an oath the enemy's strength cannot keep.",
    "triggers": [
      { "on": "onCardPlayed", "cardType": "Attack",
        "condition": { "type": "isFirstCardThisTurn" },
        "effects": [ { "op": "applyStatus", "status": "Weak", "stacks": 1, "target": "ChosenEnemy" } ]
      }
    ]
  },
  "rc_ashwrought": {
    "id": "rc_ashwrought",
    "name": "Ashwrought",
    "rarity": "Common",
    "flavor": "Each foe reduced to ash tempers the revenant's borrowed rage.",
    "triggers": [
      { "on": "onKillEnemy", "effects": [ { "op": "gainStrength", "stacks": 1, "target": "Self" } ] }
    ]
  },
  "ru_cinderlung_bellows": {
    "id": "ru_cinderlung_bellows",
    "name": "Cinderlung Bellows",
    "rarity": "Uncommon",
    "flavor": "Breathe deep the dead air; it burns kinder than the living kind.",
    "triggers": [
      { "on": "onCombatStart", "effects": [ { "op": "gainEmber", "count": 1 } ] }
    ]
  },
  "ru_pyre_seed": {
    "id": "ru_pyre_seed",
    "name": "Pyre Seed",
    "rarity": "Uncommon",
    "flavor": "Plant it in flesh and wait for the bloom.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Ash", "stacks": 2, "target": "AllEnemies" }
      ] }
    ]
  },
  "ru_smoldering_flask": {
    "id": "ru_smoldering_flask",
    "name": "Smoldering Flask",
    "rarity": "Uncommon",
    "flavor": "An empty vial still remembers the taste of fire.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 2, "target": "AllEnemies" }
      ] }
    ]
  },
  "ru_grave_bellows": {
    "id": "ru_grave_bellows",
    "name": "Grave Bellows",
    "rarity": "Uncommon",
    "flavor": "The dead exhale onto the living.",
    "triggers": [
      { "on": "onKillEnemy", "effects": [
        { "op": "applyStatus", "status": "Ash", "stacks": 3, "target": "AllEnemies" }
      ] }
    ]
  },
  "ru_charred_locket": {
    "id": "ru_charred_locket",
    "name": "Charred Locket",
    "rarity": "Uncommon",
    "flavor": "Hold it too long and it starts holding you back.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Backdraft", "stacks": 2, "target": "Self" }
      ] }
    ]
  },
  "ru_ashen_quill": {
    "id": "ru_ashen_quill",
    "name": "Ashen Quill",
    "rarity": "Uncommon",
    "flavor": "It writes the same word into every enemy: burn.",
    "triggers": [
      { "on": "onTurnStart", "effects": [
        { "op": "applyStatus", "status": "Scorch", "stacks": 1, "target": "RandomEnemy" }
      ] }
    ]
  },
  "ru_cinderforged_core": {
    "id": "ru_cinderforged_core",
    "name": "Cinderforged Core",
    "rarity": "Uncommon",
    "flavor": "Old magic and new fire, sharing the same coals.",
    "triggers": [
      { "on": "onCardPlayed", "cardType": "Power", "effects": [ { "op": "gainEmber", "count": 1 } ] }
    ]
  },
  "ru_forgotten_reliquary": {
    "id": "ru_forgotten_reliquary",
    "name": "Forgotten Reliquary",
    "rarity": "Uncommon",
    "flavor": "It hungers for what you no longer need.",
    "triggers": [
      { "on": "onCardPlayed", "cardType": "Skill", "effects": [
        { "op": "exhaustCard", "selector": "hand-random(1)" }
      ] }
    ]
  },
  "ru_toppled_idol": {
    "id": "ru_toppled_idol",
    "name": "Toppled Idol",
    "rarity": "Uncommon",
    "flavor": "It remembers falling, and teaches others to.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Stagger", "stacks": 1, "target": "RandomEnemy" }
      ] }
    ]
  },
  "ru_emberwidows_ring": {
    "id": "ru_emberwidows_ring",
    "name": "Emberwidow's Ring",
    "rarity": "Uncommon",
    "flavor": "It glows brightest right before the dark wins.",
    "triggers": [
      { "on": "onTurnEnd",
        "condition": { "type": "hpBelowPercent", "who": "player", "pct": 0.5 },
        "effects": [ { "op": "applyStatus", "status": "Embermend", "stacks": 1, "target": "Self" } ]
      }
    ]
  },
  "ru_sootcaked_coin": {
    "id": "ru_sootcaked_coin",
    "name": "Soot-Caked Coin",
    "rarity": "Uncommon",
    "flavor": "Every ledger up here has a line for the doomed.",
    "triggers": [
      { "on": "onShopEnter", "effects": [ { "op": "gainGold", "amount": 25 } ] }
    ]
  },
  "ru_hollow_kiln": {
    "id": "ru_hollow_kiln",
    "name": "Hollow Kiln",
    "rarity": "Uncommon",
    "flavor": "It remembers every shape it has ever held.",
    "triggers": [
      { "on": "passive", "statMod": { "startingBlockBonus": 6 } }
    ]
  },
  "ru_smokeskin_charm": {
    "id": "ru_smokeskin_charm",
    "name": "Smokeskin Charm",
    "rarity": "Uncommon",
    "flavor": "Fear makes decent armor, for a heartbeat.",
    "triggers": [
      { "on": "onTurnStart",
        "condition": { "type": "hpBelowPercent", "who": "player", "pct": 0.3 },
        "effects": [ { "op": "applyStatus", "status": "Intangible", "stacks": 1, "target": "Self" } ]
      }
    ]
  },
  "ru_kindling_brand": {
    "id": "ru_kindling_brand",
    "name": "Kindling Brand",
    "rarity": "Uncommon",
    "flavor": "By the third blow, the wound remembers your name.",
    "triggers": [
      { "on": "onCardPlayed", "cardType": "Attack",
        "condition": { "type": "cardsPlayedThisTurnGTE", "n": 3 },
        "effects": [ { "op": "applyStatus", "status": "Vulnerable", "stacks": 1, "target": "ChosenEnemy" } ]
      }
    ]
  },
  "ru_ration_of_ash": {
    "id": "ru_ration_of_ash",
    "name": "Ration of Ash",
    "rarity": "Uncommon",
    "flavor": "Even ruin, tended well, gives something back.",
    "triggers": [
      { "on": "onRest", "effects": [ { "op": "heal", "amount": 5, "target": "Self" } ] }
    ]
  },
  "rr_ashencrown": {
    "id": "rr_ashencrown",
    "name": "Ashen Crown",
    "rarity": "Rare",
    "flavor": "A crown of cinders for a king who forgot his name.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Ash", "stacks": 3, "target": "AllEnemies" },
        { "op": "gainStrength", "stacks": 1, "target": "Self" }
      ] }
    ]
  },
  "rr_bloodemberlocket": {
    "id": "rr_bloodemberlocket",
    "name": "Bloodember Locket",
    "rarity": "Rare",
    "flavor": "It beats faster the closer you are to dying.",
    "triggers": [
      { "on": "onTurnStart",
        "condition": { "type": "hpBelowPercent", "who": "player", "pct": 0.5 },
        "effects": [ { "op": "gainEmber", "count": 1 } ]
      }
    ]
  },
  "rr_revenantmarrow": {
    "id": "rr_revenantmarrow",
    "name": "Revenant Marrow",
    "rarity": "Rare",
    "flavor": "Every fallen foe feeds the fire in your bones.",
    "triggers": [
      { "on": "onKillEnemy", "effects": [
        { "op": "gainStrength", "stacks": 1, "target": "Self" },
        { "op": "heal", "amount": 3, "target": "Self" }
      ] }
    ]
  },
  "rr_cinderplateidol": {
    "id": "rr_cinderplateidol",
    "name": "Cinderplate Idol",
    "rarity": "Rare",
    "flavor": "It remembers being armor, once, before the ash took it.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 2, "target": "Self" }
      ] }
    ]
  },
  "rr_backdraftheart": {
    "id": "rr_backdraftheart",
    "name": "Backdraft Heart",
    "rarity": "Rare",
    "flavor": "Strike it, and the fire strikes back twice as hot.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Backdraft", "stacks": 3, "target": "Self" }
      ] }
    ]
  },
  "rr_embercistern": {
    "id": "rr_embercistern",
    "name": "Embercistern",
    "rarity": "Rare",
    "flavor": "Draughts of ember-water, drunk slow, drunk warm.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Embermend", "stacks": 3, "target": "Self" }
      ] }
    ]
  },
  "rr_cindermarktome": {
    "id": "rr_cindermarktome",
    "name": "Cindermark Tome",
    "rarity": "Rare",
    "flavor": "Bound in skin that still remembers burning.",
    "triggers": [
      { "on": "onCardPlayed", "cardType": "Power", "effects": [
        { "op": "gainEmber", "count": 1 },
        { "op": "draw", "count": 1 }
      ] }
    ]
  },
  "rr_cinderloopchain": {
    "id": "rr_cinderloopchain",
    "name": "Cinderloop Chain",
    "rarity": "Rare",
    "flavor": "The chain remembers every blow it ever dealt.",
    "triggers": [
      { "on": "onTurnEnd",
        "condition": { "type": "cardsPlayedThisTurnGTE", "n": 5 },
        "effects": [ { "op": "gainStrength", "stacks": 1, "target": "Self" } ]
      }
    ]
  },
  "rb_sunlessheart": {
    "id": "rb_sunlessheart",
    "name": "Sunless Heart",
    "rarity": "Boss",
    "flavor": "It burns your reserves to stoke a dead star's rage.",
    "pairIndex": 0,
    "triggers": [
      { "on": "passive", "statMod": { "maxHpBonus": -12 } },
      { "on": "onCombatStart", "effects": [ { "op": "gainStrength", "stacks": 3, "target": "Self" } ] }
    ]
  },
  "rb_frozenwick": {
    "id": "rb_frozenwick",
    "name": "Frozen Wick",
    "rarity": "Boss",
    "flavor": "A flame so cold it forgot how to hurt.",
    "pairIndex": 0,
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 4, "target": "Self" }
      ] },
      { "on": "onTurnStart", "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 1, "target": "Self" }
      ] }
    ]
  },
  "rb_cinderplagueidol": {
    "id": "rb_cinderplagueidol",
    "name": "Cinderplague Idol",
    "rarity": "Boss",
    "flavor": "It feeds on fire and hungers for yours too.",
    "pairIndex": 1,
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Ash", "stacks": 4, "target": "AllEnemies" }
      ] },
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 2, "target": "Self" }
      ] }
    ]
  },
  "rb_cleansingrain": {
    "id": "rb_cleansingrain",
    "name": "Cleansing Rain",
    "rarity": "Boss",
    "flavor": "Cold water on cinders; the fire remembers being small.",
    "pairIndex": 1,
    "triggers": [
      { "on": "onTurnStart", "effects": [
        { "op": "removeStatus", "status": "Vulnerable", "stacks": 99, "target": "Self" },
        { "op": "removeStatus", "status": "Weak", "stacks": 99, "target": "Self" },
        { "op": "removeStatus", "status": "Frail", "stacks": 99, "target": "Self" }
      ] },
      { "on": "passive", "statMod": { "emberPerTurnBonus": -1 } }
    ]
  },
  "rb_hollowmarrow": {
    "id": "rb_hollowmarrow",
    "name": "Hollow Marrow",
    "rarity": "Boss",
    "flavor": "Marrow feeds the fire, and the fire always asks for more.",
    "pairIndex": 2,
    "triggers": [
      { "on": "onKillEnemy", "effects": [ { "op": "gainStrength", "stacks": 2, "target": "Self" } ] },
      { "on": "onCombatStart", "effects": [
        { "op": "pureDamage", "amount": 5, "hits": 1, "target": "Self" }
      ] }
    ]
  },
  "rb_glassember": {
    "id": "rb_glassember",
    "name": "Glass Ember",
    "rarity": "Boss",
    "flavor": "Every shard of you cuts something loose.",
    "pairIndex": 2,
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "gainDexterity", "stacks": 3, "target": "Self" }
      ] },
      { "on": "onTurnStart", "effects": [
        { "op": "discard", "count": 1, "random": true }
      ] }
    ]
  },
  "re_charred_wedding_band": {
    "id": "re_charred_wedding_band",
    "name": "Charred Wedding Band",
    "rarity": "Event",
    "flavor": "Still warm, as though the vow refuses to go cold.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Embermend", "stacks": 2, "target": "Self" }
      ] }
    ]
  },
  "re_last_matchstick": {
    "id": "re_last_matchstick",
    "name": "The Last Matchstick",
    "rarity": "Event",
    "flavor": "One strike left in the box. Make it count.",
    "triggers": [
      { "on": "onTurnStart",
        "condition": { "type": "hpBelowPercent", "who": "player", "pct": 0.3 },
        "effects": [
          { "op": "gainEmber", "count": 1 },
          { "op": "gainStrength", "stacks": 1, "target": "Self" }
        ]
      }
    ]
  },
  "re_ashbound_promise": {
    "id": "re_ashbound_promise",
    "name": "Ashbound Promise",
    "rarity": "Event",
    "flavor": "Sworn on the ash of those you couldn't save.",
    "triggers": [
      { "on": "onKillEnemy",
        "condition": { "type": "enemyCountGTE", "n": 3 },
        "effects": [ { "op": "gainEmber", "count": 1 } ]
      }
    ]
  },
  "re_widows_veil": {
    "id": "re_widows_veil",
    "name": "Widow's Veil",
    "rarity": "Event",
    "flavor": "She wore it to every grave; now it wears you.",
    "triggers": [
      { "on": "onCombatStart", "effects": [
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1, "target": "Self" }
      ] },
      { "on": "onDamageTaken",
        "condition": { "type": "hpBelowPercent", "who": "player", "pct": 0.25 },
        "effects": [ { "op": "applyStatus", "status": "Intangible", "stacks": 1, "target": "Self" } ]
      }
    ]
  },
  "rs_emberscrip_ledger": {
    "id": "rs_emberscrip_ledger",
    "name": "Emberscrip Ledger",
    "rarity": "Shop",
    "flavor": "The merchant's own tally, warm with debts unpaid.",
    "triggers": [
      { "on": "onShopEnter", "effects": [ { "op": "gainGold", "amount": 20 } ] }
    ]
  },
  "rs_bartered_bones": {
    "id": "rs_bartered_bones",
    "name": "Bartered Bones",
    "rarity": "Shop",
    "flavor": "Sold twice, buried once, still counting its worth.",
    "triggers": [
      { "on": "onKillEnemy",
        "condition": { "type": "cardsPlayedThisTurnGTE", "n": 3 },
        "effects": [ { "op": "gainGold", "amount": 5 } ]
      }
    ]
  }
};

export const ENEMIES = {
  "e1_ashling": {
    "id": "e1_ashling",
    "name": "Ashling",
    "act": 1,
    "role": "normal",
    "maxHp": 10,
    "moves": [
      { "id": "e1_ashling_claw", "name": "Ash Claw", "intent": "attack", "effects": [
        { "op": "damage", "amount": 6, "hits": 1 }
      ] },
      { "id": "e1_ashling_rake", "name": "Cinder Rake", "intent": "attack", "effects": [
        { "op": "damage", "amount": 5, "hits": 2 }
      ] }
    ],
    "ai": { "type": "sequence", "order": ["e1_ashling_claw", "e1_ashling_rake"], "loop": true }
  },
  "e1_cinder_rat": {
    "id": "e1_cinder_rat",
    "name": "Cinder Rat",
    "act": 1,
    "role": "normal",
    "maxHp": 8,
    "moves": [
      { "id": "e1_cinderrat_bite", "name": "Smoldering Bite", "intent": "attack", "weight": 60, "effects": [
        { "op": "damage", "amount": 5, "hits": 1 }
      ] },
      { "id": "e1_cinderrat_smolderbite", "name": "Ashen Nip", "intent": "attack", "weight": 40, "effects": [
        { "op": "damage", "amount": 5, "hits": 1 },
        { "op": "applyStatus", "status": "Ash", "stacks": 2 }
      ] }
    ],
    "ai": { "type": "random-weighted", "pool": ["e1_cinderrat_bite", "e1_cinderrat_smolderbite"] }
  },
  "e1_slagfist_brute": {
    "id": "e1_slagfist_brute",
    "name": "Slagfist Brute",
    "act": 1,
    "role": "normal",
    "maxHp": 34,
    "moves": [
      { "id": "e1_slagbrute_smash", "name": "Slag Smash", "intent": "attack-heavy", "weight": 30, "effects": [
        { "op": "damage", "amount": 12, "hits": 1 }
      ] },
      { "id": "e1_slagbrute_slam", "name": "Double Slam", "intent": "attack", "weight": 40, "effects": [
        { "op": "damage", "amount": 6, "hits": 2 }
      ] },
      { "id": "e1_slagbrute_harden", "name": "Harden Slag", "intent": "defend", "weight": 30, "effects": [
        { "op": "block", "amount": 12, "target": "Self" }
      ] }
    ],
    "ai": { "type": "random-weighted", "pool": ["e1_slagbrute_smash", "e1_slagbrute_slam", "e1_slagbrute_harden"] }
  },
  "e1_emberwisp": {
    "id": "e1_emberwisp",
    "name": "Emberwisp",
    "act": 1,
    "role": "normal",
    "maxHp": 16,
    "moves": [
      { "id": "e1_emberwisp_flare", "name": "Ember Flare", "intent": "attack", "weight": 55, "effects": [
        { "op": "damage", "amount": 7, "hits": 1 },
        { "op": "applyStatus", "status": "Weak", "stacks": 1 }
      ] },
      { "id": "e1_emberwisp_kindle", "name": "Kindle", "intent": "buff", "effects": [
        { "op": "gainStrength", "stacks": 2, "target": "Self" }
      ] },
      { "id": "e1_emberwisp_wisplight", "name": "Wisplight", "intent": "attack", "weight": 45, "effects": [
        { "op": "damage", "amount": 5, "hits": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e1_emberwisp_kindle" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e1_emberwisp_flare", "e1_emberwisp_wisplight"] }
    }
  },
  "e1_ashen_cultist": {
    "id": "e1_ashen_cultist",
    "name": "Ashen Cultist",
    "act": 1,
    "role": "normal",
    "maxHp": 20,
    "moves": [
      { "id": "e1_cultist_immolate", "name": "Immolate", "intent": "attack", "effects": [
        { "op": "damage", "amount": 8, "hits": 1 }
      ] },
      { "id": "e1_cultist_curse", "name": "Ashen Curse", "intent": "debuff", "weight": 50, "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 2 },
        { "op": "applyStatus", "status": "Frail", "stacks": 1 }
      ] },
      { "id": "e1_cultist_ashrite", "name": "Rite of Ash", "intent": "buff", "weight": 50, "effects": [
        { "op": "gainStrength", "stacks": 2, "target": "Self" },
        { "op": "buffAllAllies", "status": "Strength", "stacks": 1 },
        { "op": "applyStatus", "status": "Ash", "stacks": 3 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "statusStacksGTE", "who": "player", "statusId": "Ash", "n": 3 }, "move": "e1_cultist_immolate" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e1_cultist_curse", "e1_cultist_ashrite"] }
    }
  },
  "e1_bonekiln_sentinel": {
    "id": "e1_bonekiln_sentinel",
    "name": "Bonekiln Sentinel",
    "act": 1,
    "role": "normal",
    "maxHp": 40,
    "moves": [
      { "id": "e1_sentinel_bash", "name": "Kiln Bash", "intent": "attack", "weight": 60, "effects": [
        { "op": "damage", "amount": 9, "hits": 1 }
      ] },
      { "id": "e1_sentinel_stoke", "name": "Stoke the Kiln", "intent": "buff", "weight": 40, "effects": [
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 3, "target": "Self" }
      ] },
      { "id": "e1_sentinel_flareguard", "name": "Flareguard", "intent": "defend", "effects": [
        { "op": "block", "amount": 10, "target": "Self" },
        { "op": "applyStatus", "status": "Backdraft", "stacks": 2, "target": "Self" }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "openingMove": "e1_sentinel_stoke",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.3 }, "move": "e1_sentinel_flareguard" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e1_sentinel_bash", "e1_sentinel_stoke"] }
    }
  },
  "e1_slag_colossus": {
    "id": "e1_slag_colossus",
    "name": "Slag Colossus",
    "act": 1,
    "role": "elite",
    "maxHp": 55,
    "moves": [
      { "id": "e1_colossus_crush", "name": "Slag Crush", "intent": "attack-heavy", "effects": [
        { "op": "damage", "amount": 16, "hits": 1 }
      ] },
      { "id": "e1_colossus_double_slam", "name": "Twin Slam", "intent": "attack", "weight": 45, "effects": [
        { "op": "damage", "amount": 7, "hits": 2 }
      ] },
      { "id": "e1_colossus_bulwark", "name": "Molten Bulwark", "intent": "defend", "weight": 30, "effects": [
        { "op": "block", "amount": 15, "target": "Self" },
        { "op": "enrageOnHit", "strengthPerHit": 1, "target": "Self" }
      ] },
      { "id": "e1_colossus_magma_surge", "name": "Magma Surge", "intent": "attack", "weight": 25, "effects": [
        { "op": "damage", "amount": 10, "hits": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 2 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "openingMove": "e1_colossus_bulwark",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e1_colossus_crush" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e1_colossus_double_slam", "e1_colossus_bulwark", "e1_colossus_magma_surge"] }
    }
  },
  "e1_pyre_warden": {
    "id": "e1_pyre_warden",
    "name": "Pyre Warden",
    "act": 1,
    "role": "elite",
    "maxHp": 62,
    "moves": [
      { "id": "e1_warden_brand", "name": "Pyre Brand", "intent": "attack", "weight": 50, "effects": [
        { "op": "damage", "amount": 11, "hits": 1 },
        { "op": "applyStatus", "status": "Scorch", "stacks": 2 }
      ] },
      { "id": "e1_warden_conflagration", "name": "Conflagration", "intent": "attack-heavy", "effects": [
        { "op": "damage", "amount": 14, "hits": 1 },
        { "op": "applyStatus", "status": "Ash", "stacks": 2 }
      ] },
      { "id": "e1_warden_flareburst", "name": "Flareburst", "intent": "attack", "weight": 30, "effects": [
        { "op": "damage", "amount": 6, "hits": 2 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "e1_warden_wrath", "name": "Warden's Wrath", "intent": "buff", "weight": 20, "effects": [
        { "op": "gainStrength", "stacks": 3, "target": "Self" }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e1_warden_conflagration" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e1_warden_brand", "e1_warden_flareburst", "e1_warden_wrath"] }
    }
  },
  "eb_cinderwarden": {
    "id": "eb_cinderwarden",
    "name": "The Cinderwarden",
    "act": 1,
    "role": "boss",
    "maxHp": 140,
    "moves": [
      { "id": "eb_cinderwarden_fist", "name": "Slag Fist", "intent": "attack", "effects": [
        { "op": "damage", "amount": 16, "hits": 1 }
      ] },
      { "id": "eb_cinderwarden_eruption", "name": "Slagfall Eruption", "intent": "attack-heavy", "effects": [
        { "op": "damage", "amount": 9, "hits": 2 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "eb_cinderwarden_crust", "name": "Harden Crust", "intent": "defend", "effects": [
        { "op": "block", "amount": 20, "target": "Self" }
      ] },
      { "id": "eb_cinderwarden_roar", "name": "Cinder Roar", "intent": "debuff", "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 2 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "eb_cinderwarden_surge", "name": "Molten Surge", "intent": "buff", "effects": [
        { "op": "gainStrength", "stacks": 2, "target": "Self" },
        { "op": "block", "amount": 10, "target": "Self" }
      ] }
    ],
    "ai": {
      "type": "sequence",
      "order": ["eb_cinderwarden_fist", "eb_cinderwarden_eruption", "eb_cinderwarden_crust", "eb_cinderwarden_roar", "eb_cinderwarden_surge"],
      "loop": true
    }
  },
  "e2_ashcask_husk": {
    "id": "e2_ashcask_husk",
    "name": "Ashcask Husk",
    "act": 2,
    "role": "normal",
    "maxHp": 14,
    "moves": [
      { "id": "e2_ashcask_husk_claw", "name": "Ashen Claw", "intent": "attack", "effects": [
        { "op": "damage", "amount": 6, "hits": 1 }
      ] },
      { "id": "e2_ashcask_husk_cough", "name": "Cinder Cough", "intent": "attack", "effects": [
        { "op": "damage", "amount": 5, "hits": 1 },
        { "op": "applyStatus", "status": "Ash", "stacks": 1 }
      ] }
    ],
    "ai": { "type": "sequence", "order": ["e2_ashcask_husk_claw", "e2_ashcask_husk_cough"], "loop": true }
  },
  "e2_slagfang_stalker": {
    "id": "e2_slagfang_stalker",
    "name": "Slagfang Stalker",
    "act": 2,
    "role": "normal",
    "maxHp": 22,
    "moves": [
      { "id": "e2_slagfang_stalker_bite", "name": "Double Bite", "intent": "attack", "weight": 40, "effects": [
        { "op": "damage", "amount": 5, "hits": 2 }
      ] },
      { "id": "e2_slagfang_stalker_lunge", "name": "Cinder Lunge", "intent": "attack", "weight": 35, "effects": [
        { "op": "damage", "amount": 9, "hits": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "e2_slagfang_stalker_skulk", "name": "Skulk", "intent": "buff", "weight": 25, "effects": [
        { "op": "block", "amount": 5, "target": "Self" },
        { "op": "gainStrength", "stacks": 1, "target": "Self" }
      ] }
    ],
    "ai": { "type": "no-repeat-random", "maxRepeat": 1, "pool": ["e2_slagfang_stalker_bite", "e2_slagfang_stalker_lunge", "e2_slagfang_stalker_skulk"] }
  },
  "e2_kilnbound_acolyte": {
    "id": "e2_kilnbound_acolyte",
    "name": "Kilnbound Acolyte",
    "act": 2,
    "role": "normal",
    "maxHp": 27,
    "moves": [
      { "id": "e2_kilnbound_acolyte_kindle", "name": "Kindle Rite", "intent": "buff", "weight": 30, "effects": [
        { "op": "gainStrength", "stacks": 2, "target": "Self" }
      ] },
      { "id": "e2_kilnbound_acolyte_sermon", "name": "Ash Sermon", "intent": "debuff", "weight": 40, "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "e2_kilnbound_acolyte_brand", "name": "Brand", "intent": "attack", "weight": 30, "effects": [
        { "op": "damage", "amount": 8, "hits": 1 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "openingMove": "e2_kilnbound_acolyte_kindle",
      "rules": [
        { "when": { "type": "statusStacksGTE", "who": "self", "statusId": "Strength", "n": 4 }, "move": "e2_kilnbound_acolyte_brand" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e2_kilnbound_acolyte_kindle", "e2_kilnbound_acolyte_sermon", "e2_kilnbound_acolyte_brand"] }
    }
  },
  "e2_wisp_of_embers": {
    "id": "e2_wisp_of_embers",
    "name": "Wisp of Embers",
    "act": 2,
    "role": "normal",
    "maxHp": 18,
    "moves": [
      { "id": "e2_wisp_of_embers_jab", "name": "Ember Jab", "intent": "attack", "weight": 60, "effects": [
        { "op": "damage", "amount": 5, "hits": 1 }
      ] },
      { "id": "e2_wisp_of_embers_flicker", "name": "Flicker", "intent": "buff", "effects": [
        { "op": "applyStatus", "status": "Intangible", "stacks": 1, "target": "Self" }
      ] },
      { "id": "e2_wisp_of_embers_flare", "name": "Flare Burst", "intent": "attack-heavy", "weight": 40, "effects": [
        { "op": "damage", "amount": 10, "hits": 1 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e2_wisp_of_embers_flicker" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e2_wisp_of_embers_jab", "e2_wisp_of_embers_flare"] }
    }
  },
  "e2_grimeplate_bulwark": {
    "id": "e2_grimeplate_bulwark",
    "name": "Grimeplate Bulwark",
    "act": 2,
    "role": "normal",
    "maxHp": 48,
    "moves": [
      { "id": "e2_grimeplate_bulwark_wall", "name": "Shieldwall", "intent": "defend", "weight": 30, "effects": [
        { "op": "block", "amount": 10, "target": "Self" }
      ] },
      { "id": "e2_grimeplate_bulwark_slam", "name": "Heavy Slam", "intent": "attack-heavy", "weight": 35, "effects": [
        { "op": "damage", "amount": 13, "hits": 1 }
      ] },
      { "id": "e2_grimeplate_bulwark_press", "name": "Grinding Press", "intent": "attack", "weight": 35, "effects": [
        { "op": "damage", "amount": 7, "hits": 2 },
        { "op": "applyStatus", "status": "Frail", "stacks": 1 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e2_grimeplate_bulwark_slam" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e2_grimeplate_bulwark_wall", "e2_grimeplate_bulwark_slam", "e2_grimeplate_bulwark_press"] }
    }
  },
  "e2_ashbound_censer": {
    "id": "e2_ashbound_censer",
    "name": "Ashbound Censer",
    "act": 2,
    "role": "normal",
    "maxHp": 20,
    "moves": [
      { "id": "e2_ashbound_censer_stoke", "name": "Stoke the Flame", "intent": "buff", "weight": 20, "effects": [
        { "op": "buffAllAllies", "status": "Strength", "stacks": 1 }
      ] },
      { "id": "e2_ashbound_censer_pall", "name": "Choking Pall", "intent": "debuff", "weight": 40, "effects": [
        { "op": "applyStatus", "status": "Ash", "stacks": 2 }
      ] },
      { "id": "e2_ashbound_censer_ward", "name": "Ember Ward", "intent": "defend", "weight": 40, "effects": [
        { "op": "block", "amount": 9, "target": "Self" }
      ] }
    ],
    "ai": { "type": "random-weighted", "openingMove": "e2_ashbound_censer_stoke", "pool": ["e2_ashbound_censer_stoke", "e2_ashbound_censer_pall", "e2_ashbound_censer_ward"] }
  },
  "e2_pyreclad_warden": {
    "id": "e2_pyreclad_warden",
    "name": "Pyreclad Warden",
    "act": 2,
    "role": "elite",
    "maxHp": 70,
    "moves": [
      { "id": "e2_pyreclad_warden_brand", "name": "Warding Brand", "intent": "attack", "weight": 35, "effects": [
        { "op": "damage", "amount": 11, "hits": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "e2_pyreclad_warden_bulwark", "name": "Cinder Bulwark", "intent": "buff", "weight": 30, "effects": [
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 3, "target": "Self" },
        { "op": "block", "amount": 8, "target": "Self" }
      ] },
      { "id": "e2_pyreclad_warden_overburn", "name": "Overburn Slam", "intent": "attack-heavy", "effects": [
        { "op": "selfDamage", "amount": 4 },
        { "op": "damage", "amount": 18, "hits": 1 }
      ] },
      { "id": "e2_pyreclad_warden_flurry", "name": "Molten Flurry", "intent": "attack", "weight": 35, "effects": [
        { "op": "damage", "amount": 6, "hits": 3 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "openingMove": "e2_pyreclad_warden_bulwark",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e2_pyreclad_warden_overburn" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e2_pyreclad_warden_brand", "e2_pyreclad_warden_flurry", "e2_pyreclad_warden_bulwark"] }
    }
  },
  "e2_charnel_matriarch": {
    "id": "e2_charnel_matriarch",
    "name": "Charnel Matriarch",
    "act": 2,
    "role": "elite",
    "maxHp": 64,
    "moves": [
      { "id": "e2_charnel_matriarch_rend", "name": "Rend", "intent": "attack", "weight": 35, "effects": [
        { "op": "damage", "amount": 12, "hits": 1 }
      ] },
      { "id": "e2_charnel_matriarch_bile", "name": "Marrowfire Bile", "intent": "attack", "weight": 30, "effects": [
        { "op": "damage", "amount": 9, "hits": 1 },
        { "op": "applyStatus", "status": "Scorch", "stacks": 3 }
      ] },
      { "id": "e2_charnel_matriarch_birth", "name": "Birth Ashwhelp", "intent": "summon", "weight": 35, "effects": [
        { "op": "summon", "enemyId": "e2_slagfang_stalker", "count": 1 },
        { "op": "splitOnDeath", "enemyId": "e2_ashcask_husk", "count": 2 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "openingMove": "e2_charnel_matriarch_birth",
      "rules": [
        { "when": { "type": "enemyCountGTE", "n": 3 }, "move": "e2_charnel_matriarch_rend" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e2_charnel_matriarch_birth", "e2_charnel_matriarch_rend", "e2_charnel_matriarch_bile"] }
    }
  },
  "eb_ashen_matriarch": {
    "id": "eb_ashen_matriarch",
    "name": "The Ashen Matriarch",
    "act": 2,
    "role": "boss",
    "maxHp": 160,
    "moves": [
      { "id": "eb_matriarch_lash", "name": "Ember Lash", "intent": "attack", "effects": [
        { "op": "damage", "amount": 14, "hits": 1 },
        { "op": "applyStatus", "status": "Weak", "stacks": 1 }
      ] },
      { "id": "eb_matriarch_wail", "name": "Widow's Wail", "intent": "debuff", "effects": [
        { "op": "applyStatus", "status": "Frail", "stacks": 2 },
        { "op": "applyStatus", "status": "Weak", "stacks": 2 }
      ] },
      { "id": "eb_matriarch_veil", "name": "Cinder Veil", "intent": "defend", "effects": [
        { "op": "block", "amount": 16, "target": "Self" },
        { "op": "applyStatus", "status": "Backdraft", "stacks": 3, "target": "Self" }
      ] },
      { "id": "eb_matriarch_mourning", "name": "Mourning Ember", "intent": "buff", "effects": [
        { "op": "applyStatus", "status": "Embermend", "stacks": 4, "target": "Self" },
        { "op": "gainStrength", "stacks": 1, "target": "Self" }
      ] },
      { "id": "eb_matriarch_unravel", "name": "Unravel", "intent": "debuff", "effects": [
        { "op": "discard", "count": 1, "random": false },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] }
    ],
    "ai": {
      "type": "no-repeat-random",
      "pool": ["eb_matriarch_lash", "eb_matriarch_wail", "eb_matriarch_veil", "eb_matriarch_mourning", "eb_matriarch_unravel"],
      "maxRepeat": 1,
      "openingMove": "eb_matriarch_lash"
    }
  },
  "e3_cinder_wisp": {
    "id": "e3_cinder_wisp",
    "name": "Cinder Wisp",
    "act": 3,
    "role": "normal",
    "maxHp": 8,
    "moves": [
      { "id": "e3_wisp_embernip", "name": "Ember Nip", "intent": "attack", "effects": [
        { "op": "damage", "amount": 5, "hits": 1 }
      ] },
      { "id": "e3_wisp_flicker", "name": "Flicker", "intent": "defend", "effects": [
        { "op": "block", "amount": 4, "target": "Self" }
      ] }
    ],
    "ai": { "type": "sequence", "order": ["e3_wisp_embernip", "e3_wisp_flicker"], "loop": true }
  },
  "e3_ashbound_wretch": {
    "id": "e3_ashbound_wretch",
    "name": "Ashbound Wretch",
    "act": 3,
    "role": "normal",
    "maxHp": 44,
    "moves": [
      { "id": "e3_wretch_claw", "name": "Ashen Claw", "intent": "attack", "effects": [
        { "op": "damage", "amount": 8, "hits": 1 }
      ] },
      { "id": "e3_wretch_ashgrasp", "name": "Grave-Ash Grasp", "intent": "attack", "weight": 2, "effects": [
        { "op": "damage", "amount": 7, "hits": 1 },
        { "op": "applyStatus", "status": "Ash", "stacks": 2 }
      ] },
      { "id": "e3_wretch_smolder", "name": "Choking Cinders", "intent": "debuff", "weight": 1, "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 1 },
        { "op": "applyStatus", "status": "Frail", "stacks": 2 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "statusStacksGTE", "who": "player", "statusId": "Ash", "n": 3 }, "move": "e3_wretch_claw" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e3_wretch_ashgrasp", "e3_wretch_smolder"] }
    }
  },
  "e3_cinderhound": {
    "id": "e3_cinderhound",
    "name": "Cinderhound",
    "act": 3,
    "role": "normal",
    "maxHp": 32,
    "moves": [
      { "id": "e3_hound_frenzy", "name": "Ember-Core Flare", "intent": "buff", "effects": [
        { "op": "gainStrength", "stacks": 2, "target": "Self" }
      ] },
      { "id": "e3_hound_bite", "name": "Twinfang Bite", "intent": "attack-heavy", "weight": 1, "effects": [
        { "op": "damage", "amount": 6, "hits": 2 }
      ] },
      { "id": "e3_hound_snarl", "name": "Marking Snarl", "intent": "attack", "weight": 1, "effects": [
        { "op": "damage", "amount": 7, "hits": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "openingMove": "e3_hound_frenzy",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e3_hound_bite" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e3_hound_bite", "e3_hound_snarl"] }
    }
  },
  "e3_slag_sentinel": {
    "id": "e3_slag_sentinel",
    "name": "Slag Sentinel",
    "act": 3,
    "role": "normal",
    "maxHp": 52,
    "moves": [
      { "id": "e3_sentinel_slam", "name": "Slag Slam", "intent": "attack", "effects": [
        { "op": "damage", "amount": 10, "hits": 1 }
      ] },
      { "id": "e3_sentinel_plate", "name": "Seal the Cracks", "intent": "buff", "weight": 2, "effects": [
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 2, "target": "Self" }
      ] },
      { "id": "e3_sentinel_brace", "name": "Brace", "intent": "defend", "weight": 1, "effects": [
        { "op": "block", "amount": 9, "target": "Self" }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "statusStacksGTE", "who": "self", "statusId": "Cinderplate", "n": 4 }, "move": "e3_sentinel_slam" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e3_sentinel_plate", "e3_sentinel_brace"] }
    }
  },
  "e3_choir_of_ash": {
    "id": "e3_choir_of_ash",
    "name": "Choir of Ash",
    "act": 3,
    "role": "normal",
    "maxHp": 36,
    "moves": [
      { "id": "e3_choir_dirge", "name": "Ash Dirge", "intent": "debuff", "weight": 2, "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "e3_choir_kindle", "name": "Kindle the Choir", "intent": "summon", "weight": 1, "effects": [
        { "op": "summon", "enemyId": "e3_cinder_wisp", "count": 1 }
      ] },
      { "id": "e3_choir_lash", "name": "Cinder-String Lash", "intent": "attack", "effects": [
        { "op": "damage", "amount": 7, "hits": 1 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "enemyCountGTE", "n": 3 }, "move": "e3_choir_lash" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e3_choir_kindle", "e3_choir_dirge"] }
    }
  },
  "e3_pyreclad_revenant": {
    "id": "e3_pyreclad_revenant",
    "name": "Pyreclad Revenant",
    "act": 3,
    "role": "elite",
    "maxHp": 80,
    "moves": [
      { "id": "e3_pyreclad_temper", "name": "Temper", "intent": "buff", "effects": [
        { "op": "gainStrength", "stacks": 2, "target": "Self" }
      ] },
      { "id": "e3_pyreclad_cleave", "name": "Twinfall Cleave", "intent": "attack-heavy", "effects": [
        { "op": "damage", "amount": 8, "hits": 2 }
      ] },
      { "id": "e3_pyreclad_brand", "name": "Branding Iron", "intent": "attack", "effects": [
        { "op": "damage", "amount": 11, "hits": 1 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "e3_pyreclad_ruin", "name": "Ruin", "intent": "attack-heavy", "effects": [
        { "op": "damage", "amount": 10, "hits": 2 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "openingMove": "e3_pyreclad_temper",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e3_pyreclad_ruin" }
      ],
      "fallback": { "type": "no-repeat-random", "pool": ["e3_pyreclad_cleave", "e3_pyreclad_brand", "e3_pyreclad_temper"], "maxRepeat": 1 }
    }
  },
  "e3_hollow_bellkeeper": {
    "id": "e3_hollow_bellkeeper",
    "name": "Hollow Bellkeeper",
    "act": 3,
    "role": "elite",
    "maxHp": 74,
    "moves": [
      { "id": "e3_bell_toll", "name": "Toll of Ash", "intent": "debuff", "weight": 1, "effects": [
        { "op": "applyStatus", "status": "Scorch", "stacks": 3 }
      ] },
      { "id": "e3_bell_peal", "name": "Peal of Ash", "intent": "attack-heavy", "weight": 1, "effects": [
        { "op": "damage", "amount": 7, "hits": 3 }
      ] },
      { "id": "e3_bell_knell", "name": "Weakening Knell", "intent": "attack", "weight": 1, "effects": [
        { "op": "damage", "amount": 11, "hits": 1 },
        { "op": "applyStatus", "status": "Weak", "stacks": 1 }
      ] },
      { "id": "e3_bell_requiem", "name": "Requiem", "intent": "summon", "effects": [
        { "op": "summon", "enemyId": "e3_cinder_wisp", "count": 2 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "openingMove": "e3_bell_toll",
      "rules": [
        { "when": { "type": "enemyCountGTE", "n": 4 }, "move": "e3_bell_peal" },
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "e3_bell_requiem" }
      ],
      "fallback": { "type": "random-weighted", "pool": ["e3_bell_toll", "e3_bell_peal", "e3_bell_knell"] }
    }
  },
  "eb_pyreclad_judge": {
    "id": "eb_pyreclad_judge",
    "name": "The Pyreclad Judge",
    "act": 3,
    "role": "boss",
    "maxHp": 175,
    "moves": [
      { "id": "eb_judge_oath", "name": "Judge's Oath", "intent": "buff", "effects": [
        { "op": "enrageOnHit", "strengthPerHit": 1, "target": "Self" },
        { "op": "block", "amount": 12, "target": "Self" }
      ] },
      { "id": "eb_judge_gavel", "name": "Gavel Fall", "intent": "attack", "weight": 3, "effects": [
        { "op": "damage", "amount": 22, "hits": 1 }
      ] },
      { "id": "eb_judge_verdict", "name": "Twin Verdict", "intent": "attack-heavy", "weight": 3, "effects": [
        { "op": "damage", "amount": 12, "hits": 2 }
      ] },
      { "id": "eb_judge_brand", "name": "Brand of Guilt", "intent": "debuff", "weight": 2, "effects": [
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 2 },
        { "op": "applyStatus", "status": "Weak", "stacks": 1 }
      ] },
      { "id": "eb_judge_bulwark", "name": "Bulwark of Coals", "intent": "defend", "weight": 2, "effects": [
        { "op": "block", "amount": 16, "target": "Self" },
        { "op": "applyStatus", "status": "Cinderplate", "stacks": 3, "target": "Self" }
      ] }
    ],
    "ai": {
      "type": "random-weighted",
      "openingMove": "eb_judge_oath",
      "pool": ["eb_judge_gavel", "eb_judge_verdict", "eb_judge_brand", "eb_judge_bulwark"]
    }
  },
  "eb_sunless_king": {
    "id": "eb_sunless_king",
    "name": "The Sunless King",
    "act": 4,
    "role": "boss",
    "maxHp": 300,
    "moves": [
      { "id": "eb_sunless_king_scepter", "name": "Scepter Strike", "intent": "attack", "effects": [
        { "op": "damage", "amount": 18, "hits": 1 }
      ] },
      { "id": "eb_sunless_king_decree", "name": "Cold Decree", "intent": "debuff", "effects": [
        { "op": "applyStatus", "status": "Weak", "stacks": 2 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "eb_sunless_king_mantle", "name": "Ashen Mantle", "intent": "defend", "effects": [
        { "op": "block", "amount": 20, "target": "Self" },
        { "op": "gainDexterity", "stacks": 1, "target": "Self" }
      ] },
      { "id": "eb_sunless_king_lastlight", "name": "Last Light", "intent": "attack-heavy", "effects": [
        { "op": "damage", "amount": 14, "hits": 2 },
        { "op": "applyStatus", "status": "Vulnerable", "stacks": 1 }
      ] },
      { "id": "eb_sunless_king_selfimmolate", "name": "Self-Immolation", "intent": "buff", "effects": [
        { "op": "selfDamage", "amount": 15 },
        { "op": "gainStrength", "stacks": 4, "target": "Self" },
        { "op": "applyStatus", "status": "Backdraft", "stacks": 4, "target": "Self" }
      ] },
      { "id": "eb_sunless_king_crownfall", "name": "Crownfall", "intent": "attack-heavy", "effects": [
        { "op": "damage", "amount": 30, "hits": 1 }
      ] }
    ],
    "ai": {
      "type": "conditional",
      "rules": [
        { "when": { "type": "hpBelowPercent", "who": "self", "pct": 0.5 }, "move": "eb_sunless_king_crownfall" }
      ],
      "fallback": {
        "type": "no-repeat-random",
        "pool": ["eb_sunless_king_scepter", "eb_sunless_king_decree", "eb_sunless_king_mantle", "eb_sunless_king_lastlight", "eb_sunless_king_selfimmolate"],
        "maxRepeat": 1,
        "openingMove": "eb_sunless_king_decree"
      }
    }
  }
};

export const EVENTS = {
  "ev1_ashbound_shrine": {
    "id": "ev1_ashbound_shrine",
    "name": "The Ashbound Shrine",
    "description": "A shrine fused from ash and bone hums with the tower's dying heat, hungry for what still bleeds.",
    "choices": [
      { "label": "Feed it your blood", "effects": [
        { "op": "selfDamage", "amount": 10 },
        { "op": "addCardToDeck", "cardId": "cc2_embercore", "count": 1, "location": "draw" }
      ] },
      { "label": "Leave a handful of gold instead", "effects": [
        { "op": "loseGold", "amount": 50 },
        { "op": "addCardToDeck", "cardId": "cc2_embercore", "count": 1, "location": "draw" }
      ] },
      { "label": "Walk away from the heat", "effects": [] }
    ]
  },
  "ev1_matchseller_revenant": {
    "id": "ev1_matchseller_revenant",
    "name": "The Matchseller's Ghost",
    "description": "A revenant hawks bundles of ember-matches that never quite go out, her voice a papery rasp.",
    "choices": [
      { "label": "Buy a bundle for gold", "effects": [
        { "op": "loseGold", "amount": 30 },
        { "op": "addCardToDeck", "cardId": "cu1_risingheat", "count": 1, "location": "discard" }
      ] },
      { "label": "Trade a memory instead of coin", "effects": [
        { "op": "selfDamage", "amount": 5 },
        { "op": "addCardToDeck", "cardId": "cu1_risingheat", "count": 1, "location": "discard" }
      ] },
      { "label": "Refuse and keep walking", "effects": [] }
    ]
  },
  "ev1_cinderfall_bridge": {
    "id": "ev1_cinderfall_bridge",
    "name": "The Cinderfall Bridge",
    "description": "A bridge of hardened ash spans a shaft of rising embers; it groans with every step you take.",
    "choices": [
      { "label": "Sprint across through the updraft", "effects": [
        { "op": "selfDamage", "amount": 6 },
        { "op": "gainGold", "amount": 20 }
      ] },
      { "label": "Pay the toll-wraith to cross safely", "effects": [
        { "op": "loseGold", "amount": 40 }
      ] },
      { "label": "Test each plank and cross slowly", "effects": [] }
    ]
  },
  "ev1_sleeping_cinderwyrm": {
    "id": "ev1_sleeping_cinderwyrm",
    "name": "The Sleeping Cinderwyrm",
    "description": "Coiled around a shattered pillar, a wyrm of cooling clinker breathes slow, orange light between its ribs.",
    "choices": [
      { "label": "Sneak past its coils", "effects": [
        { "op": "selfDamage", "amount": 4 }
      ] },
      { "label": "Strike while it sleeps", "effects": [] },
      { "label": "Leave an offering of gold to appease it", "effects": [
        { "op": "loseGold", "amount": 35 }
      ] }
    ]
  },
  "ev1_hollow_confessional": {
    "id": "ev1_hollow_confessional",
    "name": "The Hollow Confessional",
    "description": "A blackened confessional booth stands alone in the stairwell, ash sifting from its lattice like slow snow.",
    "choices": [
      { "label": "Confess your death through the lattice", "effects": [
        { "op": "heal", "amount": 15 },
        { "op": "addCardToDeck", "cardId": "ccx_ashlung", "count": 1, "location": "draw" }
      ] },
      { "label": "Refuse to speak", "effects": [] },
      { "label": "Mock the dead within and loot the booth", "effects": [
        { "op": "selfDamage", "amount": 8 },
        { "op": "gainGold", "amount": 45 }
      ] }
    ]
  },
  "ev1_ashfall_orphan": {
    "id": "ev1_ashfall_orphan",
    "name": "The Ashfall Orphan",
    "description": "A small ash-touched creature, no bigger than a child, whimpers among the cinders, reaching for warmth.",
    "choices": [
      { "label": "Give it warmth from your own ember", "effects": [
        { "op": "selfDamage", "amount": 8 },
        { "op": "addCardToDeck", "cardId": "cc1_cauterize", "count": 1, "location": "draw" }
      ] },
      { "label": "Drive it off and take what it dropped", "effects": [
        { "op": "gainGold", "amount": 20 }
      ] },
      { "label": "It lashes out, starving — fight it", "effects": [] },
      { "label": "Ignore it and pass by", "effects": [] }
    ]
  },
  "ev1_immolation_altar": {
    "id": "ev1_immolation_altar",
    "name": "The Immolation Altar",
    "description": "An altar shaped like open hands cradles a fire that asks nothing but everything.",
    "choices": [
      { "label": "Lay your hand in the flame", "effects": [
        { "op": "selfDamage", "amount": 12 },
        { "op": "addCardToDeck", "cardId": "cu1_bloodember", "count": 1, "location": "draw" }
      ] },
      { "label": "Pour gold into the flame instead", "effects": [
        { "op": "loseGold", "amount": 60 },
        { "op": "addCardToDeck", "cardId": "cu1_bloodember", "count": 1, "location": "draw" }
      ] },
      { "label": "Drag a fallen climber's remains to the flame instead", "effects": [
        { "op": "gainGold", "amount": 15 },
        { "op": "heal", "amount": 6 }
      ] },
      { "label": "Step back from the altar", "effects": [] }
    ]
  },
  "ev1_dissonant_choir": {
    "id": "ev1_dissonant_choir",
    "name": "The Dissonant Choir",
    "description": "Voices without mouths harmonize in the stairwell above, a hymn for a sun that will not rise again.",
    "choices": [
      { "label": "Sing with them", "effects": [
        { "op": "heal", "amount": 20 },
        { "op": "addCardToDeck", "cardId": "ccx_hollowrevenant", "count": 1, "location": "draw" }
      ] },
      { "label": "Silence them", "effects": [] },
      { "label": "Cover your ears and pass", "effects": [] }
    ]
  },
  "ev1_ember_vendor": {
    "id": "ev1_ember_vendor",
    "name": "The Last Ember Vendor",
    "description": "A hunched revenant tends a cart of guttering embers sealed in jars, each one a stolen moment of heat.",
    "choices": [
      { "label": "Buy a jar of stolen heat", "effects": [
        { "op": "loseGold", "amount": 45 },
        { "op": "heal", "amount": 25 }
      ] },
      { "label": "Trade a memory of your own flesh for gold", "effects": [
        { "op": "selfDamage", "amount": 10 },
        { "op": "gainGold", "amount": 50 }
      ] },
      { "label": "Steal a jar and run", "effects": [
        { "op": "selfDamage", "amount": 6 },
        { "op": "gainGold", "amount": 30 }
      ] },
      { "label": "Leave empty-handed", "effects": [] }
    ]
  },
  "ev2_ember_auctioneer": {
    "id": "ev2_ember_auctioneer",
    "name": "The Auctioneer of Dying Light",
    "description": "A hollow-eyed merchant hawks warmth peeled from dying men, his stall lit by candles that hoard the last of someone else's light.",
    "choices": [
      { "label": "Buy a stranger's last warmth", "effects": [
        { "op": "loseGold", "amount": 20 },
        { "op": "heal", "amount": 14 }
      ] },
      { "label": "Buy a soldier's final resolve", "effects": [
        { "op": "loseGold", "amount": 35 },
        { "op": "addCardToDeck", "cardId": "cc1_smolderingresolve", "count": 1, "location": "hand" }
      ] },
      { "label": "Snatch a candle and flee into the dark", "effects": [
        { "op": "gainGold", "amount": 25 },
        { "op": "selfDamage", "amount": 6 }
      ] },
      { "label": "Leave the dead to their peace", "effects": [] }
    ]
  },
  "ev2_revenants_confession": {
    "id": "ev2_revenants_confession",
    "name": "A Revenant's Confession",
    "description": "A climber more ash than man blocks the stair, unwilling to crumble before someone hears him out.",
    "choices": [
      { "label": "Hear him out and grant forgiveness", "effects": [
        { "op": "heal", "amount": 10 }
      ] },
      { "label": "Refuse forgiveness, take what he carried as he crumbles", "effects": [
        { "op": "gainGold", "amount": 40 },
        { "op": "selfDamage", "amount": 5 }
      ] },
      { "label": "End his suffering with your own hand", "effects": [
        { "op": "gainGold", "amount": 60 },
        { "op": "selfDamage", "amount": 8 },
        { "op": "addCardToDeck", "cardId": "ccx_cinderrot", "count": 1, "location": "draw" }
      ] },
      { "label": "Share your own regret before he goes", "effects": [
        { "op": "selfDamage", "amount": 4 },
        { "op": "heal", "amount": 8 }
      ] }
    ]
  },
  "ev2_ashbound_choir": {
    "id": "ev2_ashbound_choir",
    "name": "The Blacksun Vigil",
    "description": "Robed figures kneel before a black sun carved into the stone, murmuring a psalm no living throat should hold.",
    "choices": [
      { "label": "Undergo the branding rite", "effects": [
        { "op": "selfDamage", "amount": 10 },
        { "op": "addCardToDeck", "cardId": "ccx_sunlessweight", "count": 1, "location": "draw" }
      ] },
      { "label": "Donate to their eternal vigil", "effects": [
        { "op": "loseGold", "amount": 30 },
        { "op": "heal", "amount": 12 }
      ] },
      { "label": "Denounce their heresy and scatter their offerings", "effects": [
        { "op": "gainGold", "amount": 35 },
        { "op": "selfDamage", "amount": 6 }
      ] },
      { "label": "Listen politely and keep climbing", "effects": [] }
    ]
  },
  "ev2_cinder_orphan": {
    "id": "ev2_cinder_orphan",
    "name": "The Guttering Child",
    "description": "A second knot of living embers, small and child-shaped, gutters weakly on the landing — the tower rarely spares warmth for something so small.",
    "choices": [
      { "label": "Feed her your own ember-warmth", "effects": [
        { "op": "selfDamage", "amount": 8 },
        { "op": "addCardToDeck", "cardId": "cc1_recklessember", "count": 1, "location": "hand" }
      ] },
      { "label": "Give her your coin instead", "effects": [
        { "op": "loseGold", "amount": 20 },
        { "op": "heal", "amount": 6 }
      ] },
      { "label": "Leave her — the tower has no room for mercy", "effects": [
        { "op": "addCardToDeck", "cardId": "ccx_emberdebt", "count": 1, "location": "draw" }
      ] },
      { "label": "End her flickering quickly", "effects": [
        { "op": "gainGold", "amount": 45 },
        { "op": "selfDamage", "amount": 5 },
        { "op": "addCardToDeck", "cardId": "ccx_ashlung", "count": 1, "location": "draw" }
      ] }
    ]
  },
  "ev2_sunless_shrine": {
    "id": "ev2_sunless_shrine",
    "name": "Shrine of the Sunless Vow",
    "description": "An altar older than the dark sun still radiates heat, its basin worn smooth by a thousand bled promises.",
    "choices": [
      { "label": "Swear the vow in blood", "effects": [
        { "op": "selfDamage", "amount": 12 },
        { "op": "addCardToDeck", "cardId": "cu1_furnaceflesh", "count": 1, "location": "draw" }
      ] },
      { "label": "Offer gold instead of blood", "effects": [
        { "op": "loseGold", "amount": 40 },
        { "op": "addCardToDeck", "cardId": "ccx_hollowrevenant", "count": 1, "location": "hand" }
      ] },
      { "label": "Pry the gold fittings loose", "effects": [
        { "op": "gainGold", "amount": 50 },
        { "op": "addCardToDeck", "cardId": "ccx_cinderrot", "count": 1, "location": "draw" }
      ] },
      { "label": "Leave the shrine undisturbed", "effects": [] }
    ]
  },
  "ev2_weeping_forge": {
    "id": "ev2_weeping_forge",
    "name": "The Weeping Forge",
    "description": "A forge that has never once gone cold, tended by a smith whose hands are living slag.",
    "choices": [
      { "label": "Let the forge drink your blood", "effects": [
        { "op": "selfDamage", "amount": 10 },
        { "op": "addCardToDeck", "cardId": "cc1_immolatingblow", "count": 1, "location": "hand" }
      ] },
      { "label": "Pay the smith in gold", "effects": [
        { "op": "loseGold", "amount": 45 },
        { "op": "addCardToDeck", "cardId": "cu1_ashenmight", "count": 1, "location": "hand" }
      ] },
      { "label": "Try to steal a blade while he's distracted", "effects": [
        { "op": "gainGold", "amount": 15 },
        { "op": "selfDamage", "amount": 6 },
        { "op": "addCardToDeck", "cardId": "cc1_twincinders", "count": 1, "location": "discard" }
      ] },
      { "label": "Walk on — some fires aren't worth feeding", "effects": [] }
    ]
  },
  "ev2_hollow_immortals": {
    "id": "ev2_hollow_immortals",
    "name": "The Hollow Immortals",
    "description": "Pale figures drift at the edge of the torchlight — they refused to burn, and their stillness invites you to refuse too.",
    "choices": [
      { "label": "Accept their gift of stillness", "effects": [
        { "op": "heal", "amount": 20 },
        { "op": "addCardToDeck", "cardId": "cc1_cinderguard", "count": 1, "location": "draw" }
      ] },
      { "label": "Demand payment for your pity", "effects": [
        { "op": "gainGold", "amount": 30 },
        { "op": "selfDamage", "amount": 5 }
      ] },
      { "label": "Refuse and press past them quickly", "effects": [] },
      { "label": "Mock their hollowness to their faces", "effects": [
        { "op": "selfDamage", "amount": 8 },
        { "op": "gainGold", "amount": 20 }
      ] }
    ]
  },
  "ev2_gamblers_pyre": {
    "id": "ev2_gamblers_pyre",
    "name": "The Gambler's Pyre",
    "description": "A gaunt gambler has built a pyre from bone-white chips and dares travelers to bet what little they have left.",
    "choices": [
      { "label": "Wager gold at the high table", "effects": [
        { "op": "loseGold", "amount": 30 },
        { "op": "gainGold", "amount": 70 }
      ] },
      { "label": "Wager your own blood for higher stakes", "effects": [
        { "op": "selfDamage", "amount": 12 },
        { "op": "gainGold", "amount": 90 }
      ] },
      { "label": "Play it safe with a small bet", "effects": [
        { "op": "loseGold", "amount": 10 },
        { "op": "gainGold", "amount": 25 }
      ] },
      { "label": "Refuse to gamble", "effects": [] }
    ]
  },
  "ev2_mirror_of_ash": {
    "id": "ev2_mirror_of_ash",
    "name": "The Mirror of Ash",
    "description": "A mirror stands untouched by soot, still showing the tower bathed in a sun that no longer exists — and someone standing in it who is not quite you.",
    "choices": [
      { "label": "Embrace your reflection", "effects": [
        { "op": "heal", "amount": 15 },
        { "op": "addCardToDeck", "cardId": "cu2_embersight", "count": 1, "location": "hand" }
      ] },
      { "label": "Shatter the mirror", "effects": [
        { "op": "gainGold", "amount": 25 },
        { "op": "selfDamage", "amount": 6 }
      ] },
      { "label": "Mourn quietly and move on", "effects": [
        { "op": "heal", "amount": 8 }
      ] },
      { "label": "Try to climb into the mirror", "effects": [
        { "op": "selfDamage", "amount": 15 },
        { "op": "addCardToDeck", "cardId": "ccx_sunlessweight", "count": 1, "location": "draw" }
      ] }
    ]
  }
};

export const POTIONS = {
  "p_cinderburst": {
    "id": "p_cinderburst",
    "name": "Cinderburst Potion",
    "target": "AllEnemies",
    "effects": [ { "op": "damage", "amount": 6, "hits": 1 } ],
    "flavor": "Uncorked, it exhales like the tower itself sighing fire."
  },
  "p_bulwark_draught": {
    "id": "p_bulwark_draught",
    "name": "Bulwark Draught",
    "target": "Self",
    "effects": [ { "op": "block", "amount": 6 } ],
    "flavor": "Ash hardens to plate beneath the skin, just long enough."
  },
  "p_bloodember": {
    "id": "p_bloodember",
    "name": "Bloodember Tonic",
    "target": "Self",
    "effects": [ { "op": "heal", "amount": 8 } ],
    "flavor": "Warmth returns where warmth had no right to remain."
  },
  "p_witherash": {
    "id": "p_witherash",
    "name": "Witherash Vial",
    "target": "Enemy",
    "effects": [ { "op": "applyStatus", "status": "Vulnerable", "stacks": 2 } ],
    "flavor": "The flesh remembers how eagerly it once burned."
  },
  "p_weakening_smoke": {
    "id": "p_weakening_smoke",
    "name": "Weakening Smoke",
    "target": "Enemy",
    "effects": [ { "op": "applyStatus", "status": "Weak", "stacks": 2 } ],
    "flavor": "Breathe it in and your arms forget their purpose."
  },
  "p_ironash_elixir": {
    "id": "p_ironash_elixir",
    "name": "Ironash Elixir",
    "target": "Self",
    "effects": [ { "op": "gainStrength", "stacks": 2 } ],
    "flavor": "Old fury, bottled and still smoldering."
  },
  "p_swift_cinder": {
    "id": "p_swift_cinder",
    "name": "Swift Cinder Tonic",
    "target": "Self",
    "effects": [ { "op": "gainDexterity", "stacks": 2 } ],
    "flavor": "Move like sparks scattering from a struck log."
  },
  "p_scorchoil": {
    "id": "p_scorchoil",
    "name": "Scorchoil Flask",
    "target": "Enemy",
    "effects": [ { "op": "applyStatus", "status": "Scorch", "stacks": 3 } ],
    "flavor": "It seeps into the wound and keeps on burning."
  },
  "p_quickthought_vapor": {
    "id": "p_quickthought_vapor",
    "name": "Quickthought Vapor",
    "target": "Self",
    "effects": [ { "op": "draw", "count": 2 } ],
    "flavor": "Clarity arrives like a held breath finally released."
  },
  "p_embercharge": {
    "id": "p_embercharge",
    "name": "Embercharge Potion",
    "target": "Self",
    "effects": [ { "op": "gainEmber", "count": 1 } ],
    "flavor": "Borrowed heat, spent all at once."
  },
  "p_stagger_gas": {
    "id": "p_stagger_gas",
    "name": "Stagger Gas",
    "target": "Enemy",
    "effects": [ { "op": "applyStatus", "status": "Stagger", "stacks": 1 } ],
    "flavor": "Its lungs forget the next step ever existed."
  },
  "p_ashclad_shell": {
    "id": "p_ashclad_shell",
    "name": "Ashclad Shell",
    "target": "Self",
    "effects": [ { "op": "applyStatus", "status": "Cinderplate", "stacks": 2 } ],
    "flavor": "Wear the wreckage; let it answer for you."
  },
  "p_infernal_flask": {
    "id": "p_infernal_flask",
    "name": "Infernal Flask",
    "target": "Enemy",
    "effects": [ { "op": "damage", "amount": 15, "hits": 1 } ],
    "flavor": "The Cinderspire's own heart, decanted and furious."
  },
  "p_smoldering_cache": {
    "id": "p_smoldering_cache",
    "name": "Smoldering Cache",
    "target": "Enemy",
    "effects": [ { "op": "applyStatus", "status": "Ash", "stacks": 6 } ],
    "flavor": "Five embers wait. The sixth is always the last."
  }
};

export const STARTING_UNLOCKED_CARD_IDS = [
  "cc1_ashjab",
  "cc1_ashscatter",
  "cc1_cauterize",
  "cc1_cinderguard",
  "cc1_cinderplatewall",
  "cc1_cinderstrike",
  "cc1_cinderwave",
  "cc1_immolatingblow",
  "cc1_infernalbarrage",
  "cc1_kindlewound",
  "cc1_pyresmash"
];

export const STARTING_UNLOCKED_RELIC_IDS = [
  "rc_ashenledger",
  "rc_ashwrought",
  "rc_bittercinder",
  "rc_charcoalcharm",
  "rc_cindermark",
  "rc_emberscale"
];
