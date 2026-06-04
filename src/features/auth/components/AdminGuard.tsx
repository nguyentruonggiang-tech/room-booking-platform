"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

const ADMIN_ROLE = "ADMIN";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.user?.role);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!token) {
      router.replace("/dang-nhap");
      return;
    }
    if (!role || role !== ADMIN_ROLE) {
      router.replace("/");
    }
  }, [mounted, token, role, router]);

  if (!mounted || !token) return null;

  return <>{children}</>;
}
