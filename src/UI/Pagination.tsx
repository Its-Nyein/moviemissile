import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { usePagination } from "../hooks/use-pagination";
import type { PaginationProps } from "../types";

const Pagination = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
  className,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    siblingCount: 1,
  });

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    const lastPage = paginationRange[paginationRange.length - 1];
    if (typeof lastPage === "number" && currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  const isFirstPage = currentPage === 1;
  const isLastPage = lastPage === currentPage;

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
    >
      <button
        onClick={onPrevious}
        disabled={isFirstPage}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-lg",
          "text-muted-foreground transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "DOTS") {
          return (
            <span
              key={`dots-${index}`}
              className="flex h-9 w-9 items-center justify-center"
            >
              <MoreHorizontal className="text-muted-foreground h-4 w-4" />
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            onClick={() =>
              typeof pageNumber === "number" && onPageChange(pageNumber)
            }
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
              pageNumber === currentPage
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            aria-current={pageNumber === currentPage ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={onNext}
        disabled={isLastPage}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-lg",
          "text-muted-foreground transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;
