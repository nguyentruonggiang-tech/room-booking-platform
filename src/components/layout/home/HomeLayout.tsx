"use client";

import type { PropsWithChildren } from "react";
import { Grid, Layout } from "antd";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function HomeLayout({ children }: PropsWithChildren) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const headerOffset = isMobile ? 88 : 80;

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
      <HomeHeader />
      <Content
        style={{
          padding: `0 24px 40px`,
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
