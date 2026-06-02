import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { PhongViewModel } from "@/features/rooms/types/room.type";

export const roomService = {
  getAll: (): Promise<PhongViewModel[]> =>
    axiosInstance.get(API_ENDPOINTS.rooms).then((res) => res.data.content),

  getByLocation: (maViTri: number): Promise<PhongViewModel[]> =>
    axiosInstance
      .get(`${API_ENDPOINTS.rooms}/lay-phong-theo-vi-tri`, { params: { maViTri } })
      .then((res) => res.data.content),

  getById: (id: number): Promise<PhongViewModel> =>
    axiosInstance.get(`${API_ENDPOINTS.rooms}/${id}`).then((res) => res.data.content),
};
