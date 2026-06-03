"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { adminBookingService } from "@/features/admin/bookings/services/admin-booking.service";
import BookingTable from "./BookingTable";
import type { AdminBooking } from "../types/admin-booking.type";

export default function BookingsContent() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    adminBookingService
      .getAll()
      .then(setBookings)
      .catch(() => setError("Không thể tải danh sách đặt phòng."))
      .finally(() => setLoading(false));
  }, []);

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
      setBookings((prev) => prev.filter((b) => b.id !== booking.id));
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

      <BookingTable bookings={bookings} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  );
}
