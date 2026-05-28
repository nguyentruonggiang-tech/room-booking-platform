"use client";

import { Grid } from "antd";
import { headerHeight } from "@/components/layout/home/client-layout.constants";

const { useBreakpoint } = Grid;

export function useClientBreakpoint() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isDesktopNav = Boolean(screens.lg);

  return {
    isMobile,
    isDesktopNav,
    headerOffset: isMobile ? headerHeight.mobile : headerHeight.desktop,
  };
}
