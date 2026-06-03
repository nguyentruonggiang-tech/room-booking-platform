import { Suspense } from "react";
import LocationsContent from "@/features/admin/locations/components/LocationsContent";

export default function LocationsPage() {
  return (
    <Suspense>
      <LocationsContent />
    </Suspense>
  );
}
