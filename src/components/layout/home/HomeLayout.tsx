"use client";

import type { PropsWithChildren } from "react";
import { Layout } from "antd";
import { homeLayoutColor } from "./home-layout.constants";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";
import styles from "./home-layout.module.css";

const { Content } = Layout;

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <Layout style={{ minHeight: "100vh", background: homeLayoutColor.surfaceLight }}>
      <HomeHeader />
      <Content className={styles.content}>{children}</Content>
      <HomeFooter />
    </Layout>
  );
}
