// localStorage persistence — see DESIGN_BIBLE.md section 14. Every call is defensive: Safari private
// mode (or a full quota) can throw on setItem, and that must never crash the game, only skip the save.
const META_KEY = 'ashwalker.meta.v1';
const RUN_KEY = 'ashwalker.run.v1';

function safeGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('save: failed to read', key, e);
    return null;
  }
}

function safeSet(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('save: failed to write', key, e);
    return false;
  }
}

export const loadMeta = () => safeGet(META_KEY);
export const saveMeta = (meta) => safeSet(META_KEY, meta);
export const loadRun = () => safeGet(RUN_KEY);
export const saveRun = (run) => safeSet(RUN_KEY, run);
export const clearRun = () => safeSet(RUN_KEY, null);
