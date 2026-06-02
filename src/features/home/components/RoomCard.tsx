type Props = {
  hinhAnh: string;
  tenPhong: string;
};

export default function RoomCard({ hinhAnh, tenPhong }: Props) {
  return (
    <div className="cursor-pointer group">
      <div className="overflow-hidden rounded-xl">
        <img
          src={hinhAnh}
          alt={tenPhong}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 text-sm font-semibold text-gray-900 truncate">{tenPhong}</p>
    </div>
  );
}
