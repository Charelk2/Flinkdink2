import { getAgeFromBirthday } from '../src/utils/age.js';

test('calculates age in years', () => {
  const birth = new Date();
  birth.setFullYear(birth.getFullYear() - 5);
  const dateStr = birth.toISOString();
  expect(getAgeFromBirthday(dateStr)).toBe(5);
});

test('returns NaN for invalid date', () => {
  expect(Number.isNaN(getAgeFromBirthday('invalid'))).toBe(true);
});
