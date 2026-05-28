"use client";

import { Col, Layout, Row, Space, Typography } from "antd";
import { FacebookFilled, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { footerFont } from "@/constants/typography.constants";
import {
  footerColumnList,
  footerLegalLinkList,
  footerLocaleList,
  homeLayoutColor,
} from "./home-layout.constants";
import HomeContainer from "./HomeContainer";

const { Footer } = Layout;
const { Text } = Typography;

const footerSocialIconList = [
  { key: "facebook", icon: <FacebookFilled /> },
  { key: "twitter", icon: <TwitterOutlined /> },
  { key: "instagram", icon: <InstagramOutlined /> },
] as const;

export default function HomeFooter() {
  return (
    <Footer
      style={{
        background: homeLayoutColor.surfaceDark,
        borderTop: `1px solid ${homeLayoutColor.borderDark}`,
        padding: 0,
      }}
    >
      <HomeContainer style={{ paddingTop: 40, paddingBottom: 24 }}>
        <Row gutter={[24, 24]}>
          {footerColumnList.map((footerColumn) => (
            <Col key={footerColumn.title} xs={24} sm={12} md={12} lg={6}>
              <Space direction="vertical" size={10}>
                <Text style={{ color: homeLayoutColor.textTitleOnDark, ...footerFont.columnTitle }}>
                  {footerColumn.title}
                </Text>
                {footerColumn.linkList.map((footerLink) => (
                  <Text key={footerLink} style={{ color: homeLayoutColor.textMutedOnDark, ...footerFont.columnItem }}>
                    {footerLink}
                  </Text>
                ))}
              </Space>
            </Col>
          ))}
        </Row>

        <Row
          justify="space-between"
          align="middle"
          style={{
            borderTop: `1px solid ${homeLayoutColor.borderDarkSoft}`,
            marginTop: 28,
            paddingTop: 18,
            gap: 12,
          }}
        >
          <Col>
            <Space size={12} wrap>
              <Text style={{ color: homeLayoutColor.textSubtleOnDark, ...footerFont.bottomMeta }}>
                © 2026 Airbnb, Inc. All rights reserved
              </Text>
              {footerLegalLinkList.map((legalLink) => (
                <Text key={legalLink} style={{ color: homeLayoutColor.textSubtleOnDark, ...footerFont.bottomMeta }}>
                  · {legalLink}
                </Text>
              ))}
            </Space>
          </Col>
          <Col>
            <Space size={14}>
              {footerLocaleList.map((localeLabel) => (
                <Text key={localeLabel} style={{ color: homeLayoutColor.textLocaleOnDark, ...footerFont.bottomLocale }}>
                  {localeLabel}
                </Text>
              ))}
              {footerSocialIconList.map((socialIcon) => (
                <span key={socialIcon.key} style={{ color: homeLayoutColor.textLocaleOnDark, fontSize: 16 }}>
                  {socialIcon.icon}
                </span>
              ))}
            </Space>
          </Col>
        </Row>
      </HomeContainer>
    </Footer>
  );
}
