"use client";

import type { PropsWithChildren } from "react";
import { Layout } from "antd";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const { Content } = Layout;

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
      <HomeHeader />
      <Content style={{ padding: "0 24px 40px", width: "100%", maxWidth: 1280, margin: "0 auto" }}>
        {children}
      </Content>
      <HomeFooter />
    </Layout>
  );
}
