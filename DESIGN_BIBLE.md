# ASHWALKER — Design Bible (authoritative systems spec)

Single source of truth for every number, rule, and vocabulary term in the game. Content authors and engine
code both derive from this file. If a card/relic/enemy idea needs an effect not in the vocabulary below,
it must be expressed using only the primitives here — do not invent new primitives in content data.

## 1. Premise (flavor, kept light — visuals/story are not the point of this project)
The sun has gone out. The last heat in the world lives inside the **Cinderspire**, a tower that burns
forever. You are the **Ashwalker**, a revenant bound to climb it. Each climb (run) ends in death or in
reaching the top to face **The Last Flame**. Dying is expected and permanent for that run (roguelike);
what you learn/unlock persists (meta-progression).

## 2. Core loop
Main Menu → (Archive: spend Sparks on permanent unlocks | Trials: pick difficulty modifiers) → Start Run
→ Map (traverse nodes, one path at a time) → resolve node (Combat / Elite / Event / Rest / Shop / Treasure)
→ Act Boss → next Act (3 acts total + a 4th "Summit" final-boss act) → Victory or Defeat → Run Summary
(Sparks awarded) → Main Menu.

**Autosave discipline (mobile-specific requirement):** the run state is written to localStorage after
every node resolution and after every combat turn boundary (not mid-turn). Backgrounding or force-closing
Safari must never lose more than the current in-progress turn. On load, if a run exists, resume directly
into it — never show a stale map.

## 3. Resources
| Resource | Notes |
|---|---|
| HP / Max HP | Start 72/72. Reaches 0 → death → run ends. Max HP can increase (rest upgrades, relics), never auto-heals except at Rest/relics/potions. |
| Ember | Turn energy. Base 3/turn, refills to max at the start of every player turn, does **not** carry over (lost at end of turn) unless a card/relic explicitly banks it. Cards cost 0–3, or `X` (spend all remaining Ember this turn, effect scales with amount spent). |
| Gold | Shop currency. Found in combat rewards, treasure, events. |
| Sparks | Meta-currency. Awarded once at run end (see §12). Spent in the Archive between runs. |

## 4. Card anatomy
```
{
  id, name, type: Attack|Skill|Power|Status|Curse,
  rarity: Starter|Common|Uncommon|Rare,
  cost: 0|1|2|3|"X",
  target: Enemy|AllEnemies|Self|None,
  exhaust: bool,        // removed from deck for the rest of combat after being played/discarded from hand this way
  innate: bool,          // always present in the opening hand of combat if it's in the deck
  retain: bool,          // does not discard at end of turn if left unplayed in hand
  effects: [ EffectPrimitive... ],   // resolved in array order
  upgrade: { cost?, effects? },       // "+" version; omit a field to inherit the base value
  flavor: "one short line"
}
```
Hand cap is 10; a card drawn while hand is full is discarded immediately (goes to discard pile, still
counts as "drawn" for any draw-triggered effects). Deck has no maximum size.

## 5. Effect primitive vocabulary (closed set — the interpreter only implements these)
All primitives are plain objects `{ op, ...params }`, executed by a single interpreter shared by cards,
relics, potions, and enemy moves.

- `damage(amount, hits=1)` — Attack-type damage. Pipeline: `amount + Strength(source)` → if source has
  Weak, `× 0.75` (floor) → if target has Vulnerable, `× 1.5` (floor) → subtract target's current Block
  (Block absorbs 1:1, overflow hits HP, Block cannot go below 0) → remaining hits HP → fires
  `onDamageTaken`/`onDamageDealt` triggers → check death. Repeats `hits` times as independent instances
  (each hit recalculates against the target's Block as it depletes — matches genre-standard multi-hit
  behavior).
- `pureDamage(amount, hits=1)` — same as `damage` but ignores Strength/Weak/Vulnerable and Block entirely
  (direct HP loss). Used for HP-cost effects and a few relic/curse interactions, never for enemy AI.
