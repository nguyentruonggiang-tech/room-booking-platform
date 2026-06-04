"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  toRegisterRequestBody,
  type RegisterFormValues,
} from "@/features/auth/schemas/auth.schema";
import { authService } from "@/features/auth/services/auth.service";
import { FormField, inputCls } from "./FormField";

const BG_IMAGE_REGISTER =
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80";

export default function RegisterForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitError(null);
    try {
      await authService.register(toRegisterRequestBody(values));
      toast.success("Đăng ký thành công! Đang chuyển đến trang đăng nhập...");
      setTimeout(() => router.push("/dang-nhap"), 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.content || error.response?.data?.message || "Không thể tạo tài khoản. Vui lòng thử lại.";
        setSubmitError(errorMsg);
      } else {
        setSubmitError("Không thể tạo tài khoản. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden lg:block lg:w-2/5">
        <img src={BG_IMAGE_REGISTER} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-surface-dark/60" />
      </div>

      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Đăng ký</h1>

          {submitError && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <FormField label="Họ tên" error={errors.name?.message}>
              <input {...register("name")} placeholder="Nhập họ tên" autoComplete="name" className={inputCls(!!errors.name)} />
            </FormField>

            <FormField label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" placeholder="Nhập email" autoComplete="email" className={inputCls(!!errors.email)} />
            </FormField>

            <FormField label="Số điện thoại" error={errors.phone?.message}>
              <input {...register("phone")} placeholder="Nhập số điện thoại" autoComplete="tel" className={inputCls(!!errors.phone)} />
            </FormField>

            <FormField label="Mật khẩu" error={errors.password?.message}>
              <input {...register("password")} type="password" placeholder="Nhập mật khẩu" autoComplete="new-password" className={inputCls(!!errors.password)} />
            </FormField>

            <FormField label="Nhập lại mật khẩu" error={errors.confirmPassword?.message}>
              <input {...register("confirmPassword")} type="password" placeholder="Nhập lại mật khẩu" autoComplete="new-password" className={inputCls(!!errors.confirmPassword)} />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Ngày sinh" error={errors.birthday?.message}>
                <input {...register("birthday")} type="date" className={inputCls(!!errors.birthday)} />
              </FormField>

              <FormField label="Giới tính" error={errors.gender?.message}>
                <select {...register("gender")} className={inputCls(!!errors.gender)}>
                  <option value="">Chọn giới tính</option>
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </FormField>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
              >
                {isSubmitting ? "Đang tạo tài khoản..." : "Đăng ký"}
              </button>
              <Link
                href="/dang-nhap"
                className="flex-1 rounded-xl border border-gray-300 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Đăng nhập →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
