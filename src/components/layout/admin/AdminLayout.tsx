import type { PropsWithChildren } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminContent from "./AdminContent";
import AdminFooter from "./AdminFooter";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 w-60 bg-admin-sidebar">
        <AdminSidebar />
      </aside>

      <div className="ml-60 flex min-h-screen flex-1 flex-col">
        <AdminHeader />
        <AdminContent>{children}</AdminContent>
        <AdminFooter />
      </div>
    </div>
  );
}
