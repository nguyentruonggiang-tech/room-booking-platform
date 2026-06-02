import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { BinhLuanViewModel, CreateCommentPayload } from "@/features/comments/types/comment.type";

export const commentService = {
  getByRoom: (maPhong: number): Promise<BinhLuanViewModel[]> =>
    axiosInstance
      .get(`${API_ENDPOINTS.comments}/lay-binh-luan-theo-phong/${maPhong}`)
      .then((res) => res.data.content),

  create: (payload: CreateCommentPayload, token: string): Promise<BinhLuanViewModel> =>
    axiosInstance
      .post(API_ENDPOINTS.comments, payload, { headers: { token } })
      .then((res) => res.data.content),
};
