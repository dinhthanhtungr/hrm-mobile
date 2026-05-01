export type EmployeePersonalProfile = {
  dateOfBirth: string;
  gender: string;
  identifier: string;
  identifierIssueDate: string;
  identifierIssuePlace: string;
  ethnicity: string;
  educationLevel: string;
  permanentAddress: string;
  temporaryAddress: string;
  maritalStatus: string;
};

export type EmployeeWorkProfile = {
  attendanceCode: string;
  partName: string;
  groupName: string;
  jobTitleName: string;
  levelName: string;
  workLocation: string;
  probationEndDate: string;
  effectiveFrom: string;
  effectiveTo: string;
  onboardingTrainingDate: string;
};

export type EmployeeContract = {
  contractNo: string;
  contractType: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

export type EmployeeBankAccount = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isPayrollAccount: boolean;
};

export type EmployeeInsuranceProfile = {
  socialInsuranceNumber: string;
  healthInsuranceNumber: string;
  taxCode: string;
};

export type EmployeeRelative = {
  fullName: string;
  relationship: string;
  phoneNumber: string;
  isEmergencyContact: boolean;
};

export type EmployeeDocument = {
  documentType: string;
  name: string;
  note: string;
  status: string;
  updatedAt: string;
};

export type EmployeeAccount = {
  email: string;
  phoneNumber: string;
  userName: string;
  roles: string[];
  permissions: string[];
  isActive: boolean;
};

export type EmployeeHistory = {
  detail: string;
  event: string;
  time: string;
};

export type EmployeeProfile = {
  account: EmployeeAccount;
  address: string;
  avatar: string;
  bankAccounts: EmployeeBankAccount[];
  code: string;
  contracts: EmployeeContract[];
  department: string;
  documents: EmployeeDocument[];
  email: string;
  history: EmployeeHistory[];
  id: string;
  insurance: EmployeeInsuranceProfile;
  joinDate: string;
  location: string;
  manager: string;
  name: string;
  personal: EmployeePersonalProfile;
  phone: string;
  relatives: EmployeeRelative[];
  status: string;
  team: string;
  title: string;
  workProfile: EmployeeWorkProfile;
};
