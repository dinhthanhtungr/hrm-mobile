"use client";

import { useRouter } from "next/navigation";
import { clearAuthSession, getAccessToken } from "@/core/auth/tokenStorage";
import { routes } from "@/core/config/routes";
import { AuthApiRepository } from "../../infrastructure/api/AuthApiRepository";
import { ApiRequestError } from "@/core/api/httpClient";

export function useLogout() {
  const router = useRouter();

  async function logout() {
    const accessToken = getAccessToken();

    try {
      if (accessToken) {
        const authRepository = new AuthApiRepository();
        await authRepository.logout(accessToken);
      }
    } catch (error) {
      if (!(error instanceof ApiRequestError && error.status === 401)){
        console.error("Logout failed:", error);
      }
    }
     finally {
      clearAuthSession();
      router.push(routes.login);
    }
  }

  return { logout };
}
