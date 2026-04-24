import { apiFetch } from "@/core/api/httpClient";
import type { AuthSession } from "../../domain/entities/AuthSession";
import type { AuthRepository, LoginInput } from "../../domain/repositories/AuthRepository";
import { mapLoginResponse } from "./authApi.mapper";
import type { LoginResponseApiModel } from "./authApi.types";

export class AuthApiRepository implements AuthRepository {
  async login(input: LoginInput): Promise<AuthSession> {
    const response = await apiFetch<LoginResponseApiModel>("/api/Account/login", {
      body: JSON.stringify({
        password: input.password,
        username: input.username,
      }),
      method: "POST",
    });

    const session = mapLoginResponse(response);

    if (!session.accessToken) {
      throw new Error("Login response does not include an access token.");
    }

    return session;
  }
}
