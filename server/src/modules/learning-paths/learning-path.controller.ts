import type { Request, Response } from "express";

import {
  createLearningPathSchema,
  learningPathIdParamSchema,
  updateLearningPathSchema,
} from "./learning-path.schemas.js";
import {
  createLearningPath,
  deleteLearningPath,
  getLearningPathById,
  getLearningPaths,
  updateLearningPath,
} from "./learning-path.service.js";

export const listLearningPaths = async (_req: Request, res: Response) => {
  try {
    const learningPaths = await getLearningPaths();

    return res.status(200).json({
      success: true,
      data: {
        learningPaths,
      },
    });
  } catch (error) {
    console.error("List learning paths error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al obtener las rutas de aprendizaje",
    });
  }
};

export const getLearningPath = async (req: Request, res: Response) => {
  const parsedParams = learningPathIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "Identificador de ruta de aprendizaje inválido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const learningPath = await getLearningPathById(parsedParams.data.id);

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Ruta de aprendizaje no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        learningPath,
      },
    });
  } catch (error) {
    console.error("Get learning path error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al obtener la ruta de aprendizaje",
    });
  }
};

export const createLearningPathHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedBody = createLearningPathSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Datos de ruta de aprendizaje inválidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const learningPath = await createLearningPath(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: {
        learningPath,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "LEARNING_PATH_SLUG_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Ya existe una ruta de aprendizaje con ese slug",
      });
    }

    console.error("Create learning path error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al crear la ruta de aprendizaje",
    });
  }
};

export const updateLearningPathHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = learningPathIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "Identificador de ruta de aprendizaje inválido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateLearningPathSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Datos de actualización inválidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const learningPath = await updateLearningPath(
      parsedParams.data.id,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        learningPath,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "LEARNING_PATH_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Ruta de aprendizaje no encontrada",
      });
    }

    if (
      error instanceof Error &&
      error.message === "LEARNING_PATH_SLUG_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Ya existe una ruta de aprendizaje con ese slug",
      });
    }

    console.error("Update learning path error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al actualizar la ruta de aprendizaje",
    });
  }
};

export const deleteLearningPathHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = learningPathIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "Identificador de ruta de aprendizaje inválido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    await deleteLearningPath(parsedParams.data.id);

    return res.status(200).json({
      success: true,
      message: "Ruta de aprendizaje eliminada correctamente",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "LEARNING_PATH_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Ruta de aprendizaje no encontrada",
      });
    }

    console.error("Delete learning path error:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al eliminar la ruta de aprendizaje",
    });
  }
};