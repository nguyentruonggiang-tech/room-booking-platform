"use client";

import type { CSSProperties, PropsWithChildren } from "react";
import { Col, Row } from "antd";
import { useClientBreakpoint } from "@/hooks/useClientBreakpoint";

type ClientContainerProps = PropsWithChildren<{
  style?: CSSProperties;
}>;

export default function ClientContainer({ children, style }: ClientContainerProps) {
  const { isMobile } = useClientBreakpoint();

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
