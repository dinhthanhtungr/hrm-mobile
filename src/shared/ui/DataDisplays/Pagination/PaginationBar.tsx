"use client";

import styles from "./PaginationBar.module.css";

type PaginationBarProps = {
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
};

export function PaginationBar({
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}: PaginationBarProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.paginationBar} aria-label="Pagination">
      <button
        type="button"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
      >
        Trước
      </button>

      <span>
        Trang {pageNumber} / {totalPages}
      </span>

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={() => onPageChange(pageNumber + 1)}
      >
        Sau
      </button>
    </nav>
  );
}
