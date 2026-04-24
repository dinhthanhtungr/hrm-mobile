"use client";

import { useState } from "react";
import styles from "./Table.module.css";

// Mô tả một cột của bảng dùng chung.
export type TableColumn<TItem> = {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  render: (item: TItem) => React.ReactNode;
};

// Base table chỉ lo render dữ liệu và state hiển thị chung.
// Business logic của từng feature nên để ở wrapper như EmployeeTable, MaterialTable...
type TableProps<TItem> = {
  items: TItem[];
  columns: TableColumn<TItem>[];
  getRowKey: (item: TItem) => string;
  toolbar?: React.ReactNode;
  emptyState?: React.ReactNode;
  onRowClick?: (item: TItem) => void;
  renderExpandedRow?: (item: TItem) => React.ReactNode;
};

export function Table<TItem>({
  items,
  columns,
  getRowKey,
  toolbar,
  emptyState,
  onRowClick,
  renderExpandedRow,
}: TableProps<TItem>) {
  // Lưu các row đang mở phần detail, dùng key ổn định thay vì index.
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  // Toggle mở/đóng detail cho một row cụ thể.
  function toggleRow(key: string) {
    setExpandedKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className={styles.shell}>
      {toolbar ? <div className={styles.toolbar}>{toolbar}</div> : null}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={`${styles.th} ${styles[column.align ?? "left"]}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Khi không có dữ liệu, render một hàng duy nhất chiếm toàn bộ số cột. */}
            {items.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={columns.length}>
                  {emptyState ?? "Không có dữ liệu."}
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const key = getRowKey(item);
                const isExpanded = expandedKeys.has(key);

                return (
                  <FragmentRow
                    key={key}
                    item={item}
                    columns={columns}
                    isExpanded={isExpanded}
                    onRowClick={onRowClick}
                    onToggle={renderExpandedRow ? () => toggleRow(key) : undefined}
                    renderExpandedRow={renderExpandedRow}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type FragmentRowProps<TItem> = {
  item: TItem;
  columns: TableColumn<TItem>[];
  isExpanded: boolean;
  onRowClick?: (item: TItem) => void;
  onToggle?: () => void;
  renderExpandedRow?: (item: TItem) => React.ReactNode;
};

function FragmentRow<TItem>({
  item,
  columns,
  isExpanded,
  onRowClick,
  onToggle,
  renderExpandedRow,
}: FragmentRowProps<TItem>) {
  return (
    <>
      {/* Nếu có onRowClick hoặc onToggle thì row sẽ có trạng thái clickable. */}
      <tr
        className={onRowClick || onToggle ? styles.clickableRow : styles.row}
        onClick={() => {
          onRowClick?.(item);
          onToggle?.();
        }}
      >
        {columns.map((column) => (
          <td key={column.key} className={`${styles.td} ${styles[column.align ?? "left"]}`}>
            {column.render(item)}
          </td>
        ))}
      </tr>

      {/* Nếu có renderExpandedRow và row đang mở thì render thêm một hàng detail bên dưới. */}
      {renderExpandedRow && isExpanded ? (
        <tr className={styles.expandedRow}>
          <td className={styles.expandedCell} colSpan={columns.length}>
            {renderExpandedRow(item)}
          </td>
        </tr>
      ) : null}
    </>
  );
}
