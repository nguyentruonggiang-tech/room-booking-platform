import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { PhanTrang } from "@/shared/pagination/pagination.type";
import type { AdminRoom } from "../types/admin-room.type";

export const adminRoomService = {
  getPaged: (
    pageIndex = 1,
    pageSize = 10,
    keyword = "",
  ): Promise<PhanTrang<AdminRoom>> =>
    axiosInstance
      .get(`${API_ENDPOINTS.rooms}/phan-trang-tim-kiem`, {
        params: { pageIndex, pageSize, keyword },
      })
      .then((res) => res.data.content),
};
