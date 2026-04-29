"use client";

import * as React from "react";
import type { PagedResult } from "@/core/api/PagedResult";
import { EmployeeApiRepository } from "../../infrastructure/api/EmployeeApiRepository";
import type { EmployeePageItem } from "../../domain/entities/EmployeePageItem";

type UseEmployeePageParams = {
  pageNumber: number;
  pageSize: number;
  search: string;
  status: string;
};

type EmployeePageState = {
  data: PagedResult<EmployeePageItem> | null;
  error: string | null;
  isLoading: boolean;
};

export function useEmployeePage(params: UseEmployeePageParams) {
  const [state, setState] = React.useState<EmployeePageState>({
    data: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    let isActive = true;
    const repository = new EmployeeApiRepository();

    async function loadEmployees() {
      setState((current) => ({
        ...current,
        error: null,
        isLoading: true,
      }));

      try {
        const data = await repository.getPage({
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
          search: params.search,
          status: params.status,
        });

        if (!isActive) {
          return;
        }

        setState({
          data,
          error: null,
          isLoading: false,
        });
      } catch {
        if (!isActive) {
          return;
        }

        setState({
          data: null,
          error: "Không tải được danh sách nhân viên.",
          isLoading: false,
        });
      }
    }

    void loadEmployees();

    return () => {
      isActive = false;
    };
  }, [params.pageNumber, params.pageSize, params.search, params.status]);

  return state;
}
