"use client";

import { Layout, Space, Typography, theme } from "antd";

const { Footer } = Layout;
const { Text, Link } = Typography;

export default function AdminFooter() {
  const { token } = theme.useToken();

  return (
    <Footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        paddingBlock: 16,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Text type="secondary" style={{ fontSize: 13 }}>
        © 2026 Room Booking Admin. Hệ thống quản trị đặt phòng.
      </Text>

      <Space size="large">
        <Link type="secondary" style={{ fontSize: 13 }}>
          Chính sách
        </Link>
        <Link type="secondary" style={{ fontSize: 13 }}>
          Điều khoản
        </Link>
        <Link type="secondary" style={{ fontSize: 13 }}>
          API
        </Link>
      </Space>
    </Footer>
  );
}
