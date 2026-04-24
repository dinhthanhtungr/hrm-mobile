"use client";

import styles from "./PaginationBar.module.css";

type PaginationBarProps = {
  totalItems: number;
  pageSize?: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
};

export function PaginationBar({
  totalItems,
  pageSize = 10,
  currentPage,
  onPageChanged,
}: PaginationBarProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const maxVisiblePages = 10;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  function setPage(page = 1) {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChanged(page);
  }

  if (totalPages <= 1) {
    return null;
  }

  const pageItems: React.ReactNode[] = [];

  pageItems.push(
    <li
      key="prev"
      className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ""}`}
    >
      <button
        className={styles.pageLink}
        type="button"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>
    </li>,
  );

  if (startPage > 1) {
    pageItems.push(
      <li key="first" className={styles.pageItem}>
        <button className={styles.pageLink} type="button" onClick={() => setPage(1)}>
          1
        </button>
      </li>,
    );

    if (startPage > 2) {
      pageItems.push(
        <li key="start-ellipsis" className={`${styles.pageItem} ${styles.disabled}`}>
          <span className={styles.pageLink}>...</span>
        </li>,
      );
    }
  }

  for (let i = startPage; i <= endPage; i += 1) {
    const page = i;

    pageItems.push(
      <li
        key={page}
        className={`${styles.pageItem} ${currentPage === page ? styles.active : ""}`}
      >
        <button className={styles.pageLink} type="button" onClick={() => setPage(page)}>
          {page}
        </button>
      </li>,
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageItems.push(
        <li key="end-ellipsis" className={`${styles.pageItem} ${styles.disabled}`}>
          <span className={styles.pageLink}>...</span>
        </li>,
      );
    }

    pageItems.push(
      <li key="last" className={styles.pageItem}>
        <button
          className={styles.pageLink}
          type="button"
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </button>
      </li>,
    );
  }

  pageItems.push(
    <li
      key="next"
      className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ""}`}
    >
      <button
        className={styles.pageLink}
        type="button"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </li>,
  );

  return (
    <nav aria-label="Pagination">
      <ul className={styles.pagination}>{pageItems}</ul>
    </nav>
  );
}
