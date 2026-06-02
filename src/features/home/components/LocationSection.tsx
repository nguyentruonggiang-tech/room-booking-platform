"use client";

import { useEffect, useState } from "react";
import { locationService } from "@/features/locations/services/location.service";
import type { ViTriViewModel } from "@/features/locations/types/location.type";
import LocationCard from "./LocationCard";

export default function LocationSection() {
  const [locations, setLocations] = useState<ViTriViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    locationService
      .getPaging(1, 8)
      .then((result) => setLocations(result.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const gridCls = "grid grid-cols-2 gap-2 sm:grid-cols-4";

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Khám phá những điểm đến gần đây
        </h2>

        {loading && (
          <div className={gridCls}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl p-3">
                <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200 animate-pulse" />
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
                  <div className="h-3 w-14 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500">Không thể tải danh sách địa điểm. Vui lòng thử lại.</p>
        )}

        {!loading && !error && locations.length === 0 && (
          <p className="text-sm text-gray-500">Chưa có địa điểm nào.</p>
        )}

        {!loading && !error && locations.length > 0 && (
          <div className={gridCls}>
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
