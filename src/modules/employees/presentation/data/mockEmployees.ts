import type {
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
} from "../../domain/entities/EmployeeProfile";

const personalProfile: EmployeePersonalProfile = {
  dateOfBirth: "18/08/1996",
  gender: "Nam",
  identifier: "079096000245",
  identifierIssueDate: "12/04/2021",
  identifierIssuePlace: "Cục Cảnh sát QLHC về TTXH",
  ethnicity: "Kinh",
  educationLevel: "Đại học",
  permanentAddress: "Thủ Đức, TP. Hồ Chí Minh",
  temporaryAddress: "Dĩ An, Bình Dương",
  maritalStatus: "Đã kết hôn",
};

const workProfile: EmployeeWorkProfile = {
  attendanceCode: "HC-0202",
  partName: "Human Capital",
  groupName: "People Operations",
  jobTitleName: "Senior HR Executive",
  levelName: "L3 - Specialist",
  workLocation: "Nhà máy Bình Dương",
  probationEndDate: "12/05/2022",
  effectiveFrom: "12/03/2022",
  effectiveTo: "Hiện tại",
  onboardingTrainingDate: "14/03/2022",
};

const contracts: EmployeeContract[] = [
  {
    contractNo: "HDLD-2024-0041",
    contractType: "Không xác định thời hạn",
    startDate: "12/03/2024",
    endDate: "Hiện tại",
    isCurrent: true,
  },
  {
    contractNo: "TV-2022-0041",
    contractType: "Thử việc",
    startDate: "12/03/2022",
    endDate: "12/05/2022",
    isCurrent: false,
  },
];

const bankAccounts: EmployeeBankAccount[] = [
  {
    bankName: "Vietcombank",
    accountNumber: "102933445566",
    accountHolder: "REM HOANG",
    isPayrollAccount: true,
  },
];

const insurance: EmployeeInsuranceProfile = {
  socialInsuranceNumber: "7422000123",
  healthInsuranceNumber: "DN4010123456789",
  taxCode: "8462109921",
};

const relatives: EmployeeRelative[] = [
  {
    fullName: "Nguyễn Thị An",
    relationship: "Vợ/chồng",
    phoneNumber: "0908 112 233",
    isEmergencyContact: true,
  },
  {
    fullName: "Hoàng Văn Bình",
    relationship: "Cha",
    phoneNumber: "0912 220 441",
    isEmergencyContact: false,
  },
];

const documents: EmployeeDocument[] = [
  {
    documentType: "Hợp đồng lao động",
    name: "HDLD-2024-0041.pdf",
    status: "Đã xác minh",
    note: "Bản scan có chữ ký hai bên",
    updatedAt: "20/03/2024",
  },
  {
    documentType: "CCCD",
    name: "cccd-rem.pdf",
    status: "Đã xác minh",
    note: "Còn hiệu lực",
    updatedAt: "14/01/2024",
  },
  {
    documentType: "Bằng cấp",
    name: "bang-dai-hoc.pdf",
    status: "Đã nộp",
    note: "Chờ đối chiếu bản gốc",
    updatedAt: "03/02/2023",
  },
];

const account: EmployeeAccount = {
  userName: "rem",
  email: "rem@vietaus.com",
  phoneNumber: "0902 118 204",
  roles: ["HC_HRUser", "Leader", "User", "CustomerViewAll"],
  permissions: ["View employee", "Edit profile", "Approve leave", "Export report"],
  isActive: true,
};

const history: EmployeeHistory[] = [
  {
    event: "Cập nhật chức vụ",
    detail: "HR Executive -> Senior HR Executive",
    time: "12/04/2026",
  },
  {
    event: "Thay đổi quản lý",
    detail: "Chuyển về People Operations",
    time: "01/01/2026",
  },
  {
    event: "Tạo hồ sơ",
    detail: "Onboarding hoàn tất",
    time: "12/03/2022",
  },
];

function createEmployee(overrides: Partial<EmployeeProfile>): EmployeeProfile {
  return {
    id: "emp-001",
    avatar: "RH",
    code: "EMP-2024-0041",
    name: "Rem",
    title: workProfile.jobTitleName,
    department: workProfile.partName,
    manager: "Nguyễn Thanh An",
    team: workProfile.groupName,
    status: "Đang làm việc",
    location: workProfile.workLocation,
    joinDate: workProfile.effectiveFrom,
    email: account.email,
    phone: account.phoneNumber,
    address: personalProfile.temporaryAddress,
    personal: personalProfile,
    workProfile,
    contracts,
    bankAccounts,
    insurance,
    relatives,
    documents,
    account,
    history,
    ...overrides,
  };
}

