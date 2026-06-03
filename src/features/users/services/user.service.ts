import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";
import type { CapNhatNguoiDung } from "@/features/users/types/user.type";

export const userService = {
  getById: (id: number): Promise<ThongTinNguoiDung> =>
    axiosInstance.get(`${API_ENDPOINTS.users}/${id}`).then((res) => res.data.content),

  update: (id: number, body: CapNhatNguoiDung): Promise<ThongTinNguoiDung> =>
    axiosInstance.put(`${API_ENDPOINTS.users}/${id}`, body).then((res) => res.data.content),

  uploadAvatar: (file: File): Promise<ThongTinNguoiDung> => {
    const form = new FormData();
    form.append("formFile", file);
    return axiosInstance
      .post(API_ENDPOINTS.uploadAvatar, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data.content);
  },
};
