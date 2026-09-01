import { getAccessToken } from "./auth";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const apiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${API_URL}${normalizedPath}`;
};

export const apiFetch = async (
  path: string,
  options: RequestInit = {},
) => {
  const token = getAccessToken();

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  return fetch(apiUrl(path), {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  });
};