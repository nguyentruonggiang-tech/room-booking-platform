"use client";

import { useEffect } from "react";
import type { PhongViewModel } from "@/features/rooms/types/room.type";
import { locationService } from "@/features/locations/services/location.service";
import { useSearchStore } from "@/store/search.store";
import RoomCard from "./RoomCard";

function formatVNDate(dateStr: string): string {
  const [, month, day] = dateStr.split("-");
  return `${parseInt(day, 10)} tháng ${parseInt(month, 10)}`;
}

const filterBadges = ["Loại nơi ở", "Giá", "Đặt ngay", "Phòng và phòng ngủ", "Bộ lọc khác"];

type RoomListProps = {
  maViTri: number;
  rooms: PhongViewModel[];
  totalRow: number;
};

export default function RoomList({ maViTri, rooms, totalRow }: RoomListProps) {
  const { ngayDen, ngayDi, selectedLocation, setSelectedLocation } = useSearchStore();

  useEffect(() => {
    if (selectedLocation?.id === maViTri) return;
    locationService.getById(maViTri).then(setSelectedLocation).catch(() => {});
  }, [maViTri, selectedLocation, setSelectedLocation]);

  const dateRange =
    ngayDen && ngayDi
      ? ` · ${formatVNDate(ngayDen)} – ${formatVNDate(ngayDi)}`
      : "";

  if (totalRow === 0) {
    return <p className="text-sm text-gray-500">Không có phòng nào.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        Hơn {totalRow} chỗ ở{dateRange}
      </p>
      <h1 className="text-2xl font-bold text-gray-900">
        Chỗ ở tại khu vực bạn đến
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        {filterBadges.map((badge) => (
          <button
            key={badge}
            type="button"
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
