import { Suspense } from "react";
import BookingsContent from "@/features/admin/bookings/components/BookingsContent";

export default function BookingsPage() {
  return (
    <Suspense>
      <BookingsContent />
    </Suspense>
  );
}
