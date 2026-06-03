import { z } from "zod";

export const locationSchema = z.object({
  tenViTri: z.string().min(1, "Tên vị trí là bắt buộc"),
  tinhThanh: z.string().min(1, "Tỉnh/Thành là bắt buộc"),
  quocGia: z.string().min(1, "Quốc gia là bắt buộc"),
});

export type LocationValues = z.infer<typeof locationSchema>;
