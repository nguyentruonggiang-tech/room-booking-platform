"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { roomService } from "@/features/rooms/services/room.service";
import type { PhongViewModel } from "@/features/rooms/types/room.type";
import { locationService } from "@/features/locations/services/location.service";
import { useSearchStore } from "@/store/search.store";
import RoomCard from "./RoomCard";

function formatVNDate(dateStr: string): string {
  const [, month, day] = dateStr.split("-");
  return `${parseInt(day)} tháng ${parseInt(month)}`;
}

const filterBadges = ["Loại nơi ở", "Giá", "Đặt ngay", "Phòng và phòng ngủ", "Bộ lọc khác"];

export default function RoomList() {
  const { maViTri: maViTriParam } = useParams<{ maViTri: string }>();
  const maViTri = maViTriParam ? Number(maViTriParam) : undefined;
  const [rooms, setRooms] = useState<PhongViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { ngayDen, ngayDi, selectedLocation, setSelectedLocation } = useSearchStore();

  useEffect(() => {
    if (!maViTri || selectedLocation?.id === maViTri) return;
    locationService.getById(maViTri).then(setSelectedLocation).catch(() => {});
  }, [maViTri, selectedLocation, setSelectedLocation]);

  const dateRange =
    ngayDen && ngayDi
      ? ` · ${formatVNDate(ngayDen)} – ${formatVNDate(ngayDi)}`
      : "";

  useEffect(() => {
    setLoading(true);
    setError(false);
    const request = maViTri ? roomService.getByLocation(maViTri) : roomService.getAll();
    request
      .then(setRooms)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [maViTri]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 rounded-xl border border-gray-200 p-3">
            <div className="h-40 w-48 shrink-0 animate-pulse rounded-xl bg-gray-200" />
            <div className="flex flex-1 flex-col gap-2 py-1">
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">Không thể tải danh sách phòng. Vui lòng thử lại.</p>;
  }

  if (rooms.length === 0) {
    return <p className="text-sm text-gray-500">Không có phòng nào.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        Hơn {rooms.length} chỗ ở{dateRange}
      </p>
      <h1 className="text-2xl font-bold text-gray-900">
        Chỗ ở tại khu vực bạn đến
      </h1>
      <div className="flex flex-wrap gap-2">
        {filterBadges.map((badge) => (
          <button
            key={badge}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50"
          >
            {badge}
          </button>
        ))}
      </div>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
