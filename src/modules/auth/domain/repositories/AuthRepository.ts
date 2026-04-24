import type { AuthSession } from "../entities/AuthSession";

export type LoginInput = {
  password: string;
  username: string;
};

export interface AuthRepository {
  login(input: LoginInput): Promise<AuthSession>;
}
