import { el, clear, ICON } from '../render.js';

export function renderMapScreen(app) {
  const run = app.run;
  const graph = run.mapsByAct[run.act];
  const available = new Set(app.rc.availableNodes(run).map((n) => n.id));
  const visited = new Set(run.visitedNodeIds);

  const byColumn = new Map();
  graph.nodes.forEach((n) => {
    if (!byColumn.has(n.column)) byColumn.set(n.column, []);
    byColumn.get(n.column).push(n);
  });
  const columns = [...byColumn.keys()].sort((a, b) => b - a); // boss (highest column) rendered first == top

  const mapWrap = el('div', { class: 'map-wrap' });
  columns.forEach((col) => {
    const row = el('div', { class: 'map-col' });
    byColumn.get(col).forEach((node) => {
      const isCurrent = run.currentNodeId === node.id;
      const isAvailable = available.has(node.id);
      const isVisited = visited.has(node.id);
      const stateClass = isCurrent ? 'current' : isAvailable ? 'available' : isVisited ? 'visited' : 'locked';
      row.appendChild(el('div', {
        class: `map-node ${stateClass}`,
        text: ICON[node.type] || '?',
        onClick: () => { if (isAvailable) app.travelToNode(node.id); },
      }));
    });
    mapWrap.appendChild(row);
  });

  const wrap = el('div', { class: 'screen' }, [
    el('div', { class: 'topbar' }, [
      el('div', { class: 'stat', text: `Act ${run.act}${run.act === 4 ? ' — Summit' : ''}` }),
      el('div', { class: 'stat hp', text: `${ICON.hp} ${run.hp}/${run.maxHp}` }),
      el('div', { class: 'stat gold', text: `${ICON.gold} ${run.gold}` }),
      el('button', { class: 'ghost', text: '☰', onClick: () => app.goto('deckview', { returnTo: 'map' }) }),
      el('button', { class: 'ghost', text: 'Give Up', onClick: () => app.giveUpRun() }),
    ]),
    mapWrap,
  ]);
  clear(app.root);
  app.root.appendChild(wrap);
  mapWrap.scrollTop = mapWrap.scrollHeight;
}
