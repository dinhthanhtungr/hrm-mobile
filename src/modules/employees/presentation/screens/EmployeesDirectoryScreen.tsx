"use client";

import * as React from "react";

import { Pencil, Trash2 } from "lucide-react";
import { RowActions } from "@/shared/ui/DataDisplays/RowActions/RowActions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { AppButton } from "@/shared/ui/Buttons/AppButton";
import { FilterPopover } from "@/shared/ui/DataDisplays/FilterPopover/FilterPopover";
import { PaginationBar } from "@/shared/ui/DataDisplays/Pagination/PaginationBar";
import { SortControl } from "@/shared/ui/DataDisplays/SortControl/SortControl";
import {
  AppTable,
  type AppTableColumn,
} from "@/shared/ui/DataDisplays/Table/AppTable/AppTable";
import { AppDropdown } from "@/shared/ui/Forms/Inputs/AppDropdown/AppDropdown";
import { AppSearchInput } from "@/shared/ui/Forms/Inputs/AppSearchInput/AppSearchInput";
import type { EmployeePageItem } from "../../domain/entities/EmployeePageItem";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useEmployeePage } from "../hooks/useEmployeePage";
import styles from "./EmployeesDirectoryScreen.module.css";

export function EmployeesDirectoryScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = React.useState("fullName");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc",
  );
  const [keyword, setKeyword] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const debouncedKeyword = useDebouncedValue(keyword, 350);

  const pageNumber = Number(searchParams.get("page") ?? "1");
  const safePageNumber =
    Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  const employeePage = useEmployeePage({
    pageNumber: safePageNumber,
    pageSize: 10,
    search: debouncedKeyword,
    sortBy,
    sortDirection,
    status: status === "all" ? undefined : status,
  });

  const currentPage = employeePage.data?.pageNumber ?? safePageNumber;
  const totalPages = employeePage.data?.totalPages ?? 1;
  const canGoPrevious = employeePage.data?.hasPreviousPage ?? safePageNumber > 1;
  const canGoNext = employeePage.data?.hasNextPage ?? false;
  const employees = employeePage.data?.items ?? [];

  const columns = React.useMemo<AppTableColumn<EmployeePageItem>[]>(
    () => [
      {
        key: "employee",
        header: "Nhân viên",
        render: (employee) => (
          <span className={styles.employeeCell}>
            <span className={styles.rowAvatar}>
              {employee.fullName.slice(0, 2).toUpperCase()}
            </span>

            <span>
              <strong>{employee.fullName}</strong>
              <small>{employee.externalId}</small>
            </span>
          </span>
        ),
      },
      {
        key: "part",
        header: "Phòng ban",
        render: (employee) => employee.partName,
      },
      {
        key: "position",
        header: "Chức vụ",
        render: (employee) => employee.positionName,
      },
      {
        key: "status",
        header: "Trạng thái",
        render: (employee) => (
          <span
            className={
              employee.isActive ? styles.activeBadge : styles.inactiveBadge
            }
          >
            {employee.isActive ? "Đang làm việc" : "Tạm nghỉ"}
          </span>
        ),
      },
      {
        key: "actions",
        header: "",
        align: "right",
        width: "60px",
        render: (employee) => (
          <RowActions
            actions={[
              {
                key: "edit",
                label: "Chỉnh sửa",
                icon: <Pencil size={16} />,
                onSelect: () => {
                  router.push(`/employees/${employee.employeeId}`);
                },
              },
              {
                key: "remove",
                label: "Xóa",
                icon: <Trash2 size={16} />,
                danger: true,
                onSelect: () => {
                  console.log("remove", employee.employeeId);
                },
              },
            ]}
          />
        ),
      }
    ],
    [router],
  );

  function changePage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function resetPageAfterControlChange() {
    if (safePageNumber !== 1) {
      changePage(1);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.titleGroup}>
          <h1>Quản lý nhân sự</h1>

          <SortControl
            value={sortBy}
            direction={sortDirection}
            options={[
              { label: "Tên nhân viên", value: "fullName" },
              { label: "Mã nhân viên", value: "externalId" },
              { label: "Phòng ban", value: "partName" },
            ]}
            onChange={(nextSortBy) => {
              setSortBy(nextSortBy);
              resetPageAfterControlChange();
            }}
            onDirectionChange={(nextDirection) => {
              setSortDirection(nextDirection);
              resetPageAfterControlChange();
            }}
          />
        </div>

        <div className={styles.headerActions}>
          <AppSearchInput
            className={styles.employeeSearch}
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              resetPageAfterControlChange();
            }}
            onClear={() => {
              setKeyword("");
              resetPageAfterControlChange();
            }}
            placeholder="Tìm tên, mã nhân viên..."
          />

          <FilterPopover
            activeCount={status !== "all" ? 1 : 0}
            onClear={() => {
              setStatus("all");
              resetPageAfterControlChange();
            }}
          >
            {({ close }) => (
              <div className={styles.filterContent}>
                <AppDropdown
                  label="Trạng thái"
                  value={status}
                  options={[
                    { label: "Tất cả", value: "all" },
                    { label: "Đang làm việc", value: "active" },
                    { label: "Tạm nghỉ", value: "inactive" },
                  ]}
                  onChange={(nextValue) => {
                    if (typeof nextValue === "string") {
                      setStatus(nextValue);
                      resetPageAfterControlChange();
                      close();
                    }
                  }}
                />
              </div>
            )}
          </FilterPopover>

          <AppButton type="button">
            <Plus size={16} />
            Thêm nhân viên
          </AppButton>
        </div>
      </div>

      {employeePage.error ? (
        <p className={styles.errorText}>{employeePage.error}</p>
      ) : null}

      <AppTable
        items={employees}
        columns={columns}
        getRowKey={(employee) => employee.employeeId}
        isLoading={employeePage.isLoading}
        emptyState="Không có nhân viên."
      />

      <PaginationBar
        pageNumber={currentPage}
        totalPages={totalPages}
        hasPreviousPage={canGoPrevious}
        hasNextPage={canGoNext}
        onPageChange={changePage}
      />
    </div>
  );
}
