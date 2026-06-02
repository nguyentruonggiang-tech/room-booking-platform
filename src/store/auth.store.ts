import { create } from "zustand";
import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";
import { storage } from "@/utils/storage";

type AuthState = {
  user: ThongTinNguoiDung | null;
  token: string | null;
  setAuth: (user: ThongTinNguoiDung, token: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? storage.getToken() : null,
  setAuth: (user, token) => {
    storage.saveToken(token);
    set({ user, token });
  },
  clearAuth: () => {
    storage.removeToken();
    set({ user: null, token: null });
  },
}));
