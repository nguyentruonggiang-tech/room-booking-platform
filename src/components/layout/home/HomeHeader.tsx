"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Col, Layout, Row, Space, Typography } from "antd";
import { HomeOutlined, MoonOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { headerFont } from "@/constants/typography.constants";
import { homeLayoutColor, homeNavList } from "./home-layout.constants";
import {
  getHeaderActionStyle,
  getHeaderCircleButtonStyle,
  getHeaderShellStyle,
  getNavLinkStyle,
  getSearchButtonStyle,
} from "./home-layout.styles";
import HomeContainer from "./HomeContainer";
import styles from "./home-layout.module.css";

const { Header } = Layout;
const { Text } = Typography;

export default function HomeHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Header style={getHeaderShellStyle(isHome)}>
      <HomeContainer className={styles.headerContainer}>
        <Row align="middle" justify="space-between" className={styles.headerRow}>
          <Col>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: homeLayoutColor.brandDark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeOutlined style={{ color: "#fff", fontSize: 16 }} />
              </div>
              <Text style={{ color: homeLayoutColor.brand, ...headerFont.logo }}>AirBnb</Text>
            </Link>
          </Col>

          {isHome && (
            <Col className={styles.desktopNav}>
              <Space size={32}>
                {homeNavList.map((navItem, index) => (
                  <Link key={navItem.label} href={navItem.href} style={getNavLinkStyle(index === 0)}>
                    {navItem.label}
                  </Link>
                ))}
              </Space>
            </Col>
          )}

          <Col>
            <Space size={14}>
              {!isHome && (
                <span className={styles.desktopOnly}>
                  <Button icon={<SearchOutlined />} style={getSearchButtonStyle()}>
                    Tìm kiếm
                  </Button>
                </span>
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
      </HomeContainer>
    </Header>
  );
}
