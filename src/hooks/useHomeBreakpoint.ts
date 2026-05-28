"use client";

import { Grid } from "antd";
import { headerHeight } from "@/components/layout/home/home-layout.constants";

const { useBreakpoint } = Grid;

export function useHomeBreakpoint() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isDesktopNav = Boolean(screens.lg);

  return {
    isMobile,
    isDesktopNav,
    headerOffset: isMobile ? headerHeight.mobile : headerHeight.desktop,
  };
}
