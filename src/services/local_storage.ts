const setItem = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getItem = <T>(key: string) => {
  const item = window.localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

const storeItem = <T>(key: string) => ({
  get: () => getItem<T>(key),
  set: (value: T) => setItem(key, value),
  remove: () => removeItem(key),
});

export default {
  storeItem,
};
