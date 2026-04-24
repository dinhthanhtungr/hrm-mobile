export type TokenInfoApiModel = {
  email?: string | null;
  expiration?: string;
  personName?: string | null;
  refreshToken?: string | null;
  refreshTokenExpirationDateTime?: string;
  token?: string | null;
};

export type LoginResponseApiModel = {
  roles?: string[] | null;
  token?: TokenInfoApiModel | null;
};
