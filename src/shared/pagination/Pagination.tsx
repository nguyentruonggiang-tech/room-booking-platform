import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPaginationItems } from "./getPaginationItems";

type PaginationProps = {
  page: number;
  totalPages: number;
  href: (page: number) => string;
  siblingCount?: number;
  boundaryCount?: number;
  activeClass?: string;
};

const linkClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-gray-300 px-2 text-sm text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50";

const defaultActiveClass =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-brand bg-brand px-2 text-sm font-medium text-white";

const disabledClass =
  "inline-flex h-9 min-w-9 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 px-2 text-sm text-gray-400";

export default function Pagination({
  page,
  totalPages,
  href,
  siblingCount,
  boundaryCount,
  activeClass = defaultActiveClass,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems({
    page,
    totalPages,
    siblingCount,
    boundaryCount,
  });

  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <nav aria-label="Pagination" className="flex justify-end">
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          {isPrevDisabled ? (
            <span className={disabledClass} aria-disabled="true">
              <ChevronLeft className="h-4 w-4" aria-hidden />
              <span className="sr-only">Previous</span>
            </span>
          ) : (
            <Link href={href(page - 1)} className={linkClass} aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </li>

        {items.map((item, index) => {
          if (item.type === "start-ellipsis" || item.type === "end-ellipsis") {
            return (
              <li key={`${item.type}-${index}`}>
                <span className="inline-flex h-9 min-w-9 items-center justify-center px-1 text-sm text-gray-500">
                  …
                </span>
              </li>
            );
          }

          const isActive = item.page === page;

          return (
            <li key={item.page}>
              {isActive ? (
                <span className={activeClass} aria-current="page">
                  {item.page}
                </span>
              ) : (
                <Link href={href(item.page)} className={linkClass}>
                  {item.page}
                </Link>
              )}
            </li>
          );
        })}

        <li>
          {isNextDisabled ? (
            <span className={disabledClass} aria-disabled="true">
              <ChevronRight className="h-4 w-4" aria-hidden />
              <span className="sr-only">Next</span>
            </span>
          ) : (
            <Link href={href(page + 1)} className={linkClass} aria-label="Next page">
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
