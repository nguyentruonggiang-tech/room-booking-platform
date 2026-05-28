"use client";

import { Layout } from "antd";

const { Header } = Layout;

export default function HomeHeader() {
  return (
    <Header
      style={{
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        paddingInline: 24,
      }}
    >
      Client Header
    </Header>
  );
}
