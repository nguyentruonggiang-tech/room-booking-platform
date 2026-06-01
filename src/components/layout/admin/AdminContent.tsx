"use client";

import type { PropsWithChildren } from "react";
import { ConfigProvider, Layout } from "antd";
import { adminContentTheme, ADMIN_CONTENT_BG } from "./admin-theme";

const { Content } = Layout;

export default function AdminContent({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={adminContentTheme}>
      <Content style={{ padding: 24, background: ADMIN_CONTENT_BG }}>{children}</Content>
    </ConfigProvider>
  );
}
