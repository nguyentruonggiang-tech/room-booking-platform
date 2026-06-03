"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.user?.role);

  useEffect(() => {
    if (!token) {
      router.replace("/dang-nhap");
      return;
    }
 
    if (role && role !== "ADMIN") {
      router.replace("/");
    }
  }, [token, role, router]);

  if (!token) return null;

  return <>{children}</>;
}
