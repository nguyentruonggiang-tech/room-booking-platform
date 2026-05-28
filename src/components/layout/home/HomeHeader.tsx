"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Col, Layout, Row, Space, Typography } from "antd";
import { HomeOutlined, MoonOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { headerFont } from "@/constants/typography.constants";
import { useClientBreakpoint } from "@/hooks/useClientBreakpoint";
import { clientLayoutColor, clientNavList } from "./client-layout.constants";
import {
  getHeaderActionStyle,
  getHeaderCircleButtonStyle,
  getHeaderShellStyle,
  getNavLinkStyle,
  getSearchButtonStyle,
} from "./client-layout.styles";
import ClientContainer from "./ClientContainer";

const { Header } = Layout;
const { Text } = Typography;

export default function HomeHeader() {
  const pathname = usePathname();
  const { isMobile, isDesktopNav } = useClientBreakpoint();
  const isHome = pathname === "/";

  return (
    <Header style={getHeaderShellStyle(isHome)}>
      <ClientContainer style={{ paddingBlock: isMobile ? 12 : 0 }}>
        <Row align="middle" justify="space-between" style={{ minHeight: isMobile ? 64 : 80 }}>
          <Col>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: clientLayoutColor.brandDark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeOutlined style={{ color: "#fff", fontSize: 16 }} />
              </div>
              <Text style={{ color: clientLayoutColor.brand, ...headerFont.logo }}>AirBnb</Text>
            </Link>
          </Col>

          {isHome && isDesktopNav && (
            <Col>
              <Space size={32}>
                {clientNavList.map((navItem, index) => (
                  <Link key={navItem.label} href={navItem.href} style={getNavLinkStyle(index === 0)}>
                    {navItem.label}
                  </Link>
                ))}
              </Space>
            </Col>
          )}

          <Col>
            <Space size={isMobile ? 10 : 14}>
              {!isHome && !isMobile && (
                <Button icon={<SearchOutlined />} style={getSearchButtonStyle()}>
                  Tìm kiếm
                </Button>
              )}
              <Button type="text" style={getHeaderActionStyle(isHome)}>
                Đón tiếp khách
              </Button>
              <Button shape="circle" icon={<MoonOutlined />} style={getHeaderCircleButtonStyle(isHome)} />
              <Link href="/dang-nhap">
                <Button shape="circle" icon={<UserOutlined />} style={getHeaderCircleButtonStyle(isHome)} />
              </Link>
            </Space>
          </Col>
        </Row>
      </ClientContainer>
    </Header>
  );
}
