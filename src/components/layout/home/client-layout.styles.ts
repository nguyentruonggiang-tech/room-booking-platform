import type { CSSProperties } from "react";
import { headerFont } from "@/constants/typography.constants";
import { clientLayoutColor } from "./client-layout.constants";

export function getHeaderShellStyle(isHome: boolean): CSSProperties {
  return {
    background: isHome ? clientLayoutColor.surfaceDark : clientLayoutColor.surfaceLight,
    borderBottom: `1px solid ${isHome ? clientLayoutColor.borderDark : clientLayoutColor.borderLight}`,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 100,
    paddingInline: 0,
    height: "auto",
  };
}

export function getHeaderCircleButtonStyle(isHome: boolean): CSSProperties | undefined {
  if (!isHome) return undefined;

  return {
    background: clientLayoutColor.surfaceElevated,
    borderColor: clientLayoutColor.borderDarkSoft,
    color: "rgba(255,255,255,0.86)",
  };
}

export function getNavLinkStyle(isActive: boolean): CSSProperties {
  return {
    color: isActive ? clientLayoutColor.brand : clientLayoutColor.textOnDark,
    ...headerFont.navLink,
    borderBottom: isActive ? `2px solid ${clientLayoutColor.brand}` : "2px solid transparent",
    paddingBottom: 4,
  };
}

export function getHeaderActionStyle(isHome: boolean): CSSProperties {
  return {
    color: isHome ? clientLayoutColor.textOnDark : clientLayoutColor.textOnLight,
    ...headerFont.action,
  };
}

export function getSearchButtonStyle(): CSSProperties {
  return {
    borderRadius: 999,
    borderColor: "#d1d5db",
    color: clientLayoutColor.textOnLight,
    ...headerFont.action,
  };
}
