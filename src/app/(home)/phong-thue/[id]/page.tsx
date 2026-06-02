import { locationService } from "@/features/locations/services/location.service";
import { roomService } from "@/features/rooms/services/room.service";
import RoomDetail from "@/features/rooms/components/RoomDetail";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function RoomDetailPage({ params }: PageProps) {
  const { id } = await params;
  const roomId = Number(id);

  if (!Number.isFinite(roomId) || roomId <= 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <p className="text-sm text-red-500">Mã phòng không hợp lệ.</p>
      </main>
    );
  }

  let room;
  try {
    room = await roomService.getById(roomId);
  } catch {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <p className="text-sm text-red-500">Không tìm thấy phòng. Vui lòng thử lại.</p>
      </main>
    );
  }

  const location = await locationService.getById(room.maViTri).catch(() => null);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
      <RoomDetail room={room} location={location} />
    </main>
  );
}
