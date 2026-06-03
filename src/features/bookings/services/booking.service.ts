import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { DatPhongPayload, DatPhongViewModel } from "@/features/bookings/types/booking.type";

export const bookingService = {
  create: (payload: DatPhongPayload, token: string): Promise<void> =>
    axiosInstance.post(API_ENDPOINTS.bookings, payload, { headers: { token } }),

  getByUser: (userId: number): Promise<DatPhongViewModel[]> =>
    axiosInstance
      .get(`${API_ENDPOINTS.bookings}/lay-theo-nguoi-dung/${userId}`)
      .then((res) => res.data.content),
};
