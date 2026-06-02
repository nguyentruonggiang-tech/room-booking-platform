import type { ViTriViewModel } from "@/features/locations/types/location.type";

type Props = {
  location: ViTriViewModel;
};

export default function LocationCard({ location }: Props) {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors hover:bg-gray-100">
      <img
        src={location.hinhAnh}
        alt={location.tenViTri}
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">{location.tinhThanh}</p>
        <p className="text-xs text-gray-500">{location.tenViTri}</p>
      </div>
    </div>
  );
}
