import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";

export type AdminUser = Omit<ThongTinNguoiDung, "password" | "gender"> & {
  id: number;
  role: string;
  gender: boolean | null;
};

