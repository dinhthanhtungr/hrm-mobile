export type AuthSession = {
  accessToken: string;
  email: string | null;
  personName: string | null;
  refreshToken: string | null;
  roles: string[];
};
