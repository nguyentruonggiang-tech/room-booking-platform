"use client";

import { useRef, useState } from "react";
import { Award, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/features/users/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";

function getInitials(name: string): string {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type Props = {
  user: ThongTinNguoiDung;
  onAvatarUpdate: (avatarUrl: string) => void;
};

export default function ProfileInfo({ user, onAvatarUpdate }: Props) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgError, setImgError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const updated = await userService.uploadAvatar(file);
      if (token) setAuth({ ...user, avatar: updated.avatar }, token);
      if (updated.avatar) onAvatarUpdate(updated.avatar);
      toast.success("Cập nhật ảnh thành công!");
    } catch {
      toast.error("Cập nhật ảnh thất bại. Vui lòng thử lại.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col items-center gap-3">
        {user.avatar && !imgError ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-28 w-28 rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand text-3xl font-semibold text-white">
            {getInitials(user.name)}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="text-sm font-medium text-gray-900 underline disabled:opacity-50"
        >
          {uploading ? "Đang tải lên..." : "Cập nhật ảnh"}
        </button>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-6">
        <ShieldCheck size={28} className="mb-3 text-gray-900" />
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Xác nhận danh tính</h3>
        <p className="text-sm leading-relaxed text-gray-500">
          Xác nhận danh tính của bạn với huy hiệu xác minh danh tính.
        </p>
        <button
          type="button"
          className="mt-4 flex items-center gap-2 rounded-lg border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
        >
          <Award size={16} />
          Nhận huy hiệu
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-gray-100 pt-6 text-sm text-gray-700">
        <span className="text-base font-semibold text-gray-900">{user.name.trim().split(" ").at(-1)} đã xác nhận</span>
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="shrink-0 text-brand" />
          <span>Đã xác nhận email</span>
        </div>
      </div>
    </div>
  );
}
