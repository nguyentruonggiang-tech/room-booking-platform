"use client";

import type { PropsWithChildren } from "react";
import { Layout } from "antd";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const { Content } = Layout;

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <HomeHeader />
      <Content style={{ padding: "24px", width: "100%", maxWidth: 1200, margin: "0 auto" }}>
        {children}
      </Content>
      <HomeFooter />
    </Layout>
  );
}
