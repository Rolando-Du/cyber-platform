import type { Request, Response } from "express";

import {
  createLessonBlockSchema,
  lessonBlockIdParamSchema,
  updateLessonBlockSchema,
} from "./lesson-block.schemas.js";

import {
  createLessonBlock,
  deleteLessonBlock,
  getLessonBlockById,
  getLessonBlocks,
  updateLessonBlock,
} from "./lesson-block.service.js";

export const listLessonBlocks = async (
  _req: Request,
  res: Response,
) => {
  try {
    const blocks = await getLessonBlocks();

    return res.status(200).json({
      success: true,
      data: {
        blocks,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudieron obtener los bloques de contenido",
    });
  }
};

export const getLessonBlock = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = lessonBlockIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del bloque no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const block = await getLessonBlockById(parsedParams.data.id);

    if (!block) {
      return res.status(404).json({
        success: false,
        message: "El bloque de contenido no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        block,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener el bloque de contenido",
    });
  }
};

export const createLessonBlockHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedBody = createLessonBlockSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del bloque no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const block = await createLessonBlock(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: {
        block,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "LESSON_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "La lección indicada no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo crear el bloque de contenido",
    });
  }
};

export const updateLessonBlockHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = lessonBlockIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del bloque no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateLessonBlockSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del bloque no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const block = await updateLessonBlock(
      parsedParams.data.id,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        block,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "LESSON_BLOCK_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "El bloque de contenido no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar el bloque de contenido",
    });
  }
};

export const deleteLessonBlockHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = lessonBlockIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del bloque no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    await deleteLessonBlock(parsedParams.data.id);

    return res.status(200).json({
      success: true,
      message: "Bloque de contenido eliminado correctamente",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "LESSON_BLOCK_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "El bloque de contenido no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo eliminar el bloque de contenido",
    });
  }
};