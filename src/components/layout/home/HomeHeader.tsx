"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Home, Loader2, LogOut, MapPin, Search, User } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { toast } from "sonner";
import { homeNavList } from "./home-layout.constants";
import { useAuthStore } from "@/store/auth.store";
import { useSearchStore } from "@/store/search.store";
import { useDebounce } from "@/hooks/useDebounce";
import { locationService } from "@/features/locations/services/location.service";
import type { ViTriViewModel } from "@/features/locations/types/location.type";
import { getInitials } from "@/shared/utils/string";
import { formatVNDate } from "@/shared/utils/date";

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
  const { selectedLocation, ngayDen, ngayDi, soKhach, setSelectedLocation, setNgayDen, setNgayDi, setSoKhach } = useSearchStore();
  const isRoomList = /^\/\d+$/.test(pathname);

  const locationLabel = selectedLocation
    ? `${selectedLocation.tenViTri}, ${selectedLocation.tinhThanh}, ${selectedLocation.quocGia}`
    : "Khu vực bản đồ đã chọn";
  const isLoggedIn = !!token;

  const dateLabel = ngayDen && ngayDi ? `${formatVNDate(ngayDen)} – ${formatVNDate(ngayDi)}` : "Thêm ngày";

  const [mounted, setMounted] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const [locationOpen, setLocationOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [headerKeyword, setHeaderKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<ViTriViewModel[]>([]);
  const [locLoading, setLocLoading] = useState(false);
  const debouncedKeyword = useDebounce(headerKeyword, 400);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!locationOpen) return;
    setLocLoading(true);
    locationService
      .getPaging(1, 8, debouncedKeyword)
      .then((res) => setSuggestions(res.data))
      .catch(() => setSuggestions([]))
      .finally(() => setLocLoading(false));
  }, [locationOpen, debouncedKeyword]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
        setDateOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectLocation(loc: ViTriViewModel) {
    setSelectedLocation(loc);
    setHeaderKeyword(`${loc.tenViTri}, ${loc.tinhThanh}`);
    setLocationOpen(false);
    router.push(`/${loc.id}`);
  }

  const handleLogout = () => {
    clearAuth();
    toast.success("Đăng xuất thành công!");
    router.push("/dang-nhap");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-dark bg-surface-dark dark:text-white text-gray-900">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-8">

        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-dark">
            <Home size={16} className="text-white" />
          </div>
          <span className="text-xl font-semibold text-brand">AirBnb</span>
        </Link>

        {isRoomList && (
          <div ref={locationRef} className="relative hidden md:block">
            <div className="flex items-center divide-x divide-gray-300 overflow-hidden rounded-full border border-gray-300 bg-white shadow-sm transition-shadow hover:shadow-md">
              <button
                onClick={() => { setLocationOpen(!locationOpen); setDateOpen(false); }}
                className="px-4 py-2 text-sm font-medium text-gray-800"
              >
                {locationLabel}
              </button>
              <button
                onClick={() => { setDateOpen(!dateOpen); setLocationOpen(false); }}
                className="px-4 py-2 text-sm text-gray-600"
              >
                {dateLabel}
              </button>
              <div className="flex items-center gap-1.5 px-4 py-2">
                <button
                  onClick={() => setSoKhach(Math.max(1, soKhach - 1))}
                  className="text-gray-400 transition-colors hover:text-gray-800"
                >
                  −
                </button>
                <span className="min-w-[16px] text-center text-sm text-gray-700">{soKhach}</span>
                <button
                  onClick={() => setSoKhach(soKhach + 1)}
                  className="text-gray-400 transition-colors hover:text-gray-800"
                >
                  +
                </button>
                <span className="text-sm text-gray-500">khách</span>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white mx-2">
                <Search size={14} />
              </span>
            </div>

            {locationOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-2.5">
                  <MapPin size={14} className="shrink-0 text-brand" />
                  <input
                    autoFocus
                    value={headerKeyword}
                    onChange={(e) => setHeaderKeyword(e.target.value)}
                    placeholder="Bạn muốn đi đâu?"
                    className="flex-1 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  />
                  {locLoading && <Loader2 size={13} className="shrink-0 animate-spin text-gray-400" />}
                </div>
                {suggestions.length === 0 && !locLoading ? (
                  <p className="px-4 py-3 text-sm text-gray-400">Không tìm thấy địa điểm</p>
                ) : (
                  suggestions.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => selectLocation(loc)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <MapPin size={14} className="shrink-0 text-brand" />
                      <p className="truncate text-sm text-gray-700">
                        {loc.tenViTri}, {loc.tinhThanh}, {loc.quocGia}
                      </p>
                    </button>
                  ))
                )}
              </div>
            )}

            {dateOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-gray-500">Nhận phòng</span>
                    <input
                      type="date"
                      value={ngayDen}
                      onChange={(e) => setNgayDen(e.target.value)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none [color-scheme:light] focus:border-brand"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-gray-500">Trả phòng</span>
                    <input
                      type="date"
                      value={ngayDi}
                      onChange={(e) => setNgayDi(e.target.value)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none [color-scheme:light] focus:border-brand"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {isHome && (
          <nav className="hidden items-center gap-8 md:flex">
            {homeNavList.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`border-b-2 pb-1 text-base font-medium transition-colors ${
                  index === 0
                    ? "border-brand text-brand"
                    : "border-transparent dark:text-white/90 text-gray-600 hover:text-brand"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <button className="hidden text-sm font-medium dark:text-white/90 text-gray-600 transition-colors hover:text-brand md:block">
            {isRoomList ? "Trở thành chủ nhà" : "Đón tiếp khách"}
          </button>
          <ThemeToggle className="flex h-9 w-9 items-center justify-center rounded-full border border-border-dark-soft bg-surface-elevated dark:text-white/90 text-gray-600 transition-colors hover:text-brand" />

          {mounted && isLoggedIn && user ? (
            <div className="flex items-center gap-2">
              <Link href="/ho-so" className="flex items-center gap-2">
                <UserAvatar name={user.name} avatar={user.avatar} />
                <span className="hidden text-sm font-medium dark:text-white/90 text-gray-700 hover:text-brand transition-colors md:block">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-dark-soft bg-surface-elevated dark:text-white/90 text-gray-600 transition-colors hover:text-red-400"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : mounted ? (
            <Link href="/dang-nhap">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border-dark-soft bg-surface-elevated dark:text-white/90 text-gray-600 transition-colors hover:text-brand">
                <User size={16} />
              </button>
            </Link>
          ) : null}
        </div>

      </div>
    </header>
  );
}
