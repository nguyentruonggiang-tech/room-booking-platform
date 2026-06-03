"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { commentService } from "@/features/comments/services/comment.service";
import type { BinhLuanViewModel } from "@/features/comments/types/comment.type";
import { getInitials } from "@/shared/utils/string";
import { formatDate } from "@/shared/utils/date";

const PAGE_SIZE = 6;
const AVATAR_FALLBACK = (seed: number | string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=bfdbfe`;

function UserAvatar({ name, avatar }: { name: string; avatar?: string }) {
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
      <p ref={ref} className={`text-sm text-gray-600 ${!expanded ? "line-clamp-3" : ""}`}>
        {text}
      </p>
      {(clamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="mt-1 text-xs font-medium text-gray-900"
        >
          {expanded
            ? <>‹ <span className="underline">Thu gọn</span></>
            : <><span className="underline">Hiển thị thêm</span> ›</>}
        </button>
      )}
    </div>
  );
}

function CommentCard({ comment }: { comment: BinhLuanViewModel }) {
  const displayName = comment.tenNguoiBinhLuan ?? "Ẩn danh";
  const avatarUrl = comment.avatar || AVATAR_FALLBACK(comment.maNguoiBinhLuan);
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-3">
        <UserAvatar name={displayName} avatar={avatarUrl} />
        <div>
          <p className="text-sm font-semibold text-gray-900">{displayName}</p>
          <p className="text-xs text-gray-400">{formatDate(comment.ngayBinhLuan)}</p>
        </div>
      </div>
      <ExpandableText text={comment.noiDung} />
    </div>
  );
}

type Props = {
  maPhong: number;
};

export default function CommentSection({ maPhong }: Props) {
  const { user, token } = useAuthStore();
  const [comments, setComments] = useState<BinhLuanViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    commentService
      .getByRoom(maPhong)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [maPhong]);

  const totalPages = Math.max(1, Math.ceil(comments.length / PAGE_SIZE));
  const pageComments = comments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleSubmit() {
    if (!token || !user?.id || !content.trim()) return;
    setSubmitting(true);
    try {
      const newComment = await commentService.create(
        {
          maPhong,
          maNguoiBinhLuan: user.id!,
          ngayBinhLuan: new Date().toISOString(),
          noiDung: content.trim(),
          saoBinhLuan: 5,
        },
        token,
      );
      setComments((prev) => [newComment, ...prev]);
      setContent("");
      setPage(1);
      toast.success("Bình luận đã được gửi!");
    } catch {
      toast.error("Gửi bình luận thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 border-t border-gray-100 pt-8">

      {!loading && !error && (
        <p className="text-base font-semibold text-gray-900">{comments.length} đánh giá</p>
      )}

      {/* Danh sách — 2 cột */}
      {error ? (
        <p className="text-sm text-red-500">Không thể tải bình luận. Vui lòng thử lại.</p>
      ) : loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : !loading && comments.length === 0 ? (
        <p className="text-sm text-gray-500">Chưa có bình luận nào.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pageComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
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
            <UserAvatar name={user.name} avatar={user.avatar} />
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
              onClick={handleSubmit}
              disabled={!user || !content.trim() || submitting}
              className="rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Đang gửi..." : "Gửi bình luận"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
