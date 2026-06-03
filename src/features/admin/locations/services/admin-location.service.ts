import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { PhanTrang } from "@/shared/pagination/pagination.type";
import type { AdminLocation, LocationBody } from "../types/admin-location.type";

export const adminLocationService = {
  getPaged: (
    pageIndex = 1,
    pageSize = 10,
    keyword = "",
  ): Promise<PhanTrang<AdminLocation>> =>
    axiosInstance
      .get(`${API_ENDPOINTS.locations}/phan-trang-tim-kiem`, {
        params: { pageIndex, pageSize, keyword },
      })
      .then((res) => res.data.content),

  create: (body: LocationBody): Promise<AdminLocation> =>
    axiosInstance.post(API_ENDPOINTS.locations, body).then((res) => res.data.content),

  update: (id: number, body: LocationBody): Promise<AdminLocation> =>
    axiosInstance
      .put(`${API_ENDPOINTS.locations}/${id}`, { id, ...body })
      .then((res) => res.data.content),

  uploadImage: (id: number, file: File): Promise<AdminLocation> => {
    const form = new FormData();
    form.append("formFile", file);
    return axiosInstance
      .post(`${API_ENDPOINTS.locations}/upload-hinh-vitri`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { maViTri: id },
      })
      .then((res) => res.data.content);
  },
};
