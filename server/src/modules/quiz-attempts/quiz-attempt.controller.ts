import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createQuizAttemptSchema,
  quizAttemptIdParamSchema,
  submitQuizAttemptSchema,
} from "./quiz-attempt.schemas.js";

import {
  createQuizAttempt,
  getUserQuizAttemptById,
  getUserQuizAttempts,
  submitQuizAttempt,
} from "./quiz-attempt.service.js";

export const listMyQuizAttempts = async (
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
    const attempts = await getUserQuizAttempts(req.auth.userId);

    return res.status(200).json({
      success: true,
      data: {
        attempts,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudieron obtener los intentos",
    });
  }
};

export const getMyQuizAttempt = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedParams = quizAttemptIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del intento no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const attempt = await getUserQuizAttemptById(
      parsedParams.data.id,
      req.auth.userId,
    );

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "El intento no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        attempt,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener el intento",
    });
  }
};

export const createQuizAttemptHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedBody = createQuizAttemptSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del intento no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const attempt = await createQuizAttempt(
      req.auth.userId,
      parsedBody.data,
    );

    return res.status(201).json({
      success: true,
      data: {
        attempt,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "QUIZ_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "El cuestionario indicado no existe",
        });
      }

      if (error.message === "QUIZ_NOT_AVAILABLE") {
        return res.status(409).json({
          success: false,
          message: "El cuestionario no está disponible",
        });
      }

      if (error.message === "QUIZ_HAS_NO_QUESTIONS") {
        return res.status(409).json({
          success: false,
          message: "El cuestionario todavía no tiene preguntas",
        });
      }

      if (error.message === "ENROLLMENT_REQUIRED") {
        return res.status(403).json({
          success: false,
          message:
            "Debés estar inscripto en el curso para realizar el cuestionario",
        });
      }

      if (error.message === "ENROLLMENT_NOT_ACTIVE") {
        return res.status(409).json({
          success: false,
          message: "La inscripción al curso no está activa",
        });
      }

      if (error.message === "QUIZ_ATTEMPT_ALREADY_IN_PROGRESS") {
        return res.status(409).json({
          success: false,
          message:
            "Ya tenés un intento en curso para este cuestionario",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo iniciar el intento",
    });
  }
};

export const submitQuizAttemptHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedParams = quizAttemptIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del intento no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = submitQuizAttemptSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Las respuestas enviadas no son válidas",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const result = await submitQuizAttempt(
      parsedParams.data.id,
      req.auth.userId,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "QUIZ_ATTEMPT_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "El intento no existe",
        });
      }

      if (error.message === "QUIZ_ATTEMPT_ALREADY_COMPLETED") {
        return res.status(409).json({
          success: false,
          message: "El intento ya fue finalizado",
        });
      }

      if (error.message === "ENROLLMENT_REQUIRED") {
        return res.status(403).json({
          success: false,
          message:
            "Debés estar inscripto en el curso para enviar respuestas",
        });
      }

      if (error.message === "ENROLLMENT_NOT_ACTIVE") {
        return res.status(409).json({
          success: false,
          message: "La inscripción al curso no está activa",
        });
      }

      if (error.message === "DUPLICATE_QUESTION_ANSWER") {
        return res.status(400).json({
          success: false,
          message: "No podés responder dos veces la misma pregunta",
        });
      }

      if (error.message === "ALL_QUESTIONS_MUST_BE_ANSWERED") {
        return res.status(400).json({
          success: false,
          message:
            "Debés responder todas las preguntas del cuestionario",
        });
      }

      if (error.message === "DUPLICATE_OPTION_SELECTED") {
        return res.status(400).json({
          success: false,
          message:
            "No podés seleccionar dos veces la misma opción",
        });
      }

      if (error.message === "INVALID_OPTION_FOR_QUESTION") {
        return res.status(400).json({
          success: false,
          message:
            "Una de las opciones seleccionadas no pertenece a la pregunta",
        });
      }

      if (error.message === "QUESTION_REQUIRES_SINGLE_OPTION") {
        return res.status(400).json({
          success: false,
          message:
            "Esta pregunta requiere seleccionar una sola opción",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo finalizar el intento",
    });
  }
};