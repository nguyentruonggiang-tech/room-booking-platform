"use client";

import { Col, Layout, Row, Space, Typography } from "antd";
import { FacebookFilled, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { footerFont } from "@/constants/typography.constants";
import ClientContentWidth from "./ClientContentWidth";

const { Footer } = Layout;
const { Text } = Typography;

const footerColumnList = [
  {
    title: "GIỚI THIỆU",
    itemList: [
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
    itemList: [
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
    itemList: [
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
    itemList: [
      "Biện pháp ứng phó với đại dịch COVID-19",
      "Trung tâm trợ giúp",
      "Các tùy chọn hủy",
      "Hỗ trợ khu dân cư",
      "Tin cậy và an toàn",
    ],
  },
];

export default function HomeFooter() {
  return (
    <Footer
      style={{
        background: "#15181d",
        borderTop: "1px solid #242a33",
        padding: 0,
      }}
    >
      <ClientContentWidth style={{ paddingTop: 40, paddingBottom: 24 }}>
        <Row gutter={[24, 24]}>
          {footerColumnList.map((footerColumn) => (
            <Col key={footerColumn.title} xs={24} sm={12} md={12} lg={6}>
              <Space direction="vertical" size={10}>
                <Text style={{ color: "#f5f5f5", ...footerFont.columnTitle }}>{footerColumn.title}</Text>
                {footerColumn.itemList.map((footerItem) => (
                  <Text key={footerItem} style={{ color: "rgba(255,255,255,0.78)", ...footerFont.columnItem }}>
                    {footerItem}
                  </Text>
                ))}
              </Space>
            </Col>
          ))}
        </Row>

        <Row
          justify="space-between"
          align="middle"
          style={{ borderTop: "1px solid #2b3340", marginTop: 28, paddingTop: 18, gap: 12 }}
        >
          <Col>
            <Space size={12}>
              <Text style={{ color: "rgba(255,255,255,0.62)", ...footerFont.bottomMeta }}>
                © 2026 Airbnb, Inc. All rights reserved
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.62)", ...footerFont.bottomMeta }}>·</Text>
              <Text style={{ color: "rgba(255,255,255,0.62)", ...footerFont.bottomMeta }}>Quyền riêng tư</Text>
              <Text style={{ color: "rgba(255,255,255,0.62)", ...footerFont.bottomMeta }}>·</Text>
              <Text style={{ color: "rgba(255,255,255,0.62)", ...footerFont.bottomMeta }}>Điều khoản</Text>
              <Text style={{ color: "rgba(255,255,255,0.62)", ...footerFont.bottomMeta }}>·</Text>
              <Text style={{ color: "rgba(255,255,255,0.62)", ...footerFont.bottomMeta }}>Sơ đồ trang web</Text>
            </Space>
          </Col>
          <Col>
            <Space size={14}>
              <Text style={{ color: "rgba(255,255,255,0.82)", ...footerFont.bottomLocale }}>Tiếng Việt (VN)</Text>
              <Text style={{ color: "rgba(255,255,255,0.82)", ...footerFont.bottomLocale }}>$ USD</Text>
              <FacebookFilled style={{ color: "rgba(255,255,255,0.82)", fontSize: 16 }} />
              <TwitterOutlined style={{ color: "rgba(255,255,255,0.82)", fontSize: 16 }} />
              <InstagramOutlined style={{ color: "rgba(255,255,255,0.82)", fontSize: 16 }} />
            </Space>
          </Col>
        </Row>
      </ClientContentWidth>
    </Footer>
  );
}
