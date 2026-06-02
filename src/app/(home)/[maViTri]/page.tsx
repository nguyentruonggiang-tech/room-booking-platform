import RoomList from "@/features/rooms/components/RoomList";
import RoomMapWrapper from "@/features/rooms/components/RoomMapWrapper";

export default function RoomListPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <div className="flex gap-6">
          <div className="flex-1">
            <RoomList />
          </div>
          <div className="hidden w-[480px] shrink-0 lg:block">
            <div className="sticky top-24 h-[600px] overflow-hidden rounded-xl">
              <RoomMapWrapper />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
