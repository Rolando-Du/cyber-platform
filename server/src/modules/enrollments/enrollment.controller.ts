import type { Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

import {
  createEnrollmentSchema,
  enrollmentIdParamSchema,
  updateEnrollmentSchema,
} from "./enrollment.schemas.js";

import {
  createEnrollment,
  getUserEnrollmentById,
  getUserEnrollments,
  updateEnrollment,
} from "./enrollment.service.js";

export const listMyEnrollments = async (
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
    const enrollments = await getUserEnrollments(req.auth.userId);

    return res.status(200).json({
      success: true,
      data: {
        enrollments,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudieron obtener las inscripciones",
    });
  }
};

export const getMyEnrollment = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedParams = enrollmentIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la inscripción no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const enrollment = await getUserEnrollmentById(
      parsedParams.data.id,
      req.auth.userId,
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "La inscripción no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        enrollment,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener la inscripción",
    });
  }
};

export const createEnrollmentHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedBody = createEnrollmentSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos de la inscripción no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const enrollment = await createEnrollment(
      req.auth.userId,
      parsedBody.data,
    );

    return res.status(201).json({
      success: true,
      data: {
        enrollment,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "COURSE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "El curso indicado no existe",
        });
      }

      if (error.message === "COURSE_NOT_AVAILABLE") {
        return res.status(409).json({
          success: false,
          message: "El curso no está disponible para inscripción",
        });
      }

      if (error.message === "ENROLLMENT_ALREADY_EXISTS") {
        return res.status(409).json({
          success: false,
          message: "Ya estás inscripto en este curso",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo crear la inscripción",
    });
  }
};

export const updateEnrollmentHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.auth) {
    return res.status(401).json({
      success: false,
      message: "Usuario no autenticado",
    });
  }

  const parsedParams = enrollmentIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la inscripción no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateEnrollmentSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos de la inscripción no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const enrollment = await updateEnrollment(
      parsedParams.data.id,
      req.auth.userId,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        enrollment,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "ENROLLMENT_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "La inscripción no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar la inscripción",
    });
  }
};