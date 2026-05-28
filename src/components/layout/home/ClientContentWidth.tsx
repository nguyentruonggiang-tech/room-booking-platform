"use client";

import type { CSSProperties, PropsWithChildren } from "react";
import { Col, Grid, Row } from "antd";

const { useBreakpoint } = Grid;

type ClientContentWidthProps = PropsWithChildren<{
  style?: CSSProperties;
}>;

/** Cùng padding và độ rộng với thanh tìm kiếm hero (Col lg={16}). */
export default function ClientContentWidth({ children, style }: ClientContentWidthProps) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <div style={{ paddingInline: isMobile ? 12 : 16, ...style }}>
      <Row justify="center">
        <Col xs={24} lg={16}>
          {children}
        </Col>
      </Row>
    </div>
  );
}
