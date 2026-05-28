"use client";

import type { CSSProperties, PropsWithChildren } from "react";
import { Col, Row } from "antd";
import { useHomeBreakpoint } from "@/hooks/useHomeBreakpoint";

export type HomeContainerProps = PropsWithChildren<{
  style?: CSSProperties;
}>;

export default function HomeContainer({ children, style }: HomeContainerProps) {
  const { isMobile } = useHomeBreakpoint();

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
