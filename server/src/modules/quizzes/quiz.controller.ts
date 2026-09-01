import type { Request, Response } from "express";

import {
  createQuizSchema,
  quizIdParamSchema,
  updateQuizSchema,
} from "./quiz.schemas.js";

import {
  createQuiz,
  deleteQuiz,
  getQuizById,
  getQuizzes,
  updateQuiz,
} from "./quiz.service.js";

export const listQuizzes = async (
  _req: Request,
  res: Response,
) => {
  try {
    const quizzes = await getQuizzes();

    return res.status(200).json({
      success: true,
      data: {
        quizzes,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudieron obtener los cuestionarios",
    });
  }
};

export const getQuiz = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = quizIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del cuestionario no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const quiz = await getQuizById(parsedParams.data.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "El cuestionario no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        quiz,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener el cuestionario",
    });
  }
};

export const createQuizHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedBody = createQuizSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del cuestionario no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const quiz = await createQuiz(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: {
        quiz,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "MODULE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "El módulo indicado no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo crear el cuestionario",
    });
  }
};

export const updateQuizHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = quizIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del cuestionario no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateQuizSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del cuestionario no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const quiz = await updateQuiz(
      parsedParams.data.id,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        quiz,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "QUIZ_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "El cuestionario no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar el cuestionario",
    });
  }
};

export const deleteQuizHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = quizIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del cuestionario no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    await deleteQuiz(parsedParams.data.id);

    return res.status(200).json({
      success: true,
      message: "Cuestionario eliminado correctamente",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "QUIZ_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "El cuestionario no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo eliminar el cuestionario",
    });
  }
};