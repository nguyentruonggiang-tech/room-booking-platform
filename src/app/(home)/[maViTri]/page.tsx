import RoomList from "@/features/rooms/components/RoomList";
import RoomMapWrapper from "@/features/rooms/components/RoomMapWrapper";
import { DEFAULT_PAGE_SIZE } from "@/constants/app.constants";
import { roomService } from "@/features/rooms/services/room.service";
import { parseRoomPage } from "@/features/rooms/utils/parse-room-page";
import Pagination from "@/shared/pagination/Pagination";

type RoomListPageProps = {
  params: Promise<{ maViTri: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function RoomListPage({ params, searchParams }: RoomListPageProps) {
  const { maViTri: maViTriRaw } = await params;
  const { page: pageParam } = await searchParams;
  const maViTri = Number(maViTriRaw);

  if (!Number.isFinite(maViTri)) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <p className="text-sm text-red-500">Mã vị trí không hợp lệ.</p>
      </main>
    );
  }

  let roomList;
  try {
    roomList = await roomService.getByLocation(maViTri);
  } catch {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <p className="text-sm text-red-500">Không thể tải danh sách phòng. Vui lòng thử lại.</p>
      </main>
    );
  }

  const totalRow = roomList.length;
  const totalPages = Math.max(1, Math.ceil(totalRow / DEFAULT_PAGE_SIZE));
  const page = parseRoomPage(pageParam, totalPages);
  const pageStart = (page - 1) * DEFAULT_PAGE_SIZE;
  const pagedRooms = roomList.slice(pageStart, pageStart + DEFAULT_PAGE_SIZE);

  const paginationHref = (nextPage: number) => `/${maViTri}?page=${nextPage}`;

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <RoomList maViTri={maViTri} rooms={pagedRooms} totalRow={totalRow} />
            <Pagination page={page} totalPages={totalPages} href={paginationHref} />
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
