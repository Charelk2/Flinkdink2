import { getTermForWeek } from '../src/utils/termHelpers.js';

describe('getTermForWeek', () => {
  test.each([
    [1, 1],
    [12, 1],
    [13, 2],
    [24, 2],
    [25, 3],
    [36, 3],
    [37, 4],
    [46, 4],
  ])('week %i is in term %i', (week, term) => {
    expect(getTermForWeek(week)).toBe(term);
  });
});
