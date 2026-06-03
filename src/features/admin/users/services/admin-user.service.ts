import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { PhanTrang } from "@/shared/pagination/pagination.type";
import type { AdminUser } from "../types/admin-user.type";

export const adminUserService = {
  getPaged: (
    pageIndex = 1,
    pageSize = 10,
    keyword = "",
  ): Promise<PhanTrang<AdminUser>> =>
    axiosInstance
      .get(`${API_ENDPOINTS.users}/phan-trang-tim-kiem`, {
        params: { pageIndex, pageSize, keyword },
      })
      .then((res) => res.data.content),
};
