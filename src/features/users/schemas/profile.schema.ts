import { z } from "zod";

const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên"),
  email: z.string().trim().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại")
    .refine((v) => vnPhoneRegex.test(v.replace(/\s/g, "")), "Số điện thoại không hợp lệ"),
  birthday: z
    .string()
    .min(1, "Vui lòng chọn ngày sinh")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh không hợp lệ"),
  gender: z.enum(["true", "false"], { message: "Vui lòng chọn giới tính" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
