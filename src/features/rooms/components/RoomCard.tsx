"use client";

import Link from "next/link";
import type { PhongViewModel } from "@/features/rooms/types/room.type";

const FALLBACK_IMG = "https://placehold.co/192x160/f3f4f6/9ca3af?text=No+Image";

type Props = {
  room: PhongViewModel;
};

export default function RoomCard({ room }: Props) {
  return (
    <Link href={`/phong-thue/${room.id}`} className="flex gap-4 rounded-xl border border-gray-200 p-3 transition-shadow hover:shadow-md">
      <img
        src={room.hinhAnh}
        alt={room.tenPhong}
        className="h-40 w-48 shrink-0 rounded-xl object-cover"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
      />
      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <p className="font-semibold text-gray-900">{room.tenPhong}</p>
          <p className="mt-1 text-sm text-gray-500">
            {room.khach} khách · {room.phongNgu} phòng ngủ · {room.giuong} giường · {room.phongTam} phòng tắm
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-gray-400">{room.moTa}</p>
        </div>
        <p className="text-sm font-semibold text-gray-900 text-right">
          {room.giaTien != null
            ? <>{room.giaTien.toLocaleString("vi-VN")}₫<span className="font-normal text-gray-500"> / đêm</span></>
            : <span className="text-gray-500">Liên hệ</span>
          }
        </p>
      </div>
    </Link>
  );
}
