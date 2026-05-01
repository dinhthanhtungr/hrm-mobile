export type EmployeeDetailTabKey =
  | "overview"
  | "personal"
  | "job"
  | "organization"
  | "contracts"
  | "account"
  | "payroll"
  | "documents"
  | "history";

export type EmployeeDetailDrawerKey = Exclude<
  EmployeeDetailTabKey,
  "overview" | "history"
>;

export const employeeDetailTabs: {
  key: EmployeeDetailTabKey;
  label: string;
}[] = [
  { key: "overview", label: "Overview" },
  { key: "personal", label: "Cá nhân" },
  { key: "job", label: "Công việc" },
  { key: "organization", label: "Tổ chức" },
  { key: "contracts", label: "Hợp đồng" },
  { key: "account", label: "Tài khoản" },
  { key: "payroll", label: "Lương & BH" },
  { key: "documents", label: "Tài liệu" },
  { key: "history", label: "Lịch sử" },
];

export const employeeDrawerTitles: Record<EmployeeDetailDrawerKey, string> = {
  personal: "Chỉnh sửa thông tin cá nhân",
  job: "Cập nhật công việc",
  organization: "Cập nhật tổ chức",
  contracts: "Quản lý hợp đồng",
  account: "Quản lý tài khoản & quyền",
  payroll: "Cập nhật ngân hàng & bảo hiểm",
  documents: "Quản lý tài liệu",
};
