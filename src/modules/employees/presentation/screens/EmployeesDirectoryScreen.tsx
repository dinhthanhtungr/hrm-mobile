"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Plus, Search } from "lucide-react";
import styles from "./EmployeesDirectoryScreen.module.css";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useEmployeePage } from "../hooks/useEmployeePage";
import { AppButton } from "@/shared/ui/Buttons/AppButton";

export function EmployeesDirectoryScreen() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("active");
  const [pageNumber, setPageNumber] = React.useState(1);

  const debouncedSearch = useDebouncedValue(search, 350);
  const employeePage = useEmployeePage({
    pageNumber,
    pageSize: 10,
    search: debouncedSearch,
    status,
  });

  const currentPage = employeePage.data?.pageNumber ?? pageNumber;
  const totalPages = employeePage.data?.totalPages ?? 1;
  const canGoPrevious = employeePage.data?.hasPreviousPage ?? pageNumber > 1;
  const canGoNext = employeePage.data?.hasNextPage ?? false;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Quản lý nhân viên</h1>
        </div>

        <AppButton type="button">
          <Plus size={16} />
          Thêm nhân viên
        </AppButton>
      </div>

      <section className={styles.directoryPanel}>
        <div className={styles.filters}>
          <label className={styles.searchBox}>
            <Search size={16} />
            <input
              placeholder="Tìm theo tên, mã nhân viên, email..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPageNumber(1);
              }}
            />
          </label>

          <select defaultValue="all">
            <option value="all">Tất cả phòng ban</option>
            <option value="hr">Human Capital</option>
            <option value="lab">Lab</option>
            <option value="manufacture">Manufacture</option>
          </select>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPageNumber(1);
            }}
          >
            <option value="active">Đang làm việc</option>
            <option value="inactive">Tạm nghỉ</option>
            <option value="all">Tất cả trạng thái</option>
          </select>
        </div>

        {employeePage.isLoading ? (
          <p className={styles.statusText}>Đang tải danh sách nhân viên...</p>
        ) : null}

        {employeePage.error ? (
          <p className={styles.errorText}>{employeePage.error}</p>
        ) : null}

        <div className={styles.tableHeader} aria-hidden="true">
          <span />
          <span>Nhân viên</span>
          <span>Phòng ban</span>
          <span>Chức vụ</span>
          <span>Trạng thái</span>
          <span />
        </div>

        <div className={styles.employeeTable} aria-label="Danh sách nhân viên">
          {employeePage.data?.items.map((employee) => (
            <Link
              key={employee.employeeId}
              href={`/employees/${employee.employeeId}`}
              className={styles.employeeRow}
            >
              <span className={styles.rowAvatar}>
                {employee.fullName.slice(0, 2).toUpperCase()}
              </span>

              <span>
                <strong>{employee.fullName}</strong>
                <small>{employee.externalId}</small>
              </span>

              <span>{employee.partName}</span>
              <span>{employee.positionName}</span>
              <span
                className={
                  employee.isActive ? styles.activeBadge : styles.inactiveBadge
                }
              >
                {employee.isActive ? "Đang làm việc" : "Tạm nghỉ"}
              </span>
              <ChevronRight size={16} />
            </Link>
          ))}
        </div>

        <div className={styles.paginationBar}>
          <button
            type="button"
            disabled={!canGoPrevious}
            onClick={() => setPageNumber((page) => Math.max(1, page - 1))}
          >
            Trước
          </button>

          <span>
            Trang {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={!canGoNext}
            onClick={() => setPageNumber((page) => page + 1)}
          >
            Sau
          </button>
        </div>
      </section>
    </div>
  );
}
