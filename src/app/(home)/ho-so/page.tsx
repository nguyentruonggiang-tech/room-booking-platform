"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/features/users/services/user.service";
import { useAuthStore } from "@/store/auth.store";
import type { ThongTinNguoiDung } from "@/features/auth/types/auth.type";
import ProfileInfo from "@/features/users/components/ProfileInfo";
import ProfileForm from "@/features/users/components/ProfileForm";

type Tab = "ho-so" | "phong-da-thue";

const TABS: { id: Tab; label: string }[] = [
  { id: "ho-so", label: "Hồ sơ của tôi" },
  { id: "phong-da-thue", label: "Phòng đã thuê" },
];

const JOIN_LABEL = "Đã tham gia năm 2024";

export default function ProfilePage() {
  const router = useRouter();
  const authUser = useAuthStore((s) => s.user);
  const [profile, setProfile] = useState<ThongTinNguoiDung | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("ho-so");

  useEffect(() => {
    if (!authUser?.id) {
      router.replace("/dang-nhap?redirect=/ho-so");
      return;
    }
    userService
      .getById(authUser.id)
      .then(setProfile)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [authUser?.id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="h-72 animate-pulse rounded-2xl bg-gray-100" />
          <div className="h-96 animate-pulse rounded-2xl bg-gray-100" />
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <p className="text-sm text-red-500">Không thể tải thông tin cá nhân. Vui lòng thử lại.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <ProfileInfo
          user={profile}
          onAvatarUpdate={(url) => setProfile((prev) => prev ? { ...prev, avatar: url } : prev)}
        />

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Xin chào, tôi là {profile.name}</h1>
            <p className="mt-1 text-sm text-gray-500">{JOIN_LABEL}</p>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex gap-6">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-gray-900 text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "ho-so" && <ProfileForm user={profile} />}

          {activeTab === "phong-da-thue" && (
            <p className="text-sm text-gray-400">Chưa có phòng nào được thuê.</p>
          )}
        </div>
      </div>
    </main>
  );
}
