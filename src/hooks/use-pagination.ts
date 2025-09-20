import { useMemo } from "react";

interface UsePaginationProps {
  totalCount?: number;
  pageSize?: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  siblingCount = 1,
  currentPage,
}: UsePaginationProps): (number | string)[] | undefined => {
  const paginationRange = useMemo(() => {
    const totalPageCount = 500; // The Movie DB API limited the max page number to 500

    const totalPageNumbers = siblingCount + 5;

    const range = (start: number, end: number) => {
      let length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, "DOTS", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, "DOTS", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
    }

    // Default case: no dots needed
    return range(leftSiblingIndex, rightSiblingIndex);
  }, [siblingCount, currentPage]);

  return paginationRange;
};
