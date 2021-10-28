function get(key: string): string | null {
  return window.localStorage.getItem(key);
}

function set(key: string, value: string): void {
  window.localStorage.setItem(key, value);
}

function remove(key: string): void {
  window.localStorage.removeItem(key);
}

function clear(): void {
  window.localStorage.clear();
}

function getAccessToken(): string | null {
  return get('access_token');
}

function setAccessToken(value: string): void {
  set('access_token', value);
}

function hasAccessToken(): boolean {
  return getAccessToken() !== null;
}

const localStorage = { get, set, remove, clear, getAccessToken, setAccessToken, hasAccessToken };

export default localStorage;
