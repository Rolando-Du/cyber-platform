import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";
import {
  createLearningPathHandler,
  deleteLearningPathHandler,
  getLearningPath,
  listLearningPaths,
  updateLearningPathHandler,
} from "./learning-path.controller.js";

export const learningPathRouter: ExpressRouter = Router();

learningPathRouter.get("/", listLearningPaths);
learningPathRouter.get("/:id", getLearningPath);

learningPathRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  createLearningPathHandler,
);

learningPathRouter.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  updateLearningPathHandler,
);

learningPathRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteLearningPathHandler,
);