// Term 1 now contains only weeks 1–10 after removing weeks 11 and 12.
// Term 2 covers weeks 11–20. Term 3 now spans weeks 21–30 and the remaining
// weeks 31–47 belong to Term 4.
export function getTermForWeek(week) {
  if (week <= 10) return 1;
  if (week <= 20) return 2;
  if (week <= 30) return 3;
  return 4;
}
