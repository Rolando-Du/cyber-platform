import type { Request, Response } from "express";

import {
  createQuestionOptionSchema,
  questionOptionIdParamSchema,
  updateQuestionOptionSchema,
} from "./question-option.schemas.js";

import {
  createQuestionOption,
  deleteQuestionOption,
  getQuestionOptionById,
  getQuestionOptions,
  updateQuestionOption,
} from "./question-option.service.js";

export const listQuestionOptions = async (
  _req: Request,
  res: Response,
) => {
  try {
    const options = await getQuestionOptions();

    return res.status(200).json({
      success: true,
      data: {
        options,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudieron obtener las opciones de respuesta",
    });
  }
};

export const getQuestionOption = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = questionOptionIdParamSchema.safeParse(
    req.params,
  );

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la opción no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const option = await getQuestionOptionById(
      parsedParams.data.id,
    );

    if (!option) {
      return res.status(404).json({
        success: false,
        message: "La opción de respuesta no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        option,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener la opción de respuesta",
    });
  }
};

export const createQuestionOptionHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedBody = createQuestionOptionSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos de la opción no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const option = await createQuestionOption(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: {
        option,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "QUESTION_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "La pregunta indicada no existe",
        });
      }

      if (
        error.message ===
        "SINGLE_CHOICE_CORRECT_OPTION_ALREADY_EXISTS"
      ) {
        return res.status(409).json({
          success: false,
          message:
            "Una pregunta de opción única solo puede tener una respuesta correcta",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo crear la opción de respuesta",
    });
  }
};

export const updateQuestionOptionHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = questionOptionIdParamSchema.safeParse(
    req.params,
  );

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la opción no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateQuestionOptionSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos de la opción no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const option = await updateQuestionOption(
      parsedParams.data.id,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        option,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "QUESTION_OPTION_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "La opción de respuesta no existe",
        });
      }

      if (
        error.message ===
        "SINGLE_CHOICE_CORRECT_OPTION_ALREADY_EXISTS"
      ) {
        return res.status(409).json({
          success: false,
          message:
            "Una pregunta de opción única solo puede tener una respuesta correcta",
        });
      }
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar la opción de respuesta",
    });
  }
};

export const deleteQuestionOptionHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = questionOptionIdParamSchema.safeParse(
    req.params,
  );

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id de la opción no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    await deleteQuestionOption(parsedParams.data.id);

    return res.status(200).json({
      success: true,
      message: "Opción de respuesta eliminada correctamente",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "QUESTION_OPTION_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "La opción de respuesta no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo eliminar la opción de respuesta",
    });
  }
};