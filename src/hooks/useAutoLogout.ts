"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { storage } from "@/utils/storage";

export function useAutoLogout() {
  const token = useAuthStore((s) => s.token);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    if (!token) return;

    function checkAndLogout() {
      if (!storage.isSessionExpired()) return;
      clearAuth();
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    }

    checkAndLogout();
    const timer = setInterval(checkAndLogout, 60_000);
    return () => clearInterval(timer);
  }, [token, clearAuth]);
}
