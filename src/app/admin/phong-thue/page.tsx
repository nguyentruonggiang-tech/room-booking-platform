import { Suspense } from "react";
import RoomsContent from "@/features/admin/rooms/components/RoomsContent";

export default function RoomsPage() {
  return (
    <Suspense>
      <RoomsContent />
    </Suspense>
  );
}
