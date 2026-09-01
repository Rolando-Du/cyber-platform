import type { Request, Response } from "express";

import {
  createQuestionSchema,
  questionIdParamSchema,
  updateQuestionSchema,
} from "./question.schemas.js";

import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "./question.service.js";

export const listQuestions = async (
  _req: Request,
  res: Response,
) => {
  try {
    const questions = await getQuestions();

    return res.status(200).json({
      success: true,
      data: {
        questions,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudieron obtener las preguntas",
    });
  }
};

export const getQuestion = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = questionIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la pregunta no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const question = await getQuestionById(parsedParams.data.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "La pregunta no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        question,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener la pregunta",
    });
  }
};

export const createQuestionHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedBody = createQuestionSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos de la pregunta no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const question = await createQuestion(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: {
        question,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "QUIZ_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "El cuestionario indicado no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo crear la pregunta",
    });
  }
};

export const updateQuestionHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = questionIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la pregunta no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateQuestionSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos de la pregunta no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const question = await updateQuestion(
      parsedParams.data.id,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        question,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "QUESTION_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "La pregunta no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar la pregunta",
    });
  }
};

export const deleteQuestionHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = questionIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la pregunta no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    await deleteQuestion(parsedParams.data.id);

    return res.status(200).json({
      success: true,
      message: "Pregunta eliminada correctamente",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "QUESTION_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "La pregunta no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo eliminar la pregunta",
    });
  }
};