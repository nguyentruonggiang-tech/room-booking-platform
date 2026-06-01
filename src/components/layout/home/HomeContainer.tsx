"use client";

import type { CSSProperties, PropsWithChildren } from "react";
import { Col, Row } from "antd";
import styles from "./home-layout.module.css";

export type HomeContainerProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}>;

export default function HomeContainer({ children, className, style }: HomeContainerProps) {
  return (
    <div className={[styles.homeContainer, className].filter(Boolean).join(" ")} style={style}>
      <Row justify="center">
        <Col xs={24} lg={16}>
          {children}
        </Col>
      </Row>
    </div>
  );
}
