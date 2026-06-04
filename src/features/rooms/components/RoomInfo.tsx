"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Home, Medal, Sparkles } from "lucide-react";
import type { PhongViewModel } from "@/features/rooms/types/room.type";
import { AMENITIES } from "@/shared/constants/amenities";

type Props = {
  room: PhongViewModel;
};

export default function RoomInfo({ room }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const moTaRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (moTaRef.current) {
      setIsClamped(moTaRef.current.scrollHeight > moTaRef.current.clientHeight);
    }
  }, [room.moTa]);
  const activeAmenities = AMENITIES.filter(({ key }) => room[key] === true);

  return (
    <div className="flex flex-col gap-6">

      {/* Left block */}
      <div className="flex items-start justify-between gap-4 pt-6">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-gray-900">
            Toàn bộ căn hộ condo · Chủ nhà Phong
          </p>
          <p className="text-sm text-gray-600">
            {room.khach} khách · {room.phongNgu} phòng ngủ · {room.giuong} giường · {room.phongTam} phòng tắm
          </p>
        </div>
        <img
          src="https://api.dicebear.com/9.x/avataaars/svg?seed=Duc&backgroundColor=bfdbfe&skinColor=edb98a"
          alt="Chủ nhà"
          className="h-14 w-14 shrink-0 rounded-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      {/* Left block — điểm nổi bật */}
      <div className="flex flex-col gap-5 border-t border-gray-100 pt-6">
        {[
          {
            icon: <Home size={20} />,
            title: "Toàn bộ nhà",
            desc: "Bạn sẽ có chung cư cao cấp cho riêng mình.",
          },
          {
            icon: <Sparkles size={20} />,
            title: "Vệ sinh tăng cường",
            desc: "Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb.",
          },
          {
            icon: <Medal size={20} />,
            title: "Phong là Chủ nhà siêu cấp",
            desc: "Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian tuyệt vời cho khách.",
          },
          {
            icon: <Calendar size={20} />,
            title: "Miễn phí hủy trong 48 giờ",
            desc: "",
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="mt-0.5 shrink-0 text-gray-700">{icon}</span>
            <div>
              <p className="font-medium text-gray-900">{title}</p>
              {desc && <p className="mt-0.5 text-sm text-gray-500">{desc}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Mô tả từ API */}
      <div className="border-t border-gray-100 pt-6">
        <p
          ref={moTaRef}
          className={`text-justify text-sm leading-relaxed text-gray-600 ${!expanded ? "line-clamp-3" : ""}`}
        >
          {room.moTa}
        </p>
        {(isClamped || expanded) && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-sm font-medium text-gray-900"
          >
            {expanded ? <>‹ <span className="underline">Thu gọn</span></> : <><span className="underline">Hiển thị thêm</span> ›</>}
          </button>
        )}
      </div>

      {/* Tiện nghi */}
      {activeAmenities.length > 0 && (
        <div className="border-t border-gray-100 pt-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Tiện nghi</h2>
          <div className="grid grid-cols-2 gap-4">
            {activeAmenities.map(({ key, label, icon: Icon, bg, color }) => (
              <div key={key} className="flex items-center gap-3 text-sm text-gray-700">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
