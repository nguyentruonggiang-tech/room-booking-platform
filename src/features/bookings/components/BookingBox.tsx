"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { useSearchStore } from "@/store/search.store";
import { bookingSchema } from "@/features/bookings/schemas/booking.schema";
import { bookingService } from "@/features/bookings/services/booking.service";
import type { PhongViewModel } from "@/features/rooms/types/room.type";

const SERVICE_FEE = 350000;

function calcNights(from: string, to: string): number {
  if (!from || !to) return 0;
  const diff = new Date(to).getTime() - new Date(from).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + "₫";
}

type Props = {
  room: PhongViewModel;
};

export default function BookingBox({ room }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAuthStore();
  const { ngayDen, ngayDi, soKhach, setNgayDen, setNgayDi, setSoKhach } = useSearchStore();
  const [loading, setLoading] = useState(false);

  const nights = calcNights(ngayDen, ngayDi);
  const nightlyPrice = room.giaTien ?? 0;
  const subtotal = nights * nightlyPrice;
  const serviceFee = nights > 0 ? SERVICE_FEE : 0;
  const total = subtotal + serviceFee;

  async function handleBook() {
    if (!token || !user?.id) {
      toast.error("Vui lòng đăng nhập để đặt phòng");
      router.push(`/dang-nhap?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    const validated = bookingSchema.safeParse({ ngayDen, ngayDi, soLuongKhach: soKhach });
    if (!validated.success) {
      toast.error(validated.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      await bookingService.create({
        maPhong: room.id,
        ngayDen: new Date(ngayDen).toISOString(),
        ngayDi: new Date(ngayDi).toISOString(),
        soLuongKhach: soKhach,
        maNguoiDung: user.id!,
      });
      toast.success("Đặt phòng thành công!");
      setNgayDen("");
      setNgayDi("");
    } catch {
      toast.error("Đặt phòng thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sticky top-24 rounded-2xl border border-gray-200 p-6 shadow-lg">

      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-gray-900">
          {formatVND(nightlyPrice)}
          <span className="text-base font-normal text-gray-500"> / đêm</span>
        </p>
        <div className="flex items-center gap-1 text-sm">
          <Star size={13} className="fill-red-500 text-red-500" />
          <span className="font-medium text-gray-800">4.5</span>
          <span className="text-gray-400 underline">(24 đánh giá)</span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-300">
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          <div className="p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Nhận phòng</p>
            <input
              type="date"
              value={ngayDen}
              onChange={(e) => setNgayDen(e.target.value)}
              className="mt-1 w-full text-sm text-gray-800 outline-none [color-scheme:light]"
            />
          </div>
          <div className="p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Trả phòng</p>
            <input
              type="date"
              value={ngayDi}
              onChange={(e) => setNgayDi(e.target.value)}
              className="mt-1 w-full text-sm text-gray-800 outline-none [color-scheme:light]"
            />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-300 p-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Khách</p>
            <p className="mt-1 text-sm text-gray-800">{soKhach} khách</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoKhach(Math.max(1, soKhach - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              −
            </button>
            <span className="min-w-[16px] text-center text-sm text-gray-800">{soKhach}</span>
            <button
              type="button"
              onClick={() => setSoKhach(room.khach ? Math.min(room.khach, soKhach + 1) : soKhach + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleBook}
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Đang xử lý..." : "Đặt phòng"}
      </button>
      <p className="mt-2 text-center text-xs text-gray-500">Bạn vẫn chưa bị trừ tiền</p>

      <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 text-sm">
        {nights > 0 ? (
          <>
            <div className="flex justify-between text-gray-700">
              <span>{formatVND(nightlyPrice)} × {nights} đêm</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Phí dịch vụ</span>
              <span>{formatVND(serviceFee)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3 font-semibold text-gray-900">
              <span>Tổng</span>
              <span>{formatVND(total)}</span>
            </div>
          </>
        ) : (
          <p className="text-center text-xs text-gray-400">Chọn ngày để xem tổng giá</p>
        )}
      </div>
    </div>
  );
}
