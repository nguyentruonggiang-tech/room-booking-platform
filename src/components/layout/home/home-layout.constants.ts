export const homeLayoutColor = {
  brand: "#22d3c5",
  brandDark: "#0D9488",
  surfaceDark: "#15181d",
  surfaceLight: "#ffffff",
  borderDark: "#242a33",
  borderDarkSoft: "#2b3340",
  borderLight: "#ebebeb",
  surfaceElevated: "#1f2530",
  textOnDark: "rgba(255,255,255,0.9)",
  textMutedOnDark: "rgba(255,255,255,0.78)",
  textSubtleOnDark: "rgba(255,255,255,0.62)",
  textLocaleOnDark: "rgba(255,255,255,0.82)",
  textOnLight: "#4b5563",
  textTitleOnDark: "#f5f5f5",
} as const;

export const headerHeight = {
  mobile: 88,
  desktop: 80,
} as const;

export const homeNavList = [
  { label: "Nơi ở", href: "/" },
  { label: "Trải nghiệm", href: "#" },
  { label: "Trải nghiệm trực tiếp", href: "#" },
] as const;

export const footerColumnList = [
  {
    title: "GIỚI THIỆU",
    linkList: [
      "Phương thức hoạt động của Airbnb",
      "Trang tin tức",
      "Nhà đầu tư",
      "Airbnb Plus",
      "Airbnb Luxe",
      "HotelTonight",
      "Airbnb for Work",
      "Nhờ có Host, mọi điều đều có thể",
      "Cơ hội nghề nghiệp",
      "Thư của nhà sáng lập",
    ],
  },
  {
    title: "CỘNG ĐỒNG",
    linkList: [
      "Sự đa dạng và Cảm giác thân thuộc",
      "Tiếp ứng nhà ở cho người tị nạn",
      "Bài viết về khả năng tiếp cận",
      "Đối tác liên kết của Airbnb",
      "Chào đón người tị nạn",
      "Lượt giới thiệu của khách",
      "Airbnb.org",
    ],
  },
  {
    title: "ĐÓN TIẾP KHÁCH",
    linkList: [
      "Cho thuê nhà",
      "Tổ chức Trải nghiệm trực tuyến",
      "Tổ chức trải nghiệm",
      "Đón tiếp khách có trách nhiệm",
      "Trung tâm tài nguyên",
      "Trung tâm cộng đồng",
    ],
  },
  {
    title: "HỖ TRỢ",
    linkList: [
      "Biện pháp ứng phó với đại dịch COVID-19",
      "Trung tâm trợ giúp",
      "Các tùy chọn hủy",
      "Hỗ trợ khu dân cư",
      "Tin cậy và an toàn",
    ],
  },
] as const;

export const footerLegalLinkList = ["Quyền riêng tư", "Điều khoản", "Sơ đồ trang web"] as const;

export const footerLocaleList = ["Tiếng Việt (VN)", "$ USD"] as const;

export type HomeNavItem = (typeof homeNavList)[number];
export type FooterColumn = (typeof footerColumnList)[number];
