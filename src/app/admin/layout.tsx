import type { PropsWithChildren } from "react";
import { AdminLayout } from "@/components/layout/admin";

export default function AdminRootLayout({ children }: PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>;
}
