"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, LayoutGrid, Settings } from "lucide-react";
import { adminMenuList } from "./admin-menu";

const bottomMenuList = [
  { path: "#", label: "Cài đặt", icon: Settings },
  { path: "#", label: "Hỗ trợ", icon: HelpCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-admin-border px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-admin-primary">
          <LayoutGrid size={18} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold leading-tight text-white">Quản trị</span>
          <span className="text-[11px] uppercase tracking-widest text-white/40">Hệ thống đặt phòng</span>
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
                  : "text-white/60 hover:bg-white/5 hover:text-white"
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
              key={item.path}
              href={item.path}
              className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
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
