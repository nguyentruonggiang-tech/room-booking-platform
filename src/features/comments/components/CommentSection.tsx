"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, UserCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { MOCK_COMMENTS, type CommentItem } from "@/features/comments/mocks/comments.mock";

const PAGE_SIZE = 6;

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function CommentAvatar({ name, avatar }: { name: string; avatar?: string }) {
  const [imgErr, setImgErr] = useState(false);
  if (avatar && !imgErr) {
    return (
      <img
        src={avatar}
        alt={name}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
        onError={() => setImgErr(true)}
      />
    );
  }
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
      {getInitials(name)}
    </div>
  );
}

function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (ref.current) setClamped(ref.current.scrollHeight > ref.current.clientHeight);
  }, [text]);

  return (
    <div>
      <p
        ref={ref}
        className={`text-sm text-gray-600 ${!expanded ? "line-clamp-3" : ""}`}
      >
        {text}
      </p>
      {(clamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="mt-1 text-xs font-medium text-gray-900"
        >
          {expanded ? <>‹ <span className="underline">Thu gọn</span></> : <><span className="underline">Hiển thị thêm</span> ›</>}
        </button>
      )}
    </div>
  );
}

function CommentCard({ comment }: { comment: CommentItem }) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-3">
        <CommentAvatar name={comment.tenNguoiBinhLuan} avatar={comment.anhDaiDien} />
        <div>
          <p className="text-sm font-semibold text-gray-900">{comment.tenNguoiBinhLuan}</p>
          <p className="text-xs text-gray-400">{formatDate(comment.ngayBinhLuan)}</p>
        </div>
      </div>
      <ExpandableText text={comment.noiDung} />
    </div>
  );
}

export default function CommentSection() {
  const { user } = useAuthStore();
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");

  const totalPages = Math.max(1, Math.ceil(MOCK_COMMENTS.length / PAGE_SIZE));
  const visible = MOCK_COMMENTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="flex flex-col gap-6 border-t border-gray-100 pt-8">

      <p className="text-base font-semibold text-gray-900">{MOCK_COMMENTS.length} đánh giá</p>

      {/* Danh sách comment — 2 cột */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {visible.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-600">{page} / {totalPages}</span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Form comment */}
      <div className="flex gap-3 border-t border-gray-100 pt-6">
        <div className="shrink-0">
          {user ? (
            <CommentAvatar name={user.name} avatar={user.avatar} />
          ) : (
            <UserCircle size={40} className="text-gray-400" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={user ? "Chia sẻ trải nghiệm của bạn..." : "Đăng nhập để bình luận"}
            disabled={!user}
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500 disabled:cursor-not-allowed disabled:bg-gray-50"
          />
          <div className="flex justify-start">
            <button
              type="button"
              disabled={!user || !content.trim()}
              className="rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Gửi bình luận
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
