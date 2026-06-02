"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Home, LogOut, Moon, Search, User } from "lucide-react";
import { toast } from "sonner";
import { homeNavList } from "./home-layout.constants";
import { useAuthStore } from "@/store/auth.store";

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function UserAvatar({ name, avatar }: { name: string; avatar?: string }) {
  const [imgError, setImgError] = useState(false);

  if (avatar && !imgError) {
    return (
      <img
        src={avatar}
        alt={name}
        className="h-9 w-9 rounded-full object-cover border border-border-dark-soft"
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
      {getInitials(name)}
    </div>
  );
}

export default function HomeHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const { user, token, clearAuth } = useAuthStore();
  const isLoggedIn = !!token;

  const handleLogout = () => {
    clearAuth();
    toast.success("Đăng xuất thành công!");
    router.push("/dang-nhap");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-dark bg-surface-dark">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-dark">
            <Home size={16} className="text-white" />
          </div>
          <span className="text-xl font-semibold text-brand">AirBnb</span>
        </Link>

        {/* Nav */}
        {isHome && (
          <nav className="hidden items-center gap-8 md:flex">
            {homeNavList.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`border-b-2 pb-1 text-base font-medium transition-colors ${
                  index === 0
                    ? "border-brand text-brand"
                    : "border-transparent text-white/90 hover:text-brand"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <button className="hidden items-center gap-2 rounded-full border border-border-dark-soft bg-surface-elevated px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:text-brand md:flex">
              <Search size={14} />
              Tìm kiếm
            </button>
          )}
          <button className="hidden text-sm font-medium text-white/90 transition-colors hover:text-brand md:block">
            Đón tiếp khách
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border-dark-soft bg-surface-elevated text-white/90 transition-colors hover:text-brand">
            <Moon size={16} />
          </button>

          {isLoggedIn && user ? (
            <div className="flex items-center gap-2">
              <Link href="/ho-so" className="flex items-center gap-2">
                <UserAvatar name={user.name} avatar={user.avatar} />
                <span className="hidden text-sm font-medium text-white/90 hover:text-brand transition-colors md:block">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-dark-soft bg-surface-elevated text-white/90 transition-colors hover:text-red-400"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link href="/dang-nhap">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border-dark-soft bg-surface-elevated text-white/90 transition-colors hover:text-brand">
                <User size={16} />
              </button>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
