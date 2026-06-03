"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormValues } from "@/features/users/schemas/profile.schema";
import { userService } from "@/features/users/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";
import { FormField, inputCls } from "@/features/auth/components/FormField";

function toDateInput(birthday: string): string {
  if (!birthday) return "";
  const isoMatch = birthday.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  const vnMatch = birthday.match(/^(\d{2})-(\d{2})-(\d{4})/);
  if (vnMatch) return `${vnMatch[3]}-${vnMatch[2]}-${vnMatch[1]}`;
  return "";
}

function toApiBirthday(dateInput: string): string {
  const [year, month, day] = dateInput.split("-");
  return `${day}-${month}-${year}`;
}

type Props = {
  user: ThongTinNguoiDung;
};

export default function ProfileForm({ user }: Props) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: toDateInput(user.birthday),
      gender: user.gender ? "true" : "false",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setSubmitError(null);
    try {
      const updated = await userService.update(user.id!, {
        id: user.id!,
        name: values.name,
        email: values.email,
        phone: values.phone.replace(/\s/g, ""),
        birthday: toApiBirthday(values.birthday),
        gender: values.gender === "true",
        role: user.role ?? "USER",
      });
      if (token) setAuth({ ...user, ...updated }, token);
      toast.success("Cập nhật hồ sơ thành công!");
    } catch {
      setSubmitError("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">Chỉnh sửa hồ sơ</h2>

      {submitError && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField label="Họ tên" error={errors.name?.message}>
          <input {...register("name")} placeholder="Nhập họ tên" className={inputCls(!!errors.name)} />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <input {...register("email")} type="email" placeholder="Nhập email" className={inputCls(!!errors.email)} />
        </FormField>

        <FormField label="Số điện thoại" error={errors.phone?.message}>
          <input {...register("phone")} placeholder="Nhập số điện thoại" className={inputCls(!!errors.phone)} />
        </FormField>

        <FormField label="Ngày sinh" error={errors.birthday?.message}>
          <input {...register("birthday")} type="date" className={`${inputCls(!!errors.birthday)} [color-scheme:light]`} />
        </FormField>

        <FormField label="Giới tính" error={errors.gender?.message}>
          <select {...register("gender")} className={inputCls(!!errors.gender)}>
            <option value="true">Nam</option>
            <option value="false">Nữ</option>
          </select>
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}
