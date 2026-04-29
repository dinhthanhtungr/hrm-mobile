import type {
  EmployeeDocument,
  EmployeeHistory,
  EmployeeProfile,
} from "../../domain/entities/EmployeeProfile";

export const employees: EmployeeProfile[] = [
  {
    id: "emp-001",
    avatar: "RH",
    code: "EMP-2024-0041",
    name: "Rem Hoàng",
    title: "Senior HR Executive",
    department: "Human Capital",
    manager: "Nguyễn Thanh An",
    team: "People Operations",
    status: "Đang làm việc",
    location: "Nhà máy Bình Dương",
    joinDate: "12/03/2022",
    email: "rem.hoang@vietaus.com",
    phone: "0902 118 204",
    address: "Thủ Đức, TP. Hồ Chí Minh",
  },
  {
    id: "emp-002",
    avatar: "TA",
    code: "EMP-2023-0108",
    name: "Trần Minh Anh",
    title: "Lab Supervisor",
    department: "Lab",
    manager: "Phạm Quốc Duy",
    team: "Color Matching",
    status: "Đang làm việc",
    location: "Lab Center",
    joinDate: "04/07/2021",
    email: "anh.tran@vietaus.com",
    phone: "0918 220 441",
    address: "Dĩ An, Bình Dương",
  },
  {
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
    joinDate: "22/11/2020",
    email: "long.nguyen@vietaus.com",
    phone: "0937 882 109",
    address: "Biên Hòa, Đồng Nai",
  },
];

export const personalInfo = [
  ["Ngày sinh", "18/08/1996"],
  ["Giới tính", "Nam"],
  ["CCCD", "079096000245"],
  ["Tình trạng", "Đã kết hôn"],
];

export const jobInfo = [
  ["Phòng ban", "Human Capital"],
  ["Chức vụ", "Senior HR Executive"],
  ["Cấp bậc", "L3 - Specialist"],
  ["Loại hợp đồng", "Không xác định thời hạn"],
];

export const organizationInfo = [
  ["Quản lý trực tiếp", "Nguyễn Thanh An"],
  ["Team", "People Operations"],
  ["Chi nhánh", "Bình Dương"],
  ["Cost center", "HC-OPS-01"],
];

export const payrollInfo = [
  ["Lương cơ bản", "22.000.000 VND"],
  ["Phụ cấp", "2.500.000 VND"],
  ["Chu kỳ lương", "Hàng tháng"],
  ["Ngân hàng", "VCB - 1029 3344 5566"],
];

export const roles = ["HC_HRUser", "Leader", "User", "CustomerViewAll"];

export const permissions = [
  "View employee",
  "Edit profile",
  "Approve leave",
  "Export report",
];

export const documents: EmployeeDocument[] = [
  { name: "Hợp đồng lao động", status: "Đã ký", updatedAt: "20/03/2024" },
  { name: "CCCD", status: "Đã xác minh", updatedAt: "14/01/2024" },
  { name: "Cam kết bảo mật", status: "Cần cập nhật", updatedAt: "03/02/2023" },
];

export const history: EmployeeHistory[] = [
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

export function findEmployeeById(id: string) {
  return employees.find((employee) => employee.id === id) ?? null;
}
