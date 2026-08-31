import { SignJWT, jwtVerify } from "jose";

import { env } from "../../config/env.js";

const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

const JWT_ISSUER = "cyber-platform-api";
const JWT_AUDIENCE = "cyber-platform-app";

export type AuthTokenPayload = {
  userId: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
};

export const generateAccessToken = async (
  payload: AuthTokenPayload,
): Promise<string> => {
  return new SignJWT({
    userId: payload.userId,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime("8h")
    .sign(jwtSecret);
};

export const verifyAccessToken = async (
  token: string,
): Promise<AuthTokenPayload> => {
  const { payload } = await jwtVerify(token, jwtSecret, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });

  if (
    typeof payload.userId !== "string" ||
    (payload.role !== "STUDENT" &&
      payload.role !== "INSTRUCTOR" &&
      payload.role !== "ADMIN")
  ) {
    throw new Error("Token inválido");
  }

  return {
    userId: payload.userId,
    role: payload.role,
  };
};