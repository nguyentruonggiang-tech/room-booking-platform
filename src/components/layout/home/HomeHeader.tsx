"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Col, Grid, Layout, Row, Space, Typography } from "antd";
import { HomeOutlined, MoonOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const navList = [
  { label: "Nơi ở", href: "/" },
  { label: "Trải nghiệm", href: "#" },
  { label: "Trải nghiệm trực tiếp", href: "#" },
];

export default function HomeHeader() {
  const pathname = usePathname();
  const screens = useBreakpoint();
  const isHome = pathname === "/";
  const isDesktopNav = Boolean(screens.lg);
  const isMobile = !screens.md;

  return (
    <Header
      style={{
        background: isHome ? "#15181d" : "#ffffff",
        borderBottom: isHome ? "1px solid #242a33" : "1px solid #ebebeb",
        position: "sticky",
        top: 0,
        zIndex: 50,
        paddingInline: 0,
        height: "auto",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", paddingInline: isMobile ? 12 : 24 }}>
        <Row align="middle" justify="space-between" style={{ minHeight: isMobile ? 64 : 80 }}>
          <Col>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "#0D9488",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeOutlined style={{ color: "#fff", fontSize: 16 }} />
              </div>
              <Text style={{ color: "#22d3c5", fontWeight: 700, fontSize: 22 }}>AirBnb</Text>
            </Link>
          </Col>

          {isHome && isDesktopNav && (
            <Col>
              <Space size={32}>
                {navList.map((navItem, index) => (
                  <Link
                    key={navItem.label}
                    href={navItem.href}
                    style={{
                      color: index === 0 ? "#22d3c5" : "rgba(255,255,255,0.9)",
                      fontSize: 14,
                      fontWeight: 500,
                      borderBottom: index === 0 ? "2px solid #22d3c5" : "2px solid transparent",
                      paddingBottom: 4,
                    }}
                  >
                    {navItem.label}
                  </Link>
                ))}
              </Space>
            </Col>
          )}

          <Col>
            <Space size={isMobile ? 10 : 14}>
              {!isHome && !isMobile && (
                <Button
                  icon={<SearchOutlined />}
                  style={{ borderRadius: 999, borderColor: "#d1d5db", color: "#4b5563", fontWeight: 500 }}
                >
                  Tìm kiếm
                </Button>
              )}
              <Button
                type="text"
                style={
                  isHome
                    ? { color: "rgba(255,255,255,0.9)", fontWeight: 500 }
                    : { color: "#4b5563", fontWeight: 500 }
                }
              >
                Đón tiếp khách
              </Button>
              <Button
                shape="circle"
                icon={<MoonOutlined />}
                style={
                  isHome
                    ? { background: "#1f2530", borderColor: "#2b3340", color: "rgba(255,255,255,0.86)" }
                    : undefined
                }
              />
              <Button
                shape="circle"
                icon={<UserOutlined />}
                style={
                  isHome
                    ? { background: "#1f2530", borderColor: "#2b3340", color: "rgba(255,255,255,0.86)" }
                    : undefined
                }
              />
            </Space>
          </Col>
        </Row>
      </div>
    </Header>
  );
}
