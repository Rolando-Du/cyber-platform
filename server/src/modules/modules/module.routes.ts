import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

import {
  createModuleHandler,
  deleteModuleHandler,
  getModule,
  listModules,
  updateModuleHandler,
} from "./module.controller.js";

export const moduleRouter: ExpressRouter = Router();

moduleRouter.get("/", listModules);
moduleRouter.get("/:id", getModule);

moduleRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  createModuleHandler,
);

moduleRouter.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  updateModuleHandler,
);

moduleRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteModuleHandler,
);