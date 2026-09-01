import type { Request, Response } from "express";

import {
  createLessonSchema,
  lessonIdParamSchema,
  updateLessonSchema,
} from "./lesson.schemas.js";

import {
  createLesson,
  deleteLesson,
  getLessonById,
  getLessons,
  updateLesson,
} from "./lesson.service.js";

export const listLessons = async (_req: Request, res: Response) => {
  try {
    const lessons = await getLessons();

    return res.status(200).json({
      success: true,
      data: {
        lessons,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudieron obtener las lecciones",
    });
  }
};

export const getLesson = async (req: Request, res: Response) => {
  const parsedParams = lessonIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la lección no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const lesson = await getLessonById(parsedParams.data.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "La lección no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        lesson,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener la lección",
    });
  }
};

export const createLessonHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedBody = createLessonSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos de la lección no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const lesson = await createLesson(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: {
        lesson,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "MODULE_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "El módulo indicado no existe",
        });
      }

      if (error.message === "LESSON_SLUG_ALREADY_EXISTS") {
        return res.status(409).json({
          success: false,
          message: "Ya existe una lección con ese slug",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo crear la lección",
    });
  }
};

export const updateLessonHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = lessonIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la lección no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateLessonSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos de la lección no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const lesson = await updateLesson(
      parsedParams.data.id,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        lesson,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "LESSON_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "La lección no existe",
        });
      }

      if (error.message === "LESSON_SLUG_ALREADY_EXISTS") {
        return res.status(409).json({
          success: false,
          message: "Ya existe una lección con ese slug",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar la lección",
    });
  }
};

export const deleteLessonHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = lessonIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la lección no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    await deleteLesson(parsedParams.data.id);

    return res.status(200).json({
      success: true,
      message: "Lección eliminada correctamente",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "LESSON_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "La lección no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo eliminar la lección",
    });
  }
};