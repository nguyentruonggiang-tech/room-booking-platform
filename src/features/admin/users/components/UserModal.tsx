"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import { adminUserService } from "../services/admin-user.service";
import { userFormSchema, type UserFormValues } from "../schemas/user-form.schema";
import type { AdminUser } from "../types/admin-user.type";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editTarget: AdminUser | null;
};

const ROLES = ["ADMIN", "USER"];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary";

export default function UserModal({ open, onClose, editTarget, onSuccess }: Props) {
  const isEdit = editTarget !== null;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { gender: true, role: "USER" },
  });

  useEffect(() => {
    if (!open) return;
    if (editTarget) {
      reset({
        name: editTarget.name ?? "",
        email: editTarget.email ?? "",
        phone: editTarget.phone ?? "",
        birthday: editTarget.birthday ?? "",
        gender: editTarget.gender ?? true,
        role: editTarget.role ?? "USER",
      });
    } else {
      reset({ gender: true, role: "USER", password: "" });
    }
  }, [open, editTarget]);

  async function onSubmit(values: UserFormValues) {
    if (!isEdit && (!values.password || values.password.length < 6)) {
      setError("password", { message: "Mật khẩu tối thiểu 6 ký tự" });
      return;
    }

    try {
      if (isEdit) {
        const { password: _, ...rest } = values;
        await adminUserService.update(editTarget.id, { id: editTarget.id, ...rest });
        toast.success("Cập nhật người dùng thành công");
      } else {
        await adminUserService.create({ ...values, password: values.password! });
        toast.success("Thêm người dùng thành công");
      }
      onSuccess();
      onClose();
    } catch {
      toast.error(isEdit ? "Cập nhật thất bại" : "Thêm thất bại");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tên</label>
            <input {...register("name")} placeholder="Nguyễn Văn A" className={inputClass} />
            <FieldError message={errors.name?.message} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input {...register("email")} type="email" placeholder="example@email.com" className={inputClass} />
            <FieldError message={errors.email?.message} />
          </div>

          {!isEdit && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Mật khẩu</label>
              <input {...register("password")} type="password" placeholder="Tối thiểu 6 ký tự" className={inputClass} />
              <FieldError message={errors.password?.message} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Số điện thoại</label>
              <input {...register("phone")} placeholder="0901234567" className={inputClass} />
              <FieldError message={errors.phone?.message} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Ngày sinh</label>
              <input {...register("birthday")} type="date" className={inputClass} />
              <FieldError message={errors.birthday?.message} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Giới tính</label>
              <select
                {...register("gender", { setValueAs: (v: string) => v === "true" })}
                className={inputClass}
              >
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Vai trò</label>
              <select {...register("role")} className={inputClass}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <FieldError message={errors.role?.message} />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-admin-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? "Đang lưu..." : isEdit ? "Lưu thay đổi" : "Thêm người dùng"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
