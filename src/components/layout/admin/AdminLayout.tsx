"use client";

import type { PropsWithChildren } from "react";
import { ConfigProvider, Layout } from "antd";
import { adminTheme } from "./admin-theme";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminContent from "./AdminContent";
import AdminFooter from "./AdminFooter";

const { Sider } = Layout;

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={adminTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={240}>
          <AdminSidebar />
        </Sider>

        <Layout>
          <AdminHeader />
          <AdminContent>{children}</AdminContent>
          <AdminFooter />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
