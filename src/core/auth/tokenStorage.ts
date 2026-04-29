"use client";

const ACCESS_TOKEN_KEY = "col.erp.accesstoken";
const REFRESH_TOKEN_KEY = "col.erp.refreshtoken";
const ROLE_KEY = "col.erp.role";

function canUseStorage() {
  return typeof window !== "undefined";
}

export type PersistedAuthSession = {
  accessToken: string;
  refreshToken: string | null;
  roles: string[];
};

export function saveAuthSession(session: PersistedAuthSession) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);

  if (session.refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  } else {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  window.localStorage.setItem(ROLE_KEY, JSON.stringify(session.roles));
}

export function getAccessToken() {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(ROLE_KEY);
}
