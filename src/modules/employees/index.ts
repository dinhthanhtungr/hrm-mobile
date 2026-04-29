export type { EmployeeBasicInfo } from "./domain/entities/EmployeeBasicInfo";
export type {
  EmployeeDocument,
  EmployeeHistory,
  EmployeeProfile,
} from "./domain/entities/EmployeeProfile";
export {
  documents,
  employees,
  findEmployeeById,
  history,
  jobInfo,
  organizationInfo,
  payrollInfo,
  permissions,
  personalInfo,
  roles,
} from "./presentation/data/mockEmployees";
export { useEmployeeBasicInfo } from "./presentation/hooks/useEmployeeBasicInfo";
export { EmployeeDetailScreen } from "./presentation/screens/EmployeeDetailScreen";
export { EmployeesDirectoryScreen } from "./presentation/screens/EmployeesDirectoryScreen";
