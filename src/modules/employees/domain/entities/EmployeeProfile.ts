export type EmployeeProfile = {
  address: string;
  avatar: string;
  code: string;
  department: string;
  email: string;
  id: string;
  joinDate: string;
  location: string;
  manager: string;
  name: string;
  phone: string;
  status: string;
  team: string;
  title: string;
};

export type EmployeeDocument = {
  name: string;
  status: string;
  updatedAt: string;
};

export type EmployeeHistory = {
  detail: string;
  event: string;
  time: string;
};
