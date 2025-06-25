export function getAgeFromBirthday(birthday) {
  const birth = new Date(birthday);
  if (Number.isNaN(birth.getTime())) {
    return NaN;
  }
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}
