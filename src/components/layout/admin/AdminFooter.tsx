export default function AdminFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-admin-border bg-admin-header px-6 py-4">
      <span className="text-[13px] text-white/50">
        © 2026 Room Booking Admin. Hệ thống quản trị đặt phòng.
      </span>
      <div className="flex items-center gap-6">
        {["Chính sách", "Điều khoản", "API"].map((link) => (
          <a key={link} href="#" className="text-[13px] text-white/50 transition-colors hover:text-white/80">
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}
