export type LoginResponseApiModel = {
  accessToken: string;
  expiresAtUtc: string;
  userId: string;
  userName?: string | null;
  email?: string | null;
  employeeId?: string | null;
  companyId?: string | null;
  refreshToken: string;
  refreshTokenExpireAtUtc: string;
  roles: string[];
};

export type RefreshTokenResponseApiModel = LoginResponseApiModel;

export type RefreshTokenRequestApiModel = {
  refreshToken: string;
};

export type CurrentUserApiModel = {
  userId: string;
  userName?: string | null;
  email?: string | null;
  employeeId?: string | null;
  companyId?: string | null;
  roles: string[];
};
