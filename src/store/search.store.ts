import { create } from "zustand";
import type { ViTriViewModel } from "@/features/locations/types/location.type";

type SearchState = {
  selectedLocation: ViTriViewModel | null;
  ngayDen: string;
  ngayDi: string;
  soKhach: number;
  setSelectedLocation: (location: ViTriViewModel | null) => void;
  setNgayDen: (date: string) => void;
  setNgayDi: (date: string) => void;
  setSoKhach: (count: number) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  selectedLocation: null,
  ngayDen: "",
  ngayDi: "",
  soKhach: 1,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setNgayDen: (date) => set({ ngayDen: date }),
  setNgayDi: (date) => set({ ngayDi: date }),
  setSoKhach: (count) => set({ soKhach: count }),
}));
