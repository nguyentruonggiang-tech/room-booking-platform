import { Car, ChefHat, MonitorPlay, Thermometer, WashingMachine, Waves, Wind, Wifi, Zap } from "lucide-react";
import type { ElementType } from "react";
import type { PhongViewModel } from "@/features/rooms/types/room.type";

export type Amenity = {
  key: keyof PhongViewModel;
  label: string;
  icon: ElementType;
  bg: string;
  color: string;
};

export const AMENITIES: Amenity[] = [
  { key: "wifi",    label: "Wifi",               icon: Wifi,           bg: "bg-blue-100",   color: "text-blue-600" },
  { key: "dieuHoa", label: "Điều hòa không khí", icon: Wind,           bg: "bg-cyan-100",   color: "text-cyan-600" },
  { key: "tivi",    label: "Tivi",               icon: MonitorPlay,    bg: "bg-purple-100", color: "text-purple-600" },
  { key: "bep",     label: "Bếp nấu ăn",         icon: ChefHat,        bg: "bg-orange-100", color: "text-orange-500" },
  { key: "mayGiat", label: "Máy giặt",           icon: WashingMachine, bg: "bg-sky-100",    color: "text-sky-500" },
  { key: "banLa",   label: "Bàn là",             icon: Zap,            bg: "bg-yellow-100", color: "text-yellow-500" },
  { key: "doXe",    label: "Đỗ xe miễn phí",     icon: Car,            bg: "bg-green-100",  color: "text-green-600" },
  { key: "hoBoi",   label: "Hồ bơi",             icon: Waves,          bg: "bg-blue-100",   color: "text-blue-500" },
  { key: "banUi",   label: "Bàn ủi",             icon: Thermometer,    bg: "bg-rose-100",   color: "text-rose-500" },
];
