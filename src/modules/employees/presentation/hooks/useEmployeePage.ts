"use client";

import * as React from "react";
import type { PagedResult } from "@/core/api/PagedResult";
import { EmployeeApiRepository } from "../../infrastructure/api/EmployeeApiRepository";
import type { EmployeePageItem } from "../../domain/entities/EmployeePageItem";

type UseEmployeePageParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
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
    let isCurrentRequest = true;
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
          sortBy: params.sortBy,
          sortDirection: params.sortDirection,
        });

        if (!isCurrentRequest) {
          return;
        }

        setState({
          data,
          error: null,
          isLoading: false,
        });
      } catch {
        if (!isCurrentRequest) {
          return;
        }

        setState((current) => ({
          data: current.data,
          error: "Không tải được danh sách nhân viên.",
          isLoading: false,
        }));
      }
    }

    void loadEmployees();

    return () => {
      isCurrentRequest = false;
    };
  }, [
    params.pageNumber,
    params.pageSize,
    params.search,
    params.sortBy,
    params.sortDirection,
    params.status,
  ]);

  const stateRef = React.useRef(state);

  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return state;
}
