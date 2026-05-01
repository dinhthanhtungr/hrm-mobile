"use client";

import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import styles from "./AppTable.module.css";

export type AppTableColumn<TItem> = {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  hideBelow?: "sm" | "md" | "lg";
  render: (item: TItem) => React.ReactNode;
};

export type AppTableProps<TItem> = {
  items: TItem[];
  columns: AppTableColumn<TItem>[];
  getRowKey: (item: TItem) => string;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
  onRowClick?: (item: TItem) => void;
};


export function AppTable<TItem>({
  items,
  columns,
  getRowKey,
  emptyState,
  isLoading = false,
  onRowClick,
}: AppTableProps<TItem>) {
  const columnHelper = createColumnHelper<TItem>();

  const tableColumns = React.useMemo(
    () =>
      columns.map((column) =>
        columnHelper.display({
          id: column.key,
          header: () => column.header,
          cell: ({ row }) => (
            <div
              className={
                column.align === "center"
                  ? styles.center
                  : column.align === "right"
                    ? styles.right
                    : styles.left
              }
            >
              {column.render(row.original)}
            </div>
          ),
          meta: {
            width: column.width,
            align: column.align ?? "left",
          },
        }),
      ),
    [columnHelper, columns],
  );

  const getRowId = React.useCallback(
    (row: TItem) => getRowKey(row),
    [getRowKey],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: items,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  });


  return (
    <div className={styles.shell}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead className={styles.head}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as
                    | { width?: string; align?: "left" | "center" | "right" }
                    | undefined;

                  return (
                    <th
                      key={header.id}
                      className={`${styles.th} ${
                        meta?.align === "center"
                          ? styles.center
                          : meta?.align === "right"
                            ? styles.right
                            : styles.left
                      }`}
                      style={meta?.width ? { width: meta.width } : undefined}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading && table.getRowModel().rows.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={columns.length}>
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={columns.length}>
                  {emptyState ?? "Không có dữ liệu."}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={onRowClick ? styles.clickableRow : styles.row}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {isLoading && table.getRowModel().rows.length > 0 ? (
          <div className={styles.loadingOverlay} aria-live="polite">
            <span className={styles.spinner} />
            <span>Đang tải dữ liệu...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
