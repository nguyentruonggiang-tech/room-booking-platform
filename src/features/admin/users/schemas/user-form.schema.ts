import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  email: z.string().min(1, "Email là bắt buộc").email({ message: "Email không hợp lệ" }),
  password: z.string().optional(),
  phone: z.string().min(1, "Số điện thoại là bắt buộc"),
  birthday: z.string().min(1, "Ngày sinh là bắt buộc"),
  gender: z.boolean(),
  role: z.string().min(1, "Vai trò là bắt buộc"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
