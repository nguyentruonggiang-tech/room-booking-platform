type GetPaginationItemsParams = {
  page: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
};

export type PaginationItem =
  | { type: "page"; page: number }
  | { type: "start-ellipsis" }
  | { type: "end-ellipsis" };

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
}

export function getPaginationItems({
  page,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: GetPaginationItemsParams): PaginationItem[] {
  if (totalPages <= 1) {
    return [];
  }

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    totalPages - boundaryCount - 1,
  );

  const itemList: (number | "start-ellipsis" | "end-ellipsis")[] = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis" as const]
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? ["end-ellipsis" as const]
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),
    ...endPages,
  ];

  return itemList.map((item): PaginationItem => {
    if (typeof item === "number") {
      return { type: "page", page: item };
    }
    return { type: item };
  });
}
