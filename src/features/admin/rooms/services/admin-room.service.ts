import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { PhanTrang } from "@/shared/pagination/pagination.type";
import type { AdminRoom, RoomBody } from "../types/admin-room.type";

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

  create: (body: RoomBody): Promise<AdminRoom> =>
    axiosInstance.post(API_ENDPOINTS.rooms, body).then((res) => res.data.content),

  update: (id: number, body: RoomBody): Promise<AdminRoom> =>
    axiosInstance.put(`${API_ENDPOINTS.rooms}/${id}`, { id, ...body }).then((res) => res.data.content),

  uploadImage: (id: number, file: File): Promise<AdminRoom> => {
    const form = new FormData();
    form.append("formFile", file);
    return axiosInstance
      .post(`${API_ENDPOINTS.rooms}/upload-hinh-phong`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { maPhong: id },
      })
      .then((res) => res.data.content);
  },
};
