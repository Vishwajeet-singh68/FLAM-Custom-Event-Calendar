export function getDaysInMonth(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
}

export function getStartDayOfMonth(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();
}