const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export const storage = {
  getToken: (): string | null => localStorage.getItem(AUTH_TOKEN_KEY),
  saveToken: (token: string): void => localStorage.setItem(AUTH_TOKEN_KEY, token),
  removeToken: (): void => localStorage.removeItem(AUTH_TOKEN_KEY),

  getUser: <T>(): T | null => {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return null; }
  },
  saveUser: (user: unknown): void => localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user)),
  removeUser: (): void => localStorage.removeItem(AUTH_USER_KEY),
};
