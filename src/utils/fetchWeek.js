import { getTermForWeek } from './termHelpers'

export async function fetchWeekData(week) {
  const id = String(week).padStart(3, '0');
  const term = getTermForWeek(week)
  const res = await fetch(`/terms/term${term}/weeks/week${id}.json`)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}
