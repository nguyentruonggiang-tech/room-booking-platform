"use client";

import dynamic from "next/dynamic";

const RoomMap = dynamic(() => import("./RoomMap"), { ssr: false });

export default function RoomMapWrapper() {
  return <RoomMap />;
}
