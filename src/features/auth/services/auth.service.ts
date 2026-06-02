import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type {
  LoginRequestBody,
  LoginResponse,
  RegisterRequestBody,
  ThongTinNguoiDung,
} from "@/features/auth/types/auth.type";

export const authService = {
  register: (body: RegisterRequestBody): Promise<ThongTinNguoiDung> =>
    axiosInstance.post(`${API_ENDPOINTS.auth}/signup`, body).then((res) => res.data.content),

  login: (body: LoginRequestBody): Promise<LoginResponse> =>
    axiosInstance.post(`${API_ENDPOINTS.auth}/signin`, body).then((res) => res.data.content),
};
