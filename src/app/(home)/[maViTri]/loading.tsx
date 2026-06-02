export default function RoomListLoading() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-gray-200 p-3">
                <div className="h-40 w-48 shrink-0 animate-pulse rounded-xl bg-gray-200" />
                <div className="flex flex-1 flex-col gap-2 py-1">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden w-[480px] shrink-0 lg:block">
            <div className="sticky top-24 h-[600px] animate-pulse rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}
