import { apiFetch } from "@/core/api/httpClient";
import type { PagedResult } from "@/core/api/PagedResult";
import type { EmployeeBasicInfo } from "../../domain/entities/EmployeeBasicInfo";
import type { EmployeePageItem } from "../../domain/entities/EmployeePageItem";

type EmployeePageItemApiModel = {
  employeeId: string;
  externalId: string;
  fullName: string;
  partName: string;
  positionName: string;
  isActive: boolean;
};

type GetEmployeePageParams = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  partId?: string;
  groupId?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};

function toQueryString(params: GetEmployeePageParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : "";
}

export class EmployeeApiRepository {
  async getPage(
    params: GetEmployeePageParams = {},
  ): Promise<PagedResult<EmployeePageItem>> {
    const queryString = toQueryString({
      pageNumber: params.pageNumber ?? 1,
      pageSize: params.pageSize ?? 10,
      search: params.search,
      status: params.status,
      partId: params.partId,
      groupId: params.groupId,
      sortBy: params.sortBy,
      sortDirection: params.sortDirection,
    });

    return apiFetch<PagedResult<EmployeePageItemApiModel>>(
      `/api/v1/employees${queryString}`,
      {
        method: "GET",
      },
    );
  }

  async getBasicInfo(id: string): Promise<EmployeeBasicInfo> {
    const response = await apiFetch<EmployeeBasicInfo>(
      `/api/v1/employees/${id}/basic-info`,
      {
        method: "GET",
      },
    );

    return response;
  }
}
