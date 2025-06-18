export async function fetchWeekData(week) {
  const id = String(week).padStart(3, '0');
  const res = await fetch(`/weeks/week${id}.json`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}
