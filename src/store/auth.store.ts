import { create } from "zustand";
import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";
import { storage } from "@/utils/storage";

const isBrowser = typeof window !== "undefined";

type AuthState = {
  user: ThongTinNguoiDung | null;
  token: string | null;
  setAuth: (user: ThongTinNguoiDung, token: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: isBrowser ? storage.getUser<ThongTinNguoiDung>() : null,
  token: isBrowser ? storage.getToken() : null,
  setAuth: (user, token) => {
    storage.saveToken(token);
    storage.saveUser(user);
    set({ user, token });
  },
  clearAuth: () => {
    storage.removeToken();
    storage.removeUser();
    set({ user: null, token: null });
  },
}));
