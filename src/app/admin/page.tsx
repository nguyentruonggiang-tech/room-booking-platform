import Link from "next/link";
import { Users, MapPin, Building2, Calendar } from "lucide-react";

const CARDS = [
  { href: "/admin/nguoi-dung", label: "Người dùng", icon: Users, color: "bg-violet-500" },
  { href: "/admin/vi-tri", label: "Vị trí", icon: MapPin, color: "bg-blue-500" },
  { href: "/admin/phong-thue", label: "Phòng thuê", icon: Building2, color: "bg-emerald-500" },
  { href: "/admin/dat-phong", label: "Đặt phòng", icon: Calendar, color: "bg-orange-500" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
        <p className="mt-0.5 text-sm text-gray-500">Chọn mục cần quản lý</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {CARDS.map(({ href, label, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
