// Map generation — see DESIGN_BIBLE.md section 9.
// Refinement over the bible's "resample until constraint holds" description: columns 0, 3 and 6 are
// *structurally* forced to Monster / Rest / Rest respectively, which guarantees "at least 2 Rest nodes
// reachable before the Boss on every path" by construction instead of by resample-and-hope. Documented
// in REPORT.md as a deliberate simplification, not a deviation in intent.
let uid = 0;
function nextNodeId() { uid += 1; return `n${uid}`; }

const RANDOM_COLUMN_WEIGHTS = { Monster: 50, Event: 24, Elite: 12, Shop: 9, Treasure: 5 };

function weightedType(rng) {
  const entries = Object.entries(RANDOM_COLUMN_WEIGHTS);
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let roll = rng.next() * total;
  for (const [type, w] of entries) {
    roll -= w;
    if (roll <= 0) return type;
  }
  return entries[entries.length - 1][0];
}

export function generateAct(actIndex, rng, { summit = false, extraElites = 0 } = {}) {
  if (summit) {
    const elite = { id: nextNodeId(), act: actIndex, column: 0, type: 'Elite', x: 0.5, edges: [] };
    const rest = { id: nextNodeId(), act: actIndex, column: 1, type: 'Rest', x: 0.5, edges: [] };
    const boss = { id: nextNodeId(), act: actIndex, column: 2, type: 'Boss', x: 0.5, edges: [] };
    elite.edges = [rest.id];
    rest.edges = [boss.id];
    return { nodes: [elite, rest, boss], startNodeId: elite.id, bossNodeId: boss.id };
  }

  const COLUMN_COUNT = 7;
  const columns = [];
  for (let col = 0; col < COLUMN_COUNT; col++) {
    const count = rng.int(2, 5);
    const forcedType = col === 0 ? 'Monster' : col === 3 || col === 6 ? 'Rest' : null;
    const nodes = Array.from({ length: count }, (_, i) => ({
      id: nextNodeId(),
      act: actIndex,
      column: col,
      type: forcedType || weightedType(rng),
      x: count === 1 ? 0.5 : i / (count - 1),
      edges: [],
    }));
    columns.push(nodes);
  }

  for (let col = 0; col < COLUMN_COUNT - 1; col++) {
    const from = columns[col];
    const to = columns[col + 1];
    for (const node of from) {
      const edgeCount = rng.int(1, 4);
      const targets = rng.sample(to, Math.min(edgeCount, to.length));
      node.edges = targets.map((t) => t.id);
    }
    for (const target of to) {
      const hasIncoming = from.some((n) => n.edges.includes(target.id));
      if (!hasIncoming) rng.pick(from).edges.push(target.id);
    }
  }

  const boss = { id: nextNodeId(), act: actIndex, column: COLUMN_COUNT, type: 'Boss', x: 0.5, edges: [] };
  columns[COLUMN_COUNT - 1].forEach((n) => n.edges.push(boss.id));

  // Trial modifier support (DESIGN_BIBLE.md 13b, levels 4/8/11): convert `extraElites` random eligible
  // Monster nodes in the free-assignment columns (1,2,4,5 — never the forced Monster/Rest columns) into
  // Elite encounters, raising the act's difficulty without changing the map's shape.
  const eligibleForElite = [1, 2, 4, 5].flatMap((col) => columns[col].filter((n) => n.type === 'Monster'));
  rng.sample(eligibleForElite, Math.min(extraElites, eligibleForElite.length)).forEach((n) => { n.type = 'Elite'; });

  const allNodes = columns.flat();
  allNodes.push(boss);
  return { nodes: allNodes, startNodeIds: columns[0].map((n) => n.id), bossNodeId: boss.id };
}

export function reachableFrom(graph, nodeId) {
  const byId = new Map(graph.nodes.map((n) => [n.id, n]));
  const seen = new Set();
  const stack = [nodeId];
  while (stack.length) {
    const id = stack.pop();
    if (seen.has(id)) continue;
    seen.add(id);
    const node = byId.get(id);
    if (node) stack.push(...node.edges);
  }
  return seen;
}
