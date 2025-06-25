import { calculateWeekPercent } from '../src/utils/progress.js'

describe('calculateWeekPercent', () => {
  test.each([
    [1, 41, 0],
    [2, 41, Math.round((1 / 41) * 100)],
    [41, 41, Math.round((40 / 41) * 100)],
    [50, 41, Math.round((40 / 41) * 100)], // clamp at totalWeeks
    [0, 41, 0],    // clamp at minimum 1
  ])('week %i of %i -> %i%', (week, total, expected) => {
    expect(calculateWeekPercent(week, total)).toBe(expected)
  })
})
