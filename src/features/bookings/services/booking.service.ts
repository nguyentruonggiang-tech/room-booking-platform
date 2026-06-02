import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { DatPhongPayload } from "@/features/bookings/types/booking.type";

export const bookingService = {
  create: (payload: DatPhongPayload, token: string): Promise<void> =>
    axiosInstance.post(API_ENDPOINTS.bookings, payload, { headers: { token } }),
};
