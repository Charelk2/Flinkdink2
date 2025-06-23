// Term 1 now contains only weeks 1–10 after removing weeks 11 and 12.
// Term 2 covers weeks 11–20, Term 3 spans weeks 25–36 and the remaining
// weeks 37–47 belong to Term 4. Weeks 21–24 currently have no content but
// map to Term 3 for consistency.
export function getTermForWeek(week) {
  if (week <= 10) return 1;
  if (week <= 20) return 2;
  if (week <= 36) return 3;
  return 4;
}
