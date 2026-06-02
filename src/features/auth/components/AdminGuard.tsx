"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, user } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.replace("/dang-nhap");
      return;
    }
 
    if (user && user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [token, user, router]);

  if (!token) return null;

  return <>{children}</>;
}
