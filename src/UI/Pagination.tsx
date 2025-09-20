import { usePagination } from "../hooks/use-pagination";
import styles from "./Pagination.module.css";
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

  // If there are fewer than 2 items in the pagination range, don't render pagination
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

  return (
    <ul className={`${styles["pagination-container"]} ${className}`}>
      <li
        className={`${styles["pagination-item"]} ${
          currentPage === 1 && styles["disabled"]
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "DOTS") {
          return (
            <li
              key={`dots-${index}`}
              className={`${styles["pagination-item"]} ${styles.dots}`}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={`${styles["pagination-item"]} ${
              pageNumber === currentPage && styles["selected"]
            }`}
            onClick={() =>
              typeof pageNumber === "number" && onPageChange(pageNumber)
            }
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${styles["pagination-item"]} ${
          paginationRange[paginationRange.length - 1] === currentPage &&
          styles["disabled"]
        }`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
