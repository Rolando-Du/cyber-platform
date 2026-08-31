import type { Request, Response } from "express";

import { loginSchema, registerSchema } from "./auth.schemas.js";
import { loginUser, registerUser } from "./auth.service.js";

export const register = async (req: Request, res: Response) => {
  const parsedBody = registerSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Datos de registro inválidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const result = await registerUser(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        success: false,
        message: "Ya existe un usuario registrado con ese correo electrónico",
      });
    }

    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al registrar el usuario",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsedBody = loginSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Datos de inicio de sesión inválidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const result = await loginUser(parsedBody.data);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        success: false,
        message: "Correo electrónico o contraseña incorrectos",
      });
    }

    if (error instanceof Error && error.message === "USER_NOT_ACTIVE") {
      return res.status(403).json({
        success: false,
        message: "El usuario no está activo",
      });
    }

    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al iniciar sesión",
    });
  }
};