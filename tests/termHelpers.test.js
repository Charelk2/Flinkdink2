import { getTermForWeek } from '../src/utils/termHelpers.js';

describe('getTermForWeek', () => {
  test.each([
    [1, 1],
    [10, 1],
    [11, 2],
    [20, 2],
    [21, 3],
    [36, 3],
    [37, 4],
    [47, 4],
  ])('week %i is in term %i', (week, term) => {
    expect(getTermForWeek(week)).toBe(term);
  });
});
