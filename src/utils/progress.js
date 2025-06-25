// Returns the percentage of weeks completed given the current week and
// total weeks in the course. The value is clamped so week 1 yields 0% and
// the final week yields 100%.
export function calculateWeekPercent(currentWeek, totalWeeks) {
  const clampedWeek = Math.min(Math.max(currentWeek, 1), totalWeeks)
  // (week - 1) because the active week is still in progress
  const percent = ((clampedWeek - 1) / totalWeeks) * 100
  return Math.round(percent)
}
