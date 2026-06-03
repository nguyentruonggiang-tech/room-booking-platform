import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-dark px-4 text-center">
      <p className="text-8xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-white">Trang không tồn tại</h1>
      <p className="mt-2 text-sm text-white/50">
        Trang bạn tìm kiếm đã bị xóa hoặc không tồn tại.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
