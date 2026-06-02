"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { locationService } from "@/features/locations/services/location.service";
import type { ViTriViewModel } from "@/features/locations/types/location.type";

type Props = {
  onSelect: (location: ViTriViewModel) => void;
};

export default function LocationSearch({ onSelect }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<ViTriViewModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    locationService
      .getPaging(1, 8, debouncedKeyword)
      .then((res) => setSuggestions(res.data))
      .catch(() => setSuggestions([]))
      .finally(() => setLoading(false));
  }, [open, debouncedKeyword]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectLocation(loc: ViTriViewModel) {
    setKeyword(`${loc.tenViTri}, ${loc.tinhThanh}`);
    setOpen(false);
    onSelect(loc);
  }

  return (
    <div ref={wrapperRef} className="relative flex flex-1 flex-col border-b border-white/14 px-4 py-3 md:border-b-0 md:border-r">
      <span className="text-[10px] uppercase tracking-[0.8px] text-white/66">Địa điểm</span>
      <div className="flex items-center gap-1.5">
        <MapPin size={14} className="shrink-0 text-brand" />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Bạn muốn đi đâu?"
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/60 outline-none"
        />
        {loading && <Loader2 size={13} className="shrink-0 animate-spin text-white/60" />}
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-white/10 bg-[rgba(12,17,26,0.97)] shadow-xl">
          {suggestions.length === 0 && !loading ? (
            <p className="px-4 py-3 text-sm text-white/50">Không tìm thấy địa điểm</p>
          ) : (
            suggestions.map((loc) => (
              <button
                key={loc.id}
                onClick={() => selectLocation(loc)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/10"
              >
                <MapPin size={14} className="shrink-0 text-brand" />
                <p className="truncate text-sm text-white">
                  {loc.tenViTri}, {loc.tinhThanh}, {loc.quocGia}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
