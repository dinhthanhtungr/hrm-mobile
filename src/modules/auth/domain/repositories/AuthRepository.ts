import type { AuthSession } from "../entities/AuthSession";

export type LoginInput = {
  password: string;
  username: string;
};

export interface AuthRepository {
  login(input: LoginInput): Promise<AuthSession>;

  refreshToken(refreshToken: string): Promise<AuthSession>;

  logout(accessToken: string): Promise<void>;
}