export const employees: EmployeeProfile[] = [
  createEmployee({}),
  createEmployee({
    id: "emp-002",
    avatar: "TA",
    code: "EMP-2023-0108",
    name: "Trần Minh Anh",
    title: "Lab Supervisor",
    department: "Lab",
    manager: "Phạm Quốc Duy",
    team: "Color Matching",
    location: "Lab Center",
    email: "anh.tran@vietaus.com",
    phone: "0918 220 441",
    address: "Dĩ An, Bình Dương",
  }),
  createEmployee({
    id: "emp-003",
    avatar: "NL",
    code: "EMP-2022-0029",
    name: "Nguyễn Gia Long",
    title: "Production Leader",
    department: "Manufacture",
    manager: "Lê Văn Phúc",
    team: "Line A",
    status: "Tạm nghỉ",
    location: "Xưởng 2",
    email: "long.nguyen@vietaus.com",
    phone: "0937 882 109",
    address: "Biên Hòa, Đồng Nai",
  }),
];

export function getPersonalInfo(employee: EmployeeProfile) {
  return [
    ["Ngày sinh", employee.personal.dateOfBirth],
    ["Giới tính", employee.personal.gender],
    ["CCCD", employee.personal.identifier],
    ["Ngày cấp", employee.personal.identifierIssueDate],
    ["Nơi cấp", employee.personal.identifierIssuePlace],
    ["Dân tộc", employee.personal.ethnicity],
    ["Trình độ", employee.personal.educationLevel],
    ["Tình trạng", employee.personal.maritalStatus],
    ["Thường trú", employee.personal.permanentAddress],
    ["Tạm trú", employee.personal.temporaryAddress],
  ];
}

export function getJobInfo(employee: EmployeeProfile) {
  return [
    ["Mã chấm công", employee.workProfile.attendanceCode],
    ["Phòng ban", employee.workProfile.partName],
    ["Nhóm", employee.workProfile.groupName],
    ["Chức vụ", employee.workProfile.jobTitleName],
    ["Cấp bậc", employee.workProfile.levelName],
    ["Nơi làm việc", employee.workProfile.workLocation],
    ["Hết thử việc", employee.workProfile.probationEndDate],
    ["Hiệu lực từ", employee.workProfile.effectiveFrom],
    ["Hiệu lực đến", employee.workProfile.effectiveTo],
    ["Đào tạo onboarding", employee.workProfile.onboardingTrainingDate],
  ];
}

export function getOrganizationInfo(employee: EmployeeProfile) {
  return [
    ["Quản lý trực tiếp", employee.manager],
    ["Team", employee.team],
    ["Phòng ban", employee.department],
    ["Chi nhánh", employee.location],
  ];
}

export function getInsuranceInfo(employee: EmployeeProfile) {
  return [
    ["Số BHXH", employee.insurance.socialInsuranceNumber],
    ["Số BHYT", employee.insurance.healthInsuranceNumber],
    ["Mã số thuế", employee.insurance.taxCode],
  ];
}

export function getBankInfo(accountItem: EmployeeBankAccount) {
  return [
    ["Ngân hàng", accountItem.bankName],
    ["Số tài khoản", accountItem.accountNumber],
    ["Chủ tài khoản", accountItem.accountHolder],
    ["Tài khoản nhận lương", accountItem.isPayrollAccount ? "Có" : "Không"],
  ];
}

export function findEmployeeById(id: string) {
  return employees.find((employee) => employee.id === id) ?? null;
}

export function createMockEmployeeProfile(id: string): EmployeeProfile {
  const suffix = id.slice(0, 2).toUpperCase();

  return createEmployee({
    id,
    avatar: suffix || "NV",
    code: `EMP-${id.slice(0, 8).toUpperCase()}`,
    name: "Nhân viên demo",
    title: "HR Staff",
    department: "Human Capital",
    manager: "Nguyễn Thanh An",
    team: "People Operations",
    status: "Đang làm việc",
    location: "Nhà máy Bình Dương",
    joinDate: "01/01/2024",
    email: "employee.demo@vietaus.com",
    phone: "0900 000 000",
    address: "Bình Dương",
  });
}
