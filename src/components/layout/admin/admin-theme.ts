import { theme, type ThemeConfig } from "antd";

// Chiều cao header, dùng chung để brand sidebar khớp với header.
export const ADMIN_HEADER_HEIGHT = 64;

// Màu nền vùng content, giữ sáng ở cả theme dark lẫn light.
export const ADMIN_CONTENT_BG = "#f5f7fb";

// Theme cho phần khung admin (sidebar, header, footer).
// Day 20 làm dark mode: chỉ cần đổi object truyền vào ConfigProvider
// trong AdminLayout theo store, không phải sửa lại các component.
export const adminTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#6366f1",
    colorBgLayout: "#0a0e17",
    colorBgContainer: "#161b2c",
    colorBgElevated: "#1b2236",
    colorBorder: "#262d40",
    colorBorderSecondary: "#1f2638",
    borderRadius: 6,
  },
  components: {
    Layout: {
      siderBg: "#0b0f19",
      headerBg: "#141a28",
      footerBg: "#141a28",
      bodyBg: "#0a0e17",
      headerHeight: ADMIN_HEADER_HEIGHT,
    },
    Menu: {
      darkItemBg: "transparent",
      darkSubMenuItemBg: "transparent",
      darkItemColor: "#9aa3b8",
      darkItemHoverColor: "#ffffff",
      darkItemSelectedBg: "#6366f1",
      darkItemSelectedColor: "#ffffff",
      itemBorderRadius: 8,
      itemMarginInline: 12,
    },
  },
};

// Theme riêng cho vùng content để Table, Card, Modal... luôn render tông sáng.
export const adminContentTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#6366f1",
    colorBgLayout: ADMIN_CONTENT_BG,
    borderRadius: 6,
  },
};
