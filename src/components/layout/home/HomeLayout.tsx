"use client";

import type { PropsWithChildren } from "react";
import { Layout } from "antd";
import { useHomeBreakpoint } from "@/hooks/useHomeBreakpoint";
import { homeLayoutColor } from "./home-layout.constants";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const { Content } = Layout;

export default function HomeLayout({ children }: PropsWithChildren) {
  const { headerOffset } = useHomeBreakpoint();

  return (
    <Layout style={{ minHeight: "100vh", background: homeLayoutColor.surfaceLight }}>
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
