"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  toLoginRequestBody,
  type LoginFormValues,
} from "@/features/auth/schemas/auth.schema";
import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { FormField, inputCls } from "./FormField";

const BG_IMAGE_LOGIN =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80";

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);
    try {
      const { token, user } = await authService.login(toLoginRequestBody(values));
      setAuth(user, token);
      toast.success("Đăng nhập thành công!");
      setTimeout(() => {
        router.push(user.role === "ADMIN" ? "/admin" : "/");
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError(error.response?.data?.content || error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      } else {
        setSubmitError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Ảnh trái */}
      <div className="relative hidden lg:block lg:w-2/5">
        <img src={BG_IMAGE_LOGIN} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-surface-dark/60" />
      </div>

      {/* Form phải */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Đăng nhập</h1>

          {submitError && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <FormField label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" placeholder="Nhập email" autoComplete="email" className={inputCls(!!errors.email)} />
            </FormField>

            <FormField label="Mật khẩu" error={errors.password?.message}>
              <input {...register("password")} type="password" placeholder="Nhập mật khẩu" autoComplete="current-password" className={inputCls(!!errors.password)} />
            </FormField>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
              >
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
              <Link
                href="/dang-ky"
                className="flex-1 rounded-xl border border-gray-300 py-3 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Đăng ký →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

