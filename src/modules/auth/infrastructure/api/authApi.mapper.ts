import type { AuthSession } from "../../domain/entities/AuthSession";
import type { LoginResponseApiModel } from "./authApi.types";

export function mapLoginResponse(response: LoginResponseApiModel): AuthSession {
  return {
    accessToken: response.accessToken,
    email: response.email ?? null,
    employeeId: response.employeeId ?? null,
    personName: response.userName ?? null,
    refreshToken: response.refreshToken,
    roles: response.roles ?? [],
  };
}
