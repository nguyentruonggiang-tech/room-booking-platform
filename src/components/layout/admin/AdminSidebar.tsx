"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, LayoutGrid, Settings } from "lucide-react";
import { adminMenuList } from "./admin-menu";

const bottomMenuList = [
  { path: "#", label: "Cài đặt", icon: Settings },
  { path: "#", label: "Hỗ trợ", icon: HelpCircle },
];

const inactiveItemCls = "dark:text-white/60 text-gray-600 dark:hover:bg-white/5 hover:bg-gray-100 dark:hover:text-white hover:text-gray-900";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-admin-border px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-admin-primary">
          <LayoutGrid size={18} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold leading-tight dark:text-white text-gray-900">Quản trị</span>
          <span className="text-[11px] uppercase tracking-widest dark:text-white/40 text-gray-400">Hệ thống đặt phòng</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        {adminMenuList.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-admin-primary text-white"
                  : inactiveItemCls
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-admin-border px-3 py-3">
        {bottomMenuList.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.path}
              className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${inactiveItemCls}`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </div>

    </div>
  );
}
