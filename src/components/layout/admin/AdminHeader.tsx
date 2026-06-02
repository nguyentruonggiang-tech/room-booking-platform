"use client";

import { usePathname } from "next/navigation";
import { Search, User } from "lucide-react";
import { adminMenuList } from "./admin-menu";

export default function AdminHeader() {
  const pathname = usePathname();
  const activeMenu = adminMenuList.find((item) => pathname.startsWith(item.path));
  const pageTitle = activeMenu?.label ?? "Tổng quan";

  return (
    <header className="flex h-16 items-center justify-between gap-6 border-b border-admin-border bg-admin-header px-6">
      <h1 className="text-base font-semibold whitespace-nowrap text-white">{pageTitle}</h1>

      <div className="flex items-center gap-3">
        <div className="flex w-72 items-center gap-2 rounded-lg border border-admin-border bg-white/5 px-3 py-2">
          <Search size={14} className="shrink-0 text-white/40" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
          />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-admin-primary">
          <User size={14} className="text-white" />
        </div>
      </div>
    </header>
  );
}
