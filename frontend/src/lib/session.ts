import { apiFetch } from "./api";
import {
  clearSession,
  getAccessToken,
  saveSession,
  type AuthUser,
} from "./auth";

type MeResponse = {
  success: boolean;
  message?: string;
  data?: {
    user: AuthUser;
  };
};

export const validateSession = async (): Promise<AuthUser | null> => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return null;
  }

  try {
    const response = await apiFetch("/api/v1/me");

    const result = (await response.json()) as MeResponse;

    if (
      response.ok &&
      result.success &&
      result.data?.user
    ) {
      saveSession(
        accessToken,
        result.data.user,
      );

      return result.data.user;
    }

    if (
      response.status === 401 ||
      response.status === 403 ||
      response.status === 404
    ) {
      clearSession();
      return null;
    }

    throw new Error(
      result.message ??
        "No fue posible validar la sesión",
    );
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "No se pudo conectar con el servidor",
      );
    }

    throw error;
  }
};