export const WEEKS_PER_TERM = 12;
export const TOTAL_TERMS = 4;

export function getTermForWeek(week) {
  if (week < 1) {
    return 1;
  }
  return Math.ceil(week / WEEKS_PER_TERM);
}
