"use client";

import { App, ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";
import { FONT_FAMILY_SANS } from "@/constants/typography.constants";

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: FONT_FAMILY_SANS,
          fontSize: 14,
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
