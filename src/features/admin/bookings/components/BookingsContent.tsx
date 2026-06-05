"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { adminBookingService } from "@/features/admin/bookings/services/admin-booking.service";
import Pagination from "@/shared/pagination/Pagination";
import BookingTable from "./BookingTable";
import type { AdminBooking } from "../types/admin-booking.type";
import { DEFAULT_PAGE_SIZE } from "@/constants/app.constants";

export default function BookingsContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageIndex = Number(searchParams.get("page") ?? "1");

  const [allBookings, setAllBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    adminBookingService
      .getAll()
      .then(setAllBookings)
      .catch(() => setError("Không thể tải danh sách đặt phòng."))
      .finally(() => setLoading(false));
  }, []);

  const totalRow = allBookings.length;
  const totalPage = Math.ceil(totalRow / DEFAULT_PAGE_SIZE);
  const pageOffset = (pageIndex - 1) * DEFAULT_PAGE_SIZE;
  const from = totalRow === 0 ? 0 : pageOffset + 1;
  const to = Math.min(pageIndex * DEFAULT_PAGE_SIZE, totalRow);

  const pageBookings = useMemo(
    () => allBookings.slice(pageOffset, pageOffset + DEFAULT_PAGE_SIZE),
    [allBookings, pageOffset],
  );

  async function handleDelete(booking: AdminBooking) {
    const { isConfirmed } = await Swal.fire({
      title: "Xóa đặt phòng?",
      text: `Đặt phòng #${booking.id} sẽ bị xóa vĩnh viễn.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });
    if (!isConfirmed) return;
    try {
      await adminBookingService.remove(booking.id);
      toast.success("Xóa đặt phòng thành công");
      setAllBookings((prev) => prev.filter((b) => b.id !== booking.id));
    } catch {
      toast.error("Xóa thất bại");
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đặt phòng</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Xem và quản lý tất cả đặt phòng trong hệ thống
        </p>
      </div>

      <BookingTable
        bookings={pageBookings}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        pageOffset={pageOffset}
      />

      {totalRow > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Hiển thị {from}–{to} trong {totalRow.toLocaleString("vi-VN")} đặt phòng
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
