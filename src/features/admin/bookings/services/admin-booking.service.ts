import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { AdminBooking } from "../types/admin-booking.type";

export const adminBookingService = {
  getAll: (): Promise<AdminBooking[]> =>
    axiosInstance.get(API_ENDPOINTS.bookings).then((res) => res.data.content),

  remove: (id: number): Promise<void> =>
    axiosInstance.delete(`${API_ENDPOINTS.bookings}/${id}`).then((res) => res.data.content),
};
