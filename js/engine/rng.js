// Deterministic, serializable PRNG (mulberry32). State is a single uint32, safe for JSON save data.
export function createRng(seed) {
  let a = seed >>> 0;
  const api = {
    next() {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    int(minInclusive, maxExclusive) {
      return minInclusive + Math.floor(api.next() * (maxExclusive - minInclusive));
    },
    bool(p = 0.5) {
      return api.next() < p;
    },
    pick(arr) {
      if (!arr.length) return undefined;
      return arr[api.int(0, arr.length)];
    },
    sample(arr, count) {
      const pool = arr.slice();
      const out = [];
      while (out.length < count && pool.length) {
        const i = api.int(0, pool.length);
        out.push(pool.splice(i, 1)[0]);
      }
      return out;
    },
    shuffle(arr) {
      const out = arr.slice();
      for (let i = out.length - 1; i > 0; i--) {
        const j = api.int(0, i + 1);
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
    weighted(items, getWeight) {
      const total = items.reduce((s, it) => s + getWeight(it), 0);
      let roll = api.next() * total;
      for (const it of items) {
        roll -= getWeight(it);
        if (roll <= 0) return it;
      }
      return items[items.length - 1];
    },
    getState() {
      return a >>> 0;
    },
    setState(state) {
      a = state >>> 0;
    },
  };
  return api;
}

export function seedFromString(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h >>> 0) || 1;
}
