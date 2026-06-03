import { Pencil, Trash2, MapPin } from "lucide-react";
import type { AdminLocation } from "../types/admin-location.type";

type Props = {
  locations: AdminLocation[];
  loading: boolean;
  error: string | null;
  onEdit: (location: AdminLocation) => void;
  onDelete: (location: AdminLocation) => void;
};

const COLUMNS = ["Vị trí", "Tỉnh / Thành", "Quốc gia", "Thao tác"];
const SKELETON_ROWS = 8;

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

export default function LocationTable({ locations, loading, error, onEdit, onDelete }: Props) {
  if (loading) return <TableSkeleton />;

  if (error)
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );

  if (locations.length === 0)
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center text-sm text-gray-400">
        Chưa có vị trí nào
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[600px] text-sm">
        <TableHead />
        <tbody className="divide-y divide-gray-100">
          {locations.map((location) => (
            <tr key={location.id} className="hover:bg-gray-50/60">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {location.hinhAnh ? (
                    <img
                      src={location.hinhAnh}
                      alt={location.tenViTri}
                      className="h-10 w-16 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  <p className="font-medium text-gray-900">{location.tenViTri || "—"}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{location.tinhThanh || "—"}</td>
              <td className="px-6 py-4 text-gray-600">{location.quocGia || "—"}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <button
                    title="Sửa"
                    onClick={() => onEdit(location)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    title="Xóa"
                    onClick={() => onDelete(location)}
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
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
