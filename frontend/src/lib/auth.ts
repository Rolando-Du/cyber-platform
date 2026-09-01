export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  status: string;
  createdAt: string;
};

const ACCESS_TOKEN_KEY = "cyber_access_token";
const USER_KEY = "cyber_user";

export const saveSession = (
  accessToken: string,
  user: AuthUser,
) => {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    accessToken,
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user),
  );
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getStoredUser = (): AuthUser | null => {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  return Boolean(
    getAccessToken() && getStoredUser(),
  );
};