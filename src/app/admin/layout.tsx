import type { PropsWithChildren } from "react";
import { AdminLayout } from "@/components/layout/admin";
import AdminGuard from "@/features/auth/components/AdminGuard";

export default function AdminRootLayout({ children }: PropsWithChildren) {
  return (
    <AdminGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminGuard>
  );
}
