import { z } from "zod";
import type { RegisterRequestBody } from "@/features/auth/types/auth.type";

const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Vui lòng nhập họ tên"),
    email: z.string().trim().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
    phone: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập số điện thoại")
      .refine((v) => vnPhoneRegex.test(v.replace(/\s/g, "")), "Số điện thoại không hợp lệ"),
    password: z.string().min(1, "Vui lòng nhập mật khẩu"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
    birthday: z
      .string()
      .min(1, "Vui lòng chọn ngày sinh")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh không hợp lệ"),
    gender: z.enum(["true", "false"], { message: "Vui lòng chọn giới tính" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function toRegisterRequestBody(values: RegisterFormValues): RegisterRequestBody {
  const [year, month, day] = values.birthday.split("-");
  return {
    name: values.name,
    email: values.email,
    password: values.password,
    phone: values.phone.replace(/\s/g, ""),
    birthday: `${day}-${month}-${year}`,
    gender: values.gender === "true",
  };
}