- `block(amount)` — Block gained = `amount + Dexterity(holder)`, then `× 0.75` (floor) if holder has
  Frail. Adds to current Block (does not overwrite). Block resets to 0 at the **start** of the holder's
  own next turn (i.e. it persists through the opponent's intervening turn).
- `heal(amount, target)`
- `draw(count)`
- `gainEmber(count)` — this turn only, does not raise the per-turn base.
- `applyStatus(statusId, stacks, target)` / `removeStatus(statusId, stacks, target)`
- `gainStrength(stacks, target=Self)` / `gainDexterity(stacks, target=Self)` — sugar for applyStatus.
- `discard(count, random=false)` — random=true discards random cards from hand; false lets the player
  choose (only ever used with count=1 or as a full-hand discard in that case).
- `exhaustCard(selector)` — selector ∈ `hand-random(n)` | `hand-chosen(n)` | `all-hand`.
- `addCardToHand(cardId, count, alsoAddToDeck=false)` — creates a temporary card instance in hand; if
  `alsoAddToDeck` is false it evaporates (exhausts) on end of combat automatically.
- `addCardToDeck(cardId, count, location=discard)` — permanent (persists for rest of the run's deck).
- `scry(count)` — reveal top `count` of draw pile, player chooses any subset to discard, rest stay on top
  in the same relative order.
- `gainGold(amount)` / `loseGold(amount)` — combat/event context only.
- `selfDamage(amount)` — HP-cost paid by the card's own caster, resolved as `pureDamage` against Self,
  happens **before** the rest of the card's effect list.
- `repeatX(effects)` — only legal on an `X`-cost card; repeats `effects` once per Ember actually spent
  (minimum 1).
- `conditional(condition, then, else=[])` — condition ∈ `hasStatus(who, statusId)` |
  `statusStacksGTE(who, statusId, n)` | `handSizeGTE(n)` | `hpBelowPercent(who, pct)` |
  `isFirstCardThisTurn` | `cardsPlayedThisTurnGTE(n)` | `enemyCountGTE(n)`.
- `stanceless utility`: `shuffleDiscardIntoDraw()`, `gainBlockEqualToStrength()`, `dealDamageEqualToBlock(target)`
  (a small closed list of "signature" composite reads used by exactly one or two showcase cards each —
  still implemented as primitives, not one-offs, so content stays declarative).

Enemy moves and relic triggers reuse the exact same primitive list. Enemy-only extra primitives:
`summon(enemyId, count)`, `splitOnDeath(enemyId, count)`, `enrageOnHit(strengthPerHit)` (applies Strength
to self whenever damaged), `buffAllAllies(statusId, stacks)`.

## 6. Status effects (exact rules — this is the full list, do not add more)
| Status | Effect | Decay |
|---|---|---|
| Strength | +1 damage per stack on `damage` effects from Attacks | permanent (can be negative) |
| Dexterity | +1 Block per stack on `block` effects | permanent |
| Vulnerable | holder takes +50% from `damage` | -1 at end of holder's turn |
| Weak | holder deals -25% via `damage` | -1 at end of holder's turn |
| Frail | holder gains -25% Block | -1 at end of holder's turn |
| Scorch | at end of holder's turn, `pureDamage` equal to stacks, then stacks -1 | -1 per proc |
| Ash | buildup-only stat; at 5+ stacks, immediately consumes all stacks and triggers **Combust**: `pureDamage` equal to `2 × stacks consumed` to the holder | consumed on threshold only, otherwise permanent |
| Intangible | all incoming `damage`/`pureDamage` reduced to 1 (minimum, applied after all other math) | -1 at end of holder's turn |
| Cinderplate | at end of holder's turn, `block` equal to stacks | permanent (Power-granted) |
| Embermend | at end of holder's turn, `heal` equal to stacks, then stacks -1 | -1 per proc |
| Stagger | holder's next queued intent is skipped entirely (enemies only in practice) | consumed on use |
| Backdraft | whenever holder is hit by an Attack, attacker takes `pureDamage` equal to stacks | permanent |

## 7. Turn structure & order of operations
**Player turn start:** Block → 0 → draw up to 5 (respecting hand cap) → Ember refills to max → any
`onTurnStart` relic/status triggers (Cinderplate/Embermend/Scorch resolve on the **owner's own** turn end,
not start — see table above) → innate cards are guaranteed in the very first hand of combat only.

**Player turn:** play any number of cards in any order, Ember permitting. Targeting: Attack/Skill cards
with `target: Enemy` require tapping an enemy before the card resolves; `AllEnemies`/`Self`/`None` resolve
immediately on confirm.

**Player turn end:** non-retain unplayed cards discard → Vulnerable/Weak/Frail -1 → Scorch/Embermend/
Cinderplate resolve in that fixed order → Ash checked for Combust.

**Enemy turn (per enemy, in initiative order = board position left→right):** resolve this enemy's
previously-telegraphed intent → status decays/procs identically to the player's end-of-turn table,
scoped to that enemy → AI selects and telegraphs its **next** intent (see §8) → move to next enemy.

Combat ends the instant all enemies are at 0 HP (victory) or the player is at 0 HP (defeat, run over).

## 8. Enemy AI (data-driven, closed vocabulary)
```
{ id, name, maxHp, moves: [ {id, effects, intent, weight?} ... ], ai: AiRule }
AiRule ∈
  { type: "sequence", order: [moveId, moveId, ...], loop: true }
  { type: "random-weighted", pool: [moveId...] }             // uses each move's `weight`
  { type: "conditional", rules: [ {when: Condition, move: moveId} ... ], fallback: AiRule }
  { type: "no-repeat-random", pool: [moveId...], maxRepeat: 1..n }  // never queue the same move more
                                                                     // than maxRepeat times in a row
```
`Condition` reuses the `conditional` vocabulary from §5 scoped to `who: "self"`. `intent` is a small closed
enum used purely to pick which telegraph icon/color to show: `attack | attack-heavy | defend | buff |
debuff | summon | unknown`. First move of combat may be pinned via `ai.openingMove: moveId`.

## 9. Map
Each Act is a DAG generated from a seeded RNG: 7 columns of 2–4 nodes, each node connects forward to
1–3 nodes in the next column (guarantee: every node has ≥1 forward edge except the final column, which
all connect to the single Boss node; every node has ≥1 backward edge except column 0). Column 0 nodes are
always type `Monster`. The column immediately before the Boss is always type `Rest`.

Node type quota per Act (excluding forced column 0 / pre-boss / Boss slots):
Monster 45%, Event 20%, Elite 10%, Rest 12%, Shop 8%, Treasure 5% — rounded, then any remainder assigned
to Monster. Constraint pass after random assignment: guarantee at least 2 Rest nodes total are reachable
before the Boss on **every** path; if a generated graph fails this, resample that Act's type assignment
(not the graph shape) up to 20 times, then force-fix by converting the nearest Event to Rest.

Acts: 1, 2, 3, then a 4th short "Summit" act (3 nodes: Elite, Rest, Final Boss — no branching) as the
climax. Difficulty scales per act via enemy pool + a flat HP/damage multiplier: Act1 ×1.0, Act2 ×1.35,
Act3 ×1.75, Summit ×2.2 (multiplies enemy `maxHp` and any flat damage numbers in their moves; Trial
modifiers, §13, stack multiplicatively on top).

## 10. Node resolutions
- **Monster / Elite:** combat against 1–3 enemies drawn from that act's pool (Elite pool is a disjoint,
  harder set with better rewards). Reward: gold + choice of 1-of-3 cards (skip allowed) + Elites always
  also drop a relic.
- **Rest (Campfire):** choose exactly one — Heal 30% of max HP, Upgrade one card in your deck permanently,
  or (once the "Cleanse" milestone unlock is owned) Remove one card from your deck permanently.
- **Shop:** 5 cards for sale (weighted toward Uncommon), 3 relics for sale, 2 potions, and a Card Removal
  service (75 gold, +25 per removal already purchased this run). Prices scale with rarity: card Common
  50-60g, Uncommon 75-90g, Rare 135-150g; relic Common 90-110g, Uncommon 140-160g, Rare 220-250g.
- **Treasure:** open a chest for one relic (rarity odds: Common 50% / Uncommon 33% / Rare 17%, Elite-tier
  chests shift to 30/45/25) plus 20-40 gold.
- **Event:** narrative node, 2-4 authored choices, each with an outcome from the effect vocabulary plus
  gold/relic/card/curse grants. Some events branch into a forced small combat.
- **Boss:** single hard-scripted enemy from the act's boss list, always drops a **Boss Relic** (choose
  1 of 2 offered, and picking one puts the other back for future runs — not lost).

