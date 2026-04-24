const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiRequestOptions = RequestInit & {
  token?: string;
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

export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiConfigurationError();
  }

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiRequestError(response.status);
  }

  return response.json() as Promise<T>;
}
