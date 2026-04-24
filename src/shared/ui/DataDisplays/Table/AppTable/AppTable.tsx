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
  render: (item: TItem) => React.ReactNode;
};

export type AppTableProps<TItem> = {
  items: TItem[];
  columns: AppTableColumn<TItem>[];
  getRowKey: (item: TItem) => string;
  emptyState?: React.ReactNode;
  toolbar?: React.ReactNode;
  onRowClick?: (item: TItem) => void;
};

export function AppTable<TItem>({
  items,
  columns,
  getRowKey,
  emptyState,
  toolbar,
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

  const table = useReactTable({
    data: items,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => getRowKey(row),
  });

  return (
    <div className={styles.shell}>
      {toolbar ? <div className={styles.toolbar}>{toolbar}</div> : null}

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
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td className={styles.empty} colSpan={columns.length}>
                  {emptyState ?? "Khong co du lieu."}
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
      </div>
    </div>
  );
}
