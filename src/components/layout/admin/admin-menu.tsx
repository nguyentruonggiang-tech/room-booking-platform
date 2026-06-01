import type { ReactNode } from "react";
import { BankOutlined, CalendarOutlined, EnvironmentOutlined, TeamOutlined } from "@ant-design/icons";

export type AdminMenuItem = {
  path: string;
  label: string;
  icon: ReactNode;
};

export const adminMenuList: AdminMenuItem[] = [
  { path: "/admin/nguoi-dung", label: "Người dùng", icon: <TeamOutlined /> },
  { path: "/admin/vi-tri", label: "Vị trí", icon: <EnvironmentOutlined /> },
  { path: "/admin/phong-thue", label: "Phòng thuê", icon: <BankOutlined /> },
  { path: "/admin/dat-phong", label: "Đặt phòng", icon: <CalendarOutlined /> },
];
