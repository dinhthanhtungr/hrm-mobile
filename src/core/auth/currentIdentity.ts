"use client";

import { getAccessToken } from "./tokenStorage";
import { decodeJwtPayload, type JwtPayload } from "./jwt";

const NAME_CLAIM =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

function getCurrentJwtPayload() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return null;
  }

  return decodeJwtPayload(accessToken);
}

function getJwtUserName(payload: JwtPayload) {
  if (typeof payload.unique_name === "string") {
    return payload.unique_name;
  }

  const nameClaim = payload[NAME_CLAIM];

  return typeof nameClaim === "string" ? nameClaim : null;
}

function getJwtRoles(payload: JwtPayload) {
  const roleClaim = payload[ROLE_CLAIM];

  if (Array.isArray(roleClaim)) {
    return roleClaim.filter((role): role is string => typeof role === "string");
  }

  if (typeof roleClaim === "string") {
    return [roleClaim];
  }

  return [];
}

export function getCurrentIdentity() {
  const payload = getCurrentJwtPayload();

  if (!payload) {
    return null;
  }

  return {
    userId: typeof payload.sub === "string" ? payload.sub : null,
    userName: getJwtUserName(payload),
    email: typeof payload.email === "string" ? payload.email : null,
    employeeId: typeof payload.employeeId === "string" ? payload.employeeId : null,
    companyId: typeof payload.companyId === "string" ? payload.companyId : null,
    roles: getJwtRoles(payload),
  };
}

export function getCurrentEmployeeId() {
  return getCurrentIdentity()?.employeeId ?? null;
}
