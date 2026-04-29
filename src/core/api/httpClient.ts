import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  saveAuthSession,
} from "@/core/auth/tokenStorage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiRequestOptions = RequestInit & {
  token?: string;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  roles: string[];
};

export class ApiConfigurationError extends Error {
  constructor() {
    super("NEXT_PUBLIC_API_BASE_URL is not configured.");
    this.name = "ApiConfigurationError";
  }
}

export class ApiRequestError extends Error {
  constructor(readonly status: number) {
    super(`API request failed with status ${status}.`);
    this.name = "ApiRequestError";
  }
}

async function requestNewAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
    body: JSON.stringify({ refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    clearAuthSession();
    return null;
  }

  const session = (await response.json()) as RefreshTokenResponse;

  saveAuthSession({
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    roles: session.roles ?? [],
  });

  return session.accessToken;
}

async function readResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiConfigurationError();
  }

  const shouldUseAuth = options.auth ?? true;
  const shouldRetry = options.retryOnUnauthorized ?? true;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const accessToken = options.token ?? getAccessToken();

  if (shouldUseAuth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.ok) {
    return readResponse<T>(response);
  }

  if (response.status !== 401 || !shouldUseAuth || !shouldRetry) {
    throw new ApiRequestError(response.status);
  }

  const newAccessToken = await requestNewAccessToken();

  if (!newAccessToken) {
    throw new ApiRequestError(401);
  }

  headers.set("Authorization", `Bearer ${newAccessToken}`);

  const retryResponse = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!retryResponse.ok) {
    throw new ApiRequestError(retryResponse.status);
  }

  return readResponse<T>(retryResponse);
}
