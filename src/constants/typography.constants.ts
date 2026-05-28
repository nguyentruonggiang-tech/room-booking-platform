export const FONT_FAMILY_SANS =
  'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const headerFont = {
  logo: {
    fontFamily: FONT_FAMILY_SANS,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.25,
  },
  navLink: {
    fontFamily: FONT_FAMILY_SANS,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  action: {
    fontFamily: FONT_FAMILY_SANS,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.4,
  },
} as const;

export const footerFont = {
  columnTitle: {
    fontFamily: FONT_FAMILY_SANS,
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
  },
  columnItem: {
    fontFamily: FONT_FAMILY_SANS,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.65,
  },
  bottomMeta: {
    fontFamily: FONT_FAMILY_SANS,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  bottomLocale: {
    fontFamily: FONT_FAMILY_SANS,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.5,
  },
} as const;
