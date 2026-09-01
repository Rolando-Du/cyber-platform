import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createLessonProgressSchema,
  lessonProgressIdParamSchema,
  updateLessonProgressSchema,
} from "./lesson-progress.schemas.js";

import {
  createLessonProgress,
  getUserLessonProgress,
  getUserLessonProgressById,
  updateLessonProgress,
} from "./lesson-progress.service.js";

export const listMyLessonProgress = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  try {
    const progress = await getUserLessonProgress(req.auth.userId);

    return res.status(200).json({
      success: true,
      data: {
        progress,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener el progreso de las lecciones",
    });
  }
};

export const getMyLessonProgress = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedParams = lessonProgressIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del progreso no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const progress = await getUserLessonProgressById(
      parsedParams.data.id,
      req.auth.userId,
    );

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "El progreso de la lección no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        progress,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener el progreso de la lección",
    });
  }
};

export const createLessonProgressHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedBody = createLessonProgressSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del progreso no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const progress = await createLessonProgress(
      req.auth.userId,
      parsedBody.data,
    );

    return res.status(201).json({
      success: true,
      data: {
        progress,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "LESSON_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "La lección indicada no existe",
        });
      }

      if (error.message === "ENROLLMENT_REQUIRED") {
        return res.status(403).json({
          success: false,
          message: "Debés estar inscripto en el curso para registrar progreso",
        });
      }

      if (error.message === "ENROLLMENT_NOT_ACTIVE") {
        return res.status(409).json({
          success: false,
          message: "La inscripción al curso no está activa",
        });
      }

      if (error.message === "LESSON_PROGRESS_ALREADY_EXISTS") {
        return res.status(409).json({
          success: false,
          message: "Ya existe un registro de progreso para esta lección",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo crear el progreso de la lección",
    });
  }
};

export const updateLessonProgressHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedParams = lessonProgressIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del progreso no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateLessonProgressSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del progreso no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const progress = await updateLessonProgress(
      parsedParams.data.id,
      req.auth.userId,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        progress,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "LESSON_PROGRESS_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "El progreso de la lección no existe",
        });
      }

      if (error.message === "ENROLLMENT_REQUIRED") {
        return res.status(403).json({
          success: false,
          message: "Debés estar inscripto en el curso para actualizar progreso",
        });
      }

      if (error.message === "ENROLLMENT_NOT_ACTIVE") {
        return res.status(409).json({
          success: false,
          message: "La inscripción al curso no está activa",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar el progreso de la lección",
    });
  }
};