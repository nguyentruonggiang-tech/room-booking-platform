import { Pencil, Trash2 } from "lucide-react";
import { getInitials } from "@/shared/utils/string";
import { formatDate } from "@/shared/utils/date";
import { SKELETON_ROWS } from "@/constants/app.constants";
import type { AdminUser } from "../types/admin-user.type";

type Props = {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
};

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-indigo-500",
];

const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-violet-100 text-violet-700",
  USER: "bg-blue-100 text-blue-700",
};

function avatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

function roleStyle(role: string) {
  return ROLE_STYLES[role?.toUpperCase()] ?? "bg-gray-100 text-gray-600";
}

const COLUMNS = ["Tên & liên hệ", "Vai trò", "Ngày sinh", "Thao tác"];

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

export default function UserTable({ users, loading, error, onEdit, onDelete }: Props) {
  if (loading) return <TableSkeleton />;

  if (error)
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );

  if (users.length === 0)
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center text-sm text-gray-400">
        Chưa có người dùng nào
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <TableHead />
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/60">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${avatarColor(user.id)}`}
                  >
                    {getInitials(user.name || "?")}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name || "—"}</p>
                    <p className="text-xs text-gray-400">{user.email || "—"}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleStyle(user.role)}`}
                >
                  {user.role || "—"}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500">{formatDate(user.birthday ?? "") || "—"}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <button
                    title="Sửa"
                    onClick={() => onEdit(user)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    title="Xóa"
                    onClick={() => onDelete(user)}
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
      <table className="w-full min-w-[640px] text-sm">
        <TableHead />
        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: SKELETON_ROWS }).map((_, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-28 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-36 animate-pulse rounded bg-gray-100" />
                  </div>
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
