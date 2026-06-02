import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";

export const userService = {
  getById: (id: number): Promise<ThongTinNguoiDung> =>
    axiosInstance.get(`${API_ENDPOINTS.users}/${id}`).then((res) => res.data.content),
};
