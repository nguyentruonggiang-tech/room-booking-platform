"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { bookingService } from "@/features/bookings/services/booking.service";
import { roomService } from "@/features/rooms/services/room.service";
import { getPaginationItems } from "@/shared/pagination/getPaginationItems";
import { formatDate } from "@/shared/utils/date";
import { AMENITIES } from "@/shared/constants/amenities";
import type { DatPhongViewModel } from "@/features/bookings/types/booking.type";
import type { PhongViewModel } from "@/features/rooms/types/room.type";

const PAGE_SIZE = 5;

const FALLBACK_IMG = "https://placehold.co/192x160/f3f4f6/9ca3af?text=No+Image";
const BTN_BASE = "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm transition-colors";

type BookingItem = {
  booking: DatPhongViewModel;
  room: PhongViewModel;
};

type Props = {
  userId: number;
};

export default function BookingHistory({ userId }: Props) {
  const [items, setItems] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    bookingService
      .getByUser(userId)
      .then((bookings) =>
        Promise.allSettled(
          bookings.map(async (booking) => {
            const room = await roomService.getById(booking.maPhong);
            return { booking, room };
          })
        )
      )
      .then((results) => {
        setItems(
          results
            .filter((result): result is PromiseFulfilledResult<BookingItem> => result.status === "fulfilled")
            .map((result) => result.value)
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">Không thể tải lịch sử đặt phòng. Vui lòng thử lại.</p>;
  }

  if (items.length === 0) {
    return <p className="text-sm text-gray-400">Bạn chưa có đặt phòng nào.</p>;
  }

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const paginationItems = getPaginationItems({ page, totalPages });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Phòng đã thuê</h2>
      <div className="flex flex-col gap-3">
        {pageItems.map(({ booking, room }) => (
          <div key={booking.id} className="flex gap-4 rounded-xl border border-gray-200 p-3">
            <img
              src={room.hinhAnh}
              alt={room.tenPhong}
              className="h-40 w-48 shrink-0 rounded-xl object-cover"
              onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
            />
            <div className="flex flex-1 flex-col justify-between py-1">
              <div>
                <p className="text-lg font-semibold text-gray-900">{room.tenPhong}</p>
                <p className="mt-1 text-base text-gray-500">
                  {room.khach} khách · {room.phongNgu} phòng ngủ · {room.giuong} giường · {room.phongTam} phòng tắm
                </p>
                <div className="mt-2 grid grid-cols-3 gap-x-3 gap-y-2">
                  {AMENITIES.filter(({ key }) => room[key] === true).map(({ key, icon: Icon, bg, color, label }) => (
                    <div key={key} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                        <Icon size={15} className={color} />
                      </div>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CalendarDays size={14} />
                  {formatDate(booking.ngayDen)} → {formatDate(booking.ngayDi)}
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {room.giaTien != null
                    ? <>{room.giaTien.toLocaleString("vi-VN")}₫<span className="font-normal text-gray-500"> / đêm</span></>
                    : <span className="text-gray-500">Liên hệ</span>
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-end">
          <ul className="flex flex-wrap items-center gap-1">
            <li>
              {page <= 1
                ? <span className={`${BTN_BASE} cursor-not-allowed border-gray-200 text-gray-400`}><ChevronLeft className="h-4 w-4" /></span>
                : <button type="button" onClick={() => setPage(page - 1)} className={`${BTN_BASE} border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50`}><ChevronLeft className="h-4 w-4" /></button>
              }
            </li>
            {paginationItems.map((item, i) =>
              item.type !== "page"
                ? <li key={`ellipsis-${i}`}><span className="inline-flex h-9 min-w-9 items-center justify-center px-1 text-sm text-gray-500">…</span></li>
                : <li key={item.page}>
                    {item.page === page
                      ? <span className={`${BTN_BASE} border-brand bg-brand font-medium text-white`}>{item.page}</span>
                      : <button type="button" onClick={() => setPage(item.page)} className={`${BTN_BASE} border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50`}>{item.page}</button>
                    }
                  </li>
            )}
            <li>
              {page >= totalPages
                ? <span className={`${BTN_BASE} cursor-not-allowed border-gray-200 text-gray-400`}><ChevronRight className="h-4 w-4" /></span>
                : <button type="button" onClick={() => setPage(page + 1)} className={`${BTN_BASE} border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50`}><ChevronRight className="h-4 w-4" /></button>
              }
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
