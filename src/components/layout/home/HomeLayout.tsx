"use client";

import type { PropsWithChildren } from "react";
import { Layout } from "antd";
import { useClientBreakpoint } from "@/hooks/useClientBreakpoint";
import { clientLayoutColor } from "./client-layout.constants";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const { Content } = Layout;

export default function HomeLayout({ children }: PropsWithChildren) {
  const { headerOffset } = useClientBreakpoint();

  return (
    <Layout style={{ minHeight: "100vh", background: clientLayoutColor.surfaceLight }}>
      <HomeHeader />
      <Content
        style={{
          padding: "0 24px 40px",
          paddingTop: headerOffset,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {children}
      </Content>
      <HomeFooter />
    </Layout>
  );
}
