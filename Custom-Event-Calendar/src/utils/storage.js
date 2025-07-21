export function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function saveToStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}