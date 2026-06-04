export type ThongTinNguoiDung = {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role?: string;
  avatar?: string;
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
  token: string;
  user: ThongTinNguoiDung;
};
