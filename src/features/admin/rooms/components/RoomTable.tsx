import { Pencil, Trash2, BedDouble } from "lucide-react";
import type { AdminRoom } from "../types/admin-room.type";

type Props = {
  rooms: AdminRoom[];
  loading: boolean;
  error: string | null;
  onEdit: (room: AdminRoom) => void;
  onDelete: (room: AdminRoom) => void;
};

const COLUMNS = ["Phòng", "Sức chứa", "Giá / đêm", "Thao tác"];
const SKELETON_ROWS = 8;

function formatVND(amount: number) {
  return amount.toLocaleString("vi-VN") + " ₫";
}

function TableHead() {
  return (
    <thead>
      <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-400">
        {COLUMNS.map((col) => (
          <th key={col} className="px-6 py-3 text-left">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default function RoomTable({ rooms, loading, error, onEdit, onDelete }: Props) {
  if (loading) return <TableSkeleton />;

  if (error)
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );

  if (rooms.length === 0)
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center text-sm text-gray-400">
        Chưa có phòng nào
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[600px] text-sm">
        <TableHead />
        <tbody className="divide-y divide-gray-100">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-50/60">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {room.hinhAnh ? (
                    <img
                      src={room.hinhAnh}
                      alt={room.tenPhong}
                      className="h-10 w-16 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <BedDouble className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  <p className="font-medium text-gray-900">{room.tenPhong || "—"}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{room.khach} khách</td>
              <td className="px-6 py-4 font-medium text-gray-900">{formatVND(room.giaTien)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <button
                    title="Sửa"
                    onClick={() => onEdit(room)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    title="Xóa"
                    onClick={() => onDelete(room)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[600px] text-sm">
        <TableHead />
        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: SKELETON_ROWS }).map((_, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                </div>
              </td>
              {[1, 2, 3].map((i) => (
                <td key={i} className="px-6 py-4">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
