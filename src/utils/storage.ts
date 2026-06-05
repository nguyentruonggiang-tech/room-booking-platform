import { SESSION_TTL_MS } from "@/constants/app.constants";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";
const AUTH_ISSUED_AT_KEY = "auth_issued_at";

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

  saveIssuedAt: (): void => localStorage.setItem(AUTH_ISSUED_AT_KEY, String(Date.now())),
  removeIssuedAt: (): void => localStorage.removeItem(AUTH_ISSUED_AT_KEY),
  isSessionExpired: (): boolean => {
    const raw = localStorage.getItem(AUTH_ISSUED_AT_KEY);
    if (!raw) return true;
    const issued = Number(raw);
    if (!Number.isFinite(issued)) return true;
    return Date.now() - issued > SESSION_TTL_MS;
  },
};
