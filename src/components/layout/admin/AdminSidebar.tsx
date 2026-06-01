"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppstoreOutlined, QuestionCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Typography, theme } from "antd";
import { adminMenuList } from "./admin-menu";
import { ADMIN_HEADER_HEIGHT } from "./admin-theme";

const { Text } = Typography;

const bottomMenuList = [
  { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
  { key: "support", icon: <QuestionCircleOutlined />, label: "Hỗ trợ" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { token } = theme.useToken();

  const activeMenu = adminMenuList.find((menu) => pathname.startsWith(menu.path));

  const menuItems = adminMenuList.map((menu) => ({
    key: menu.path,
    icon: menu.icon,
    label: <Link href={menu.path}>{menu.label}</Link>,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: ADMIN_HEADER_HEIGHT,
          paddingInline: 20,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: token.borderRadius,
            background: token.colorPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 18,
          }}
        >
          <AppstoreOutlined />
        </div>
        <div>
          <Text style={{ color: token.colorText, fontSize: 16, fontWeight: 700, display: "block" }}>
            Quản trị
          </Text>
          <Text style={{ color: token.colorTextTertiary, fontSize: 11, letterSpacing: 1 }}>
            HỆ THỐNG ĐẶT PHÒNG
          </Text>
        </div>
      </div>

      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={activeMenu ? [activeMenu.path] : []}
        items={menuItems}
        style={{ background: "transparent", borderInlineEnd: 0, flex: 1 }}
      />

      <Menu
        mode="inline"
        theme="dark"
        selectable={false}
        items={bottomMenuList}
        style={{
          background: "transparent",
          borderInlineEnd: 0,
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          paddingBlock: 12,
        }}
      />
    </div>
  );
}
