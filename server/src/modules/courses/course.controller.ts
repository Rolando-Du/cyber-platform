import type { Request, Response } from "express";

import {
  courseIdParamSchema,
  createCourseSchema,
  updateCourseSchema,
} from "./course.schemas.js";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse,
} from "./course.service.js";

export const listCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await getCourses();

    return res.status(200).json({
      success: true,
      data: {
        courses,
      },
    });
  } catch (error) {
    console.error("List courses error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al obtener los cursos",
    });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  const parsedParams = courseIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "Identificador de curso inválido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const course = await getCourseById(parsedParams.data.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        course,
      },
    });
  } catch (error) {
    console.error("Get course error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al obtener el curso",
    });
  }
};

export const createCourseHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedBody = createCourseSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Datos de curso inválidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const course = await createCourse(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: {
        course,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "LEARNING_PATH_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "La ruta de aprendizaje indicada no existe",
      });
    }

    if (
      error instanceof Error &&
      error.message === "COURSE_SLUG_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Ya existe un curso con ese slug",
      });
    }

    console.error("Create course error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al crear el curso",
    });
  }
};

export const updateCourseHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = courseIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "Identificador de curso inválido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateCourseSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Datos de actualización inválidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const course = await updateCourse(
      parsedParams.data.id,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        course,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "COURSE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    if (
      error instanceof Error &&
      error.message === "COURSE_SLUG_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Ya existe un curso con ese slug",
      });
    }

    console.error("Update course error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al actualizar el curso",
    });
  }
};

export const deleteCourseHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = courseIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "Identificador de curso inválido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    await deleteCourse(parsedParams.data.id);

    return res.status(200).json({
      success: true,
      message: "Curso eliminado correctamente",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "COURSE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    console.error("Delete course error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al eliminar el curso",
    });
  }
};