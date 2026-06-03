"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { adminRoomService } from "@/features/admin/rooms/services/admin-room.service";
import Pagination from "@/shared/pagination/Pagination";
import RoomTable from "./RoomTable";
import RoomModal from "./RoomModal";
import type { AdminRoom } from "../types/admin-room.type";

const PAGE_SIZE = 10;

export default function RoomsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageIndex = Number(searchParams.get("page") ?? "1");

  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [keyword, setKeyword] = useState("");
  const [totalRow, setTotalRow] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminRoom | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const debouncedKeyword = useDebounce(keyword);

  useEffect(() => {
    if (pageIndex !== 1) router.push(`${pathname}?page=1`);
  }, [debouncedKeyword]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    adminRoomService
      .getPaged(pageIndex, PAGE_SIZE, debouncedKeyword)
      .then((res) => {
        setRooms(res.data);
        setTotalRow(res.totalRow);
      })
      .catch(() => setError("Không thể tải danh sách phòng."))
      .finally(() => setLoading(false));
  }, [debouncedKeyword, pageIndex, refreshKey]);

  const totalPage = Math.ceil(totalRow / PAGE_SIZE);
  const from = totalRow === 0 ? 0 : (pageIndex - 1) * PAGE_SIZE + 1;
  const to = Math.min(pageIndex * PAGE_SIZE, totalRow);

  function openCreate() {
    setEditTarget(null);
    setModalOpen(true);
  }

  function openEdit(room: AdminRoom) {
    setEditTarget(room);
    setModalOpen(true);
  }

  function handleSuccess() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý phòng</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Xem và quản lý tất cả phòng trong hệ thống
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-admin-primary px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Thêm phòng
        </button>
      </div>

      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm tên phòng..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-admin-primary focus:bg-white focus:ring-1 focus:ring-admin-primary"
        />
      </div>

      <RoomTable
        rooms={rooms}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={() => {}}
      />

      <RoomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        editTarget={editTarget}
      />

      {totalRow > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Hiển thị {from}–{to} trong {totalRow.toLocaleString("vi-VN")} phòng
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
