export function parseRoomPage(value: string | undefined, totalPages: number): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  if (totalPages < 1) {
    return 1;
  }
  return Math.min(parsed, totalPages);
}
