import { z } from "zod";

export const roomSchema = z.object({
  tenPhong: z.string().min(1, "Tên phòng là bắt buộc"),
  khach: z.number().min(1, "Tối thiểu 1 khách"),
  phongNgu: z.number().min(0),
  giuong: z.number().min(0),
  phongTam: z.number().min(0),
  giaTien: z.number().min(1, "Giá phải lớn hơn 0"),
  maViTri: z.number().min(1, "Mã vị trí là bắt buộc"),
  moTa: z.string(),
  mayGiat: z.boolean(),
  banLa: z.boolean(),
  tivi: z.boolean(),
  dieuHoa: z.boolean(),
  wifi: z.boolean(),
  bep: z.boolean(),
  doXe: z.boolean(),
  hoBoi: z.boolean(),
  banUi: z.boolean(),
});

export type RoomValues = z.infer<typeof roomSchema>;
