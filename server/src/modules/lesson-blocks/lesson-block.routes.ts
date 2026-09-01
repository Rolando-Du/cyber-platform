import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

import {
  createLessonBlockHandler,
  deleteLessonBlockHandler,
  getLessonBlock,
  listLessonBlocks,
  updateLessonBlockHandler,
} from "./lesson-block.controller.js";

export const lessonBlockRouter: ExpressRouter = Router();

lessonBlockRouter.get("/", listLessonBlocks);
lessonBlockRouter.get("/:id", getLessonBlock);

lessonBlockRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  createLessonBlockHandler,
);

lessonBlockRouter.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  updateLessonBlockHandler,
);

lessonBlockRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteLessonBlockHandler,
);