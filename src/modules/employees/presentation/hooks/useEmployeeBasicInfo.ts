"use client";

import * as React from "react";
import { getCurrentEmployeeId } from "@/core/auth/currentIdentity";
import { EmployeeApiRepository } from "../../infrastructure/api/EmployeeApiRepository";
import type { EmployeeBasicInfo } from "../../domain/entities/EmployeeBasicInfo";

type EmployeeBasicInfoState = {
  data: EmployeeBasicInfo | null;
  error: string | null;
  isLoading: boolean;
};

export function useEmployeeBasicInfo() {
  const [state, setState] = React.useState<EmployeeBasicInfoState>({
    data: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    let isActive = true;
    const repository = new EmployeeApiRepository();

    async function loadEmployeeBasicInfo() {
      await Promise.resolve();

      const employeeId = getCurrentEmployeeId();

      if (!employeeId) {
        if (!isActive) {
          return;
        }

        setState({
          data: null,
          error: "Không tìm thấy mã định danh nhân viên.",
          isLoading: false,
        });
        return;
      }

      try {
        const data = await repository.getBasicInfo(employeeId);

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
          error: "Không tải được thông tin nhân viên.",
          isLoading: false,
        });
      }
    }

    void loadEmployeeBasicInfo();

    return () => {
      isActive = false;
    };
  }, []);

  return state;
}