## 11. Curses
Negative Status-type cards (`type: Curse`) that sit in the deck as dead weight. Cannot be played (or in a
few cases can be played only to Exhaust themselves for a downside — specified per-card). Removed only via
Rest-site Cleanse or specific relics/potions. Pool of 5, granted by certain events/elites/shops-gone-wrong,
never by random combat rewards.

## 12. Relics
```
{ id, name, rarity: Starter|Common|Uncommon|Rare|Boss|Event|Shop, flavor,
  triggers: [ {on: TriggerEvent, condition?, effects: [EffectPrimitive...]} ... ] }
TriggerEvent ∈ onCombatStart | onTurnStart | onTurnEnd | onCardPlayed(cardType?) | onDamageTaken |
               onKillEnemy | onCombatEnd | onRest | onShopEnter | passive (stat mod, see below)
```
A `passive` trigger has no `effects`; instead it carries a `statMod` consumed directly by the engine
(e.g. `{maxHpBonus: 8}`, `{emberPerTurnBonus: 1}`, `{startingBlockBonus: 3}`) — kept separate from the
effect DSL because these are one-time constant modifiers, not repeatable triggered effects.

Rarity pool sizes: Starter 1 (Ashwalker's class relic, always owned), Common 15, Uncommon 15, Rare 8,
Boss 6 (offered 2-at-a-time, 3 pairs worth of variety), Event 4, Shop-only 2.

## 13. Meta-progression
**Sparks award formula (computed once at run end):**
`sparks = 15×(nodes cleared) + 60×(elites killed) + 120×(act bosses killed) + 400×(victory bonus, only if
the Summit boss died) + floor(gold remaining ÷ 10)`, halved (floor) if the run was abandoned by explicit
"give up" rather than dying to an enemy (discourages farming via instant-restart).

**Archive (Main Menu):** grid of every card/relic. Unlocked = usable in future runs' random pools.
Starting-unlocked set (available before spending anything): both Starter items, all `Starter` cards, and
a fixed 35%-by-rarity slice of Common cards/relics chosen at content-freeze time (hand-picked, not random,
so early runs are viably varied — see the generated `data/unlocks.js` for the exact list). Unlock costs:
Common 50 Sparks, Uncommon 120, Rare 250; relics same tiers +20%. Milestone unlocks (independent of Sparks,
granted instantly the first time the condition is met): beat Act1 boss → unlocks the "Cleanse" Rest option
(see §10); beat Act2 boss → unlocks 1 signature Uncommon card; beat Act3 boss → unlocks 1 signature Rare
relic; beat Summit boss once → unlocks Trial mode (§13b).

## 13b. Trials (Ascension-equivalent, unlocked per above)
Trial Level 0 (off) through 15, strictly cumulative — Level N includes every modifier from 1..N. Selected
from Main Menu before starting a run; persisted per-run so mid-run the level can't change. Modifiers (one
new one per level, curated, not random):
1: enemies +10% HP. 2: Elites gain +1 initial Strength. 3: start runs with 1 random Curse in deck.
4: Act1 gets +1 Elite node. 5: Rest sites can no longer fully heal (Heal option capped at 20% instead of
30%). 6: enemies +15% damage (stacks with #1's HP mod, both persist). 7: shops cost +20%. 8: Act2 gets +1
Elite node. 9: bosses gain a second action per turn on their final 25% HP. 10: start with 63 max HP instead
of 72. 11: Act3 gets +1 Elite node. 12: potions cannot be found as combat drops (shop-only). 13: enemies
+15% HP (additional). 14: card rewards always offer one fewer choice (2-of-3 becomes 2-of-2, i.e. only a
skip-or-not choice). 15: Summit boss gains an enrage timer (+50% damage after turn 6).

## 14. Save schema (localStorage, two top-level keys)
`ashwalker.meta.v1` → `{ unlockedCardIds:[], unlockedRelicIds:[], sparks:int, milestones:{}, trialLevel:int,
stats:{runs:int, wins:int, losses:int} }`
`ashwalker.run.v1` → `null | { seed, act, nodeId, mapByAct:[graph...], deck:[cardInstance...],
relics:[relicId...], potions:[potionId...], hp, maxHp, gold, trialLevel, flags:{}, rngState,
combat: null | {full in-progress combat state} }`
Schema is versioned by the key suffix; a version bump on either key means "wipe and start fresh" for that
key only — never silently coerce old shapes.

## 15. Potions
Small pool (~14), found as a chance-based combat drop (Elite guarantees one) or bought in shops. Player
holds up to 3 (base) potion slots, expandable by 1 via a specific relic. Usable at any point during combat
(not turn-gated), one target selection if the potion's effect needs one. Same effect DSL, single-effect-
list payload, no cost (Ember or otherwise) to use, consumed on use.

## 16. Content quantity targets (locked, do not exceed without updating this file)
Cards: 2 Starter-only (Strike-equivalent, Defend-equivalent, in the opening deck at 5 and 4 copies
respectively) + 1 Starter unique + 30 Common + 30 Uncommon + 15 Rare = 78 total, plus 5 Curses.
Relics: 1 Starter + 15 Common + 15 Uncommon + 8 Rare + 6 Boss + 4 Event + 2 Shop = 51 total.
Enemies: Act1 6 normal + 2 elite; Act2 6 normal + 2 elite; Act3 5 normal + 2 elite; 3 Act bosses; 1 Summit
boss (2-phase). Total 27.
Events: 18. Potions: 14.

## 17. Mobile/iOS-Safari constraints binding on the implementation
Portrait-first responsive layout, no build step (plain ES modules), installable PWA (manifest +
apple-touch-icon + service worker precache for full offline play), safe-area-inset padding, ≥44px tap
targets, `touch-action` locked to prevent pinch-zoom/double-tap-zoom/overscroll-bounce, pointer-events
based drag-to-play (unifies mouse for desktop testing and touch on device), autosave per §2, no reliance
on `beforeinstallprompt` (unsupported in Safari — use an in-app "Add to Home Screen" hint instead).
