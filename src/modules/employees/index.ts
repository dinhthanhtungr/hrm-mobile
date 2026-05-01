export type { EmployeeBasicInfo } from "./domain/entities/EmployeeBasicInfo";
export type {
  EmployeeAccount,
  EmployeeBankAccount,
  EmployeeContract,
  EmployeeDocument,
  EmployeeHistory,
  EmployeeInsuranceProfile,
  EmployeePersonalProfile,
  EmployeeProfile,
  EmployeeRelative,
  EmployeeWorkProfile,
} from "./domain/entities/EmployeeProfile";
export {
  createMockEmployeeProfile,
  employees,
  findEmployeeById,
  getBankInfo,
  getInsuranceInfo,
  getJobInfo,
  getOrganizationInfo,
  getPersonalInfo,
} from "./presentation/data/mockEmployees";
export { useEmployeeBasicInfo } from "./presentation/hooks/useEmployeeBasicInfo";
export { EmployeeDetailScreen } from "./presentation/screens/EmployeeDetailScreen";
export { EmployeesDirectoryScreen } from "./presentation/screens/EmployeesDirectoryScreen";
