import type { Request, Response } from "express";

import {
  createModuleSchema,
  moduleIdParamSchema,
  updateModuleSchema,
} from "./module.schemas.js";

import {
  createModule,
  deleteModule,
  getModuleById,
  getModules,
  updateModule,
} from "./module.service.js";

export const listModules = async (_req: Request, res: Response) => {
  try {
    const modules = await getModules();

    return res.status(200).json({
      success: true,
      data: {
        modules,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudieron obtener los módulos",
    });
  }
};

export const getModule = async (req: Request, res: Response) => {
  const parsedParams = moduleIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del módulo no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    const module = await getModuleById(parsedParams.data.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: "El módulo no existe",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        module,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo obtener el módulo",
    });
  }
};

export const createModuleHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedBody = createModuleSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del módulo no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const module = await createModule(parsedBody.data);

    return res.status(201).json({
      success: true,
      data: {
        module,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "COURSE_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "El curso indicado no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo crear el módulo",
    });
  }
};

export const updateModuleHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = moduleIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del módulo no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  const parsedBody = updateModuleSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      message: "Los datos del módulo no son válidos",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  try {
    const module = await updateModule(
      parsedParams.data.id,
      parsedBody.data,
    );

    return res.status(200).json({
      success: true,
      data: {
        module,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "MODULE_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "El módulo no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo actualizar el módulo",
    });
  }
};

export const deleteModuleHandler = async (
  req: Request,
  res: Response,
) => {
  const parsedParams = moduleIdParamSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({
      success: false,
      message: "El id del módulo no es válido",
      errors: parsedParams.error.flatten().fieldErrors,
    });
  }

  try {
    await deleteModule(parsedParams.data.id);

    return res.status(200).json({
      success: true,
      message: "Módulo eliminado correctamente",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "MODULE_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "El módulo no existe",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo eliminar el módulo",
    });
  }
};