export type AuthSession = {
  accessToken: string;
  email: string | null;
  employeeId: string | null;
  personName: string | null;
  refreshToken: string | null;
  roles: string[];
};
