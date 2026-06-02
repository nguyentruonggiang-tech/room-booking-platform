import { Building2, Calendar, MapPin, Users, type LucideIcon } from "lucide-react";

export type AdminMenuItem = {
  path: string;
  label: string;
  icon: LucideIcon;
};

export const adminMenuList: AdminMenuItem[] = [
  { path: "/admin/nguoi-dung", label: "Người dùng", icon: Users },
  { path: "/admin/vi-tri", label: "Vị trí", icon: MapPin },
  { path: "/admin/phong-thue", label: "Phòng thuê", icon: Building2 },
  { path: "/admin/dat-phong", label: "Đặt phòng", icon: Calendar },
];
