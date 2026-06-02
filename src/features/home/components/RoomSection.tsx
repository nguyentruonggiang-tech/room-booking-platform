import RoomCard from "./RoomCard";

const rooms = [
  { id: 1, tenPhong: "Toàn bộ nhà", hinhAnh: "https://picsum.photos/seed/house/600/400" },
  { id: 2, tenPhong: "Chỗ ở độc đáo", hinhAnh: "https://picsum.photos/seed/unique/600/400" },
  { id: 3, tenPhong: "Trang trại và thiên nhiên", hinhAnh: "https://picsum.photos/seed/farm/600/400" },
  { id: 4, tenPhong: "Cho phép mang theo thú cưng", hinhAnh: "https://picsum.photos/seed/pet/600/400" },
];

export default function RoomSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Ở bất cứ đâu</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} hinhAnh={room.hinhAnh} tenPhong={room.tenPhong} />
          ))}
        </div>
      </div>
    </section>
  );
}
