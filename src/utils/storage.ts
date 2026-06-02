const AUTH_TOKEN_KEY = "auth_token";

export const storage = {
  getToken: (): string | null => localStorage.getItem(AUTH_TOKEN_KEY),
  saveToken: (token: string): void => localStorage.setItem(AUTH_TOKEN_KEY, token),
  removeToken: (): void => localStorage.removeItem(AUTH_TOKEN_KEY),
};
