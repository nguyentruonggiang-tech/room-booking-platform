"use client";

import { Button, Col, Grid, Row, Space, Typography } from "antd";
import { CalendarOutlined, HomeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import ClientContainer from "@/components/layout/home/ClientContainer";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export default function HomeHero() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(6, 18, 34, 0.55), rgba(6, 18, 34, 0.45)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: isMobile ? 500 : 560,
      }}
    >
      <div style={{ paddingBlock: isMobile ? "42px 0 24px" : "72px 0 42px" }}>
        <ClientContainer>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 22 : 28 }}>
            <Title
              level={isMobile ? 2 : 1}
              style={{
                color: "#ffffff",
                marginBottom: 8,
                fontSize: isMobile ? 40 : 64,
                lineHeight: 1.03,
                fontWeight: 700,
              }}
            >
              Khám phá nơi ở
              <br />
              <span style={{ color: "#22d3c5" }}>tuyệt vời</span> tại Việt Nam
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.88)", fontSize: isMobile ? 14 : 19 }}>
              Hàng nghìn căn hộ, biệt thự và homestay độc đáo đang chờ đón bạn
            </Text>
          </div>

          <div
            style={{
              width: "100%",
              borderRadius: isMobile ? 18 : 999,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(12, 17, 26, 0.92)",
            }}
          >
            <Row align="middle" gutter={0} wrap={isMobile}>
                <Col flex="1 1 0" style={{ padding: "11px 16px", borderRight: "1px solid rgba(255,255,255,0.14)" }}>
                  <Text style={{ color: "rgba(255,255,255,0.66)", fontSize: 10, display: "block", letterSpacing: 0.8 }}>
                    ĐỊA ĐIỂM
                  </Text>
                  <Space size={6}>
                    <HomeOutlined style={{ color: "#22d3c5" }} />
                    <Text style={{ color: "#ffffff" }}>Bạn muốn đi đâu?</Text>
                  </Space>
                </Col>
                <Col flex="1 1 0" style={{ padding: "11px 16px", borderRight: "1px solid rgba(255,255,255,0.14)" }}>
                  <Text style={{ color: "rgba(255,255,255,0.66)", fontSize: 10, display: "block", letterSpacing: 0.8 }}>
                    NHẬN PHÒNG
                  </Text>
                  <Space size={6}>
                    <CalendarOutlined style={{ color: "#22d3c5" }} />
                    <Text style={{ color: "#ffffff" }}>dd/mm/yyyy</Text>
                  </Space>
                </Col>
                <Col flex="1 1 0" style={{ padding: "11px 16px", borderRight: "1px solid rgba(255,255,255,0.14)" }}>
                  <Text style={{ color: "rgba(255,255,255,0.66)", fontSize: 10, display: "block", letterSpacing: 0.8 }}>
                    TRẢ PHÒNG
                  </Text>
                  <Space size={6}>
                    <CalendarOutlined style={{ color: "#22d3c5" }} />
                    <Text style={{ color: "#ffffff" }}>dd/mm/yyyy</Text>
                  </Space>
                </Col>
                <Col flex="1 1 0" style={{ padding: "11px 16px" }}>
                  <Text style={{ color: "rgba(255,255,255,0.66)", fontSize: 10, display: "block", letterSpacing: 0.8 }}>
                    KHÁCH
                  </Text>
                  <Space size={6}>
                    <UserOutlined style={{ color: "#22d3c5" }} />
                    <Text style={{ color: "#ffffff" }}>1 khách</Text>
                  </Space>
                </Col>
                <Col style={{ padding: isMobile ? "0 0 12px 12px" : 0 }}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<SearchOutlined />}
                    style={{
                      width: 52,
                      height: 52,
                      marginRight: isMobile ? 0 : 8,
                      background: "#15b8a6",
                      borderColor: "#15b8a6",
                    }}
                  />
                </Col>
            </Row>
          </div>
        </ClientContainer>
      </div>
    </section>
  );
}
