import type { AuthSession } from "../../domain/entities/AuthSession";
import type { LoginResponseApiModel } from "./authApi.types";

export function mapLoginResponse(response: LoginResponseApiModel): AuthSession {
  return {
    accessToken: response.token?.token ?? "",
    email: response.token?.email ?? null,
    personName: response.token?.personName ?? null,
    refreshToken: response.token?.refreshToken ?? null,
    roles: response.roles ?? [],
  };
}
