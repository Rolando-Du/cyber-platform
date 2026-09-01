import type { NextFunction, Response } from "express";

import type { AuthenticatedRequest } from "./auth.middleware.js";

type UserRole = NonNullable<AuthenticatedRequest["auth"]>["role"];

export const requireRole =
  (...allowedRoles: UserRole[]) =>
  (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.auth) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      });
    }

    if (!allowedRoles.includes(req.auth.role)) {
      return res.status(403).json({
        success: false,
        message: "No tenés permisos para realizar esta acción",
      });
    }

    return next();
  };