"use client";

import { Layout } from "antd";

const { Footer } = Layout;

export default function HomeFooter() {
  return (
    <Footer
      style={{
        background: "#fff",
        borderTop: "1px solid #f0f0f0",
        padding: "16px 24px",
        textAlign: "center",
      }}
    >
      Client Footer
    </Footer>
  );
}
