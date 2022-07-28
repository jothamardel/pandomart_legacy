import Cookie from "js-cookie";
import SSRCookie from "cookie";
import {
  ADMIN,
  AUTH_CRED,
  PERMISSIONS,
  STAFF,
  STORE_OWNER,
  SUPER_ADMIN,
  TOKEN,
  USER
} from "./constants";

export const allowedRoles = [SUPER_ADMIN, STORE_OWNER, STAFF, ADMIN];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER, ADMIN];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF, ADMIN];
export const adminOnly = [SUPER_ADMIN, ADMIN];
export const ownerOnly = [STORE_OWNER, ADMIN];

export function setAuthCredentials(token: string, permissions: any) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions }));
}

export function setUserCredentials( user: any) {
  Cookie.set(USER, JSON.stringify({ user}));
}

export function getUserCredentials() {
  let userCred = Cookie.get(USER);

  return JSON.parse(userCred);
}

export function getAuthCredentials(context?: any): {
  token: string | null;
  permissions: string[] | null;
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permissions: null };
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? "");
}

export function hasAccess(
  _allowedRoles: object[],
  _userPermissions?: string[] | undefined | null
) {
  if (_allowedRoles) {
    return Boolean(
      _allowedRoles?.find((aRole: any) => (aRole.name === 'admin' || aRole.name === 'vendor'))
    );
  }
  return false;
}
export function isAuthenticated(_cookies: any) {
  return (
    !!_cookies[TOKEN] &&
    Array.isArray(_cookies[PERMISSIONS]) &&
    !!_cookies[PERMISSIONS].length
  );
}
