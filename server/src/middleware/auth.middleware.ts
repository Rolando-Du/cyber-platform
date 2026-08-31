import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../modules/auth/jwt.js";

export type AuthenticatedRequest = Request & {
  auth?: {
    userId: string;
    role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  };
};

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      success: false,
      message: "Token de autenticación requerido",
    });
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Formato de token inválido",
    });
  }

  try {
    const payload = await verifyAccessToken(token);

    req.auth = {
      userId: payload.userId,
      role: payload.role,
    };

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};