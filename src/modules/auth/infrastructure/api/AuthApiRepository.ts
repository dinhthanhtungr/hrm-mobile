import { apiFetch } from "@/core/api/httpClient";
import type { AuthSession } from "../../domain/entities/AuthSession";
import type { AuthRepository, LoginInput } from "../../domain/repositories/AuthRepository";
import { mapLoginResponse } from "./authApi.mapper";
import type { LoginResponseApiModel } from "./authApi.types";

export class AuthApiRepository implements AuthRepository {
  async login(input: LoginInput): Promise<AuthSession> {
    const response = await apiFetch<LoginResponseApiModel>("/api/v1/auth/login", {
      auth: false,
      body: JSON.stringify({
        userNameOrEmail: input.username,
        password: input.password,
        useCookie: false,
      }),
      method: "POST",
      retryOnUnauthorized: false,
    });

    const session = mapLoginResponse(response);

    if (!session.accessToken) {
      throw new Error("Login response does not include an access token.");
    }

    return session;
  }


  async refreshToken(refreshToken: string): Promise<AuthSession> {
    const response = await apiFetch<LoginResponseApiModel>("/api/v1/auth/refresh-token", {
      auth: false,
      body: JSON.stringify({ refreshToken }),
      method: "POST",
      retryOnUnauthorized: false,
    });

    return mapLoginResponse(response);
  }


  async logout(accessToken: string): Promise<void> {
    await apiFetch("/api/v1/auth/logout", {
      method: "POST",
      token: accessToken,
      retryOnUnauthorized: false,
    });
  }

}
