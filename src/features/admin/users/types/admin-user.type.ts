import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";

export type AdminUser = Omit<ThongTinNguoiDung, "password" | "gender"> & {
  id: number;
  role: string;
  gender: boolean | null;
};

export type UserCreateBody = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

export type UserUpdateBody = Omit<UserCreateBody, "password"> & { id: number };

