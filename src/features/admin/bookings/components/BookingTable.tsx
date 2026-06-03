import { Trash2 } from "lucide-react";
import type { AdminBooking } from "../types/admin-booking.type";

type Props = {
  bookings: AdminBooking[];
  loading: boolean;
  error: string | null;
  onDelete: (booking: AdminBooking) => void;
};

const COLUMNS = ["STT", "Mã phòng", "Ngày đến", "Ngày đi", "Số khách", "Mã người dùng", "Thao tác"];
const SKELETON_ROWS = 8;

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function TableHead() {
  return (
    <thead>
      <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {COLUMNS.map((col) => (
          <th key={col} className="px-6 py-3 text-left">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default function BookingTable({ bookings, loading, error, onDelete }: Props) {
  if (loading) return <TableSkeleton />;

  if (error)
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center text-sm text-gray-400">
        Chưa có đặt phòng nào
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[700px] text-sm">
        <TableHead />
        <tbody className="divide-y divide-gray-100">
          {bookings.map((booking, idx) => (
            <tr key={booking.id} className="hover:bg-gray-50/60">
              <td className="px-6 py-4 text-gray-400">{idx + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{booking.maPhong}</td>
              <td className="px-6 py-4 text-gray-600">{formatDate(booking.ngayDen)}</td>
              <td className="px-6 py-4 text-gray-600">{formatDate(booking.ngayDi)}</td>
              <td className="px-6 py-4 text-gray-600">{booking.soLuongKhach}</td>
              <td className="px-6 py-4 text-gray-600">{booking.maNguoiDung}</td>
              <td className="px-6 py-4">
                <button
                  title="Xóa"
                  onClick={() => onDelete(booking)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[700px] text-sm">
        <TableHead />
        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: SKELETON_ROWS }).map((_, idx) => (
            <tr key={idx}>
              {COLUMNS.map((col) => (
                <td key={col} className="px-6 py-4">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
