const STORAGE_KEY = 'flinkdink';
const SCHEMA_VERSION = 1;

export function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { v: SCHEMA_VERSION, week: 1, day: 1, session: 1 };
  }
  try {
    const obj = JSON.parse(raw);
    if (obj.v !== SCHEMA_VERSION) {
      // schema change: reset
      localStorage.removeItem(STORAGE_KEY);
      return { v: SCHEMA_VERSION, week: 1, day: 1, session: 1 };
    }
    return obj;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { v: SCHEMA_VERSION, week: 1, day: 1, session: 1 };
  }
}

export function saveProgress(prog) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
}

export function markSessionComplete() {
  const prog = loadProgress();
  let { week, day, session } = prog;
  session += 1;
  if (session > 3) {
    session = 1;
    day += 1;
  }
  if (day > 7) {
    day = 1;
    week += 1;
  }
  saveProgress({ v: SCHEMA_VERSION, week, day, session });
}
