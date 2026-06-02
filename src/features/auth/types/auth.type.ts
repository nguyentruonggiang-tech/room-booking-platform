export type ThongTinNguoiDung = {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role?: string;
};

export type RegisterRequestBody = Pick<
  ThongTinNguoiDung,
  "name" | "email" | "password" | "phone" | "birthday" | "gender"
>;

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: ThongTinNguoiDung;
};
