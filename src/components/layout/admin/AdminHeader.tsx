"use client";

import { usePathname } from "next/navigation";
import { Search, User } from "lucide-react";
import { adminMenuList } from "./admin-menu";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function AdminHeader() {
  const pathname = usePathname();
  const activeMenu = adminMenuList.find((item) => pathname.startsWith(item.path));
  const pageTitle = activeMenu?.label ?? "Tổng quan";

  return (
    <header className="flex h-16 items-center justify-between gap-6 border-b border-admin-border bg-admin-header px-6">
      <h1 className="text-base font-semibold whitespace-nowrap dark:text-white text-gray-900">{pageTitle}</h1>

      <div className="flex items-center gap-3">
        <div className="flex w-72 items-center gap-2 rounded-lg border border-admin-border dark:bg-white/5 bg-gray-100 px-3 py-2">
          <Search size={14} className="shrink-0 dark:text-white/40 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-transparent text-sm dark:text-white text-gray-800 dark:placeholder:text-white/40 placeholder:text-gray-400 outline-none"
          />
        </div>
        <ThemeToggle className="flex h-8 w-8 items-center justify-center rounded-lg border border-admin-border dark:text-white/60 text-gray-500 dark:hover:text-white hover:text-gray-900" />
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-admin-primary">
          <User size={14} className="text-white" />
        </div>
      </div>
    </header>
  );
}
