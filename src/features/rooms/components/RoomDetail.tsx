import { Crown, Heart, Share2, Star } from "lucide-react";
import type { ViTriViewModel } from "@/features/locations/types/location.type";
import type { PhongViewModel } from "@/features/rooms/types/room.type";
import BookingBox from "@/features/bookings/components/BookingBox";
import CommentSection from "@/features/comments/components/CommentSection";
import RoomGallery from "./RoomGallery";
import RoomInfo from "./RoomInfo";

type Props = {
  room: PhongViewModel;
  location: ViTriViewModel | null;
};

export default function RoomDetail({ room, location }: Props) {
  const locationLabel = location
    ? `${location.tenViTri}, ${location.tinhThanh}, ${location.quocGia}`
    : "";

  return (
    <div className="flex flex-col gap-6">

      {/* Header: tên phòng + rating + share/lưu — full width */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">{room.tenPhong}</h1>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1 text-sm text-gray-700">
            <Star size={14} className="fill-red-500 text-red-500" />
            <span className="font-medium">4.5</span>
            <span className="text-gray-400">·</span>
            <span className="underline">(24 đánh giá)</span>
            <span className="text-gray-400">·</span>
            <Crown size={14} className="fill-red-500 text-red-500" />
            <span className="font-medium">Chủ nhà siêu cấp</span>
            {locationLabel && (
              <>
                <span className="text-gray-400">·</span>
                <span className="underline">{locationLabel}</span>
              </>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-700 underline transition-colors hover:bg-gray-100"
            >
              <Share2 size={16} />
              Chia sẻ
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-700 underline transition-colors hover:bg-gray-100"
            >
              <Heart size={16} className="fill-current" />
              Lưu
            </button>
          </div>
        </div>
      </div>

      {/* Gallery — full width */}
      <RoomGallery hinhAnh={room.hinhAnh} tenPhong={room.tenPhong} />

      {/* RoomInfo + BookingBox nằm ngang nhau */}
      <div className="flex gap-10">
        <div className="min-w-0 flex-1">
          <RoomInfo room={room} />
        </div>
        <div className="w-80 shrink-0">
          <BookingBox room={room} />
        </div>
      </div>

      {/* Comments — full width */}
      <CommentSection maPhong={room.id} />
    </div>
  );
}
