"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, UserPlus } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { adminUserService } from "@/features/admin/users/services/admin-user.service";
import Pagination from "@/shared/pagination/Pagination";
import UserTable from "./UserTable";
import type { AdminUser } from "../types/admin-user.type";

const PAGE_SIZE = 10;

export default function UsersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageIndex = Number(searchParams.get("page") ?? "1");

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [keyword, setKeyword] = useState("");
  const [totalRow, setTotalRow] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedKeyword = useDebounce(keyword);

  useEffect(() => {
    if (pageIndex !== 1) router.push(`${pathname}?page=1`);
  }, [debouncedKeyword]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    adminUserService
      .getPaged(pageIndex, PAGE_SIZE, debouncedKeyword)
      .then((res) => {
        setUsers(res.data);
        setTotalRow(res.totalRow);
      })
      .catch(() => setError("Không thể tải danh sách người dùng."))
      .finally(() => setLoading(false));
  }, [debouncedKeyword, pageIndex]);

  const totalPage = Math.ceil(totalRow / PAGE_SIZE);
  const from = totalRow === 0 ? 0 : (pageIndex - 1) * PAGE_SIZE + 1;
  const to = Math.min(pageIndex * PAGE_SIZE, totalRow);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Xem và quản lý tất cả người dùng trong hệ thống
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
          <UserPlus className="h-4 w-4" />
          Thêm người dùng
        </button>
      </div>

      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm tên hoặc email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <UserTable users={users} loading={loading} error={error} />

      {totalRow > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Hiển thị {from}–{to} trong {totalRow.toLocaleString("vi-VN")} người dùng
          </span>
          <Pagination
            page={pageIndex}
            totalPages={totalPage}
            href={(page) => `${pathname}?page=${page}`}
            activeClass="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-admin-primary bg-admin-primary px-2 text-sm font-medium text-white"
          />
        </div>
      )}
    </div>
  );
}
