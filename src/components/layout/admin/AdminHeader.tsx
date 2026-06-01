"use client";

import { usePathname } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input, Layout, Space, Typography, theme } from "antd";
import { adminMenuList } from "./admin-menu";

const { Header } = Layout;
const { Title } = Typography;

export default function AdminHeader() {
  const pathname = usePathname();
  const { token } = theme.useToken();

  const activeMenu = adminMenuList.find((menu) => pathname.startsWith(menu.path));
  const pageTitle = activeMenu?.label ?? "Tổng quan";

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        paddingInline: 24,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Title level={5} style={{ margin: 0, color: token.colorText, whiteSpace: "nowrap" }}>
        {pageTitle}
      </Title>

      <Space size="middle">
        <Input.Search placeholder="Tìm kiếm..." allowClear style={{ width: 280 }} />
        <Avatar shape="square" icon={<UserOutlined />} style={{ background: token.colorPrimary }} />
      </Space>
    </Header>
  );
}
