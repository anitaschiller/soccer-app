export function saveToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error.message);
  }
}
