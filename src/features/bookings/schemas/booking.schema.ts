import { z } from "zod";

export const bookingSchema = z
  .object({
    ngayDen: z.string().min(1, "Vui lòng chọn ngày nhận phòng"),
    ngayDi: z.string().min(1, "Vui lòng chọn ngày trả phòng"),
    soLuongKhach: z.number().min(1, "Tối thiểu 1 khách"),
  })
  .refine((d) => new Date(d.ngayDi) > new Date(d.ngayDen), {
    message: "Ngày trả phòng phải sau ngày nhận phòng",
    path: ["ngayDi"],
  });
