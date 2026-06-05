"use client";

import { useState } from "react";

const FALLBACK_IMG = "https://placehold.co/900x480/f3f4f6/9ca3af?text=No+Image";

type Props = {
  hinhAnh: string;
  tenPhong: string;
};

export default function RoomGallery({ hinhAnh, tenPhong }: Props) {
  const [imgSrc, setImgSrc] = useState(hinhAnh || FALLBACK_IMG);

  return (
    <div className="grid h-[360px] grid-cols-2 gap-2 overflow-hidden rounded-2xl">
      <img
        src={imgSrc}
        alt={tenPhong}
        className="h-full w-full object-cover"
        onError={() => setImgSrc(FALLBACK_IMG)}
      />
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <img
            key={i}
            src={imgSrc}
            alt={tenPhong}
            className="h-full w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}
