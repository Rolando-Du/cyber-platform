import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

import {
  createLessonHandler,
  deleteLessonHandler,
  getLesson,
  listLessons,
  updateLessonHandler,
} from "./lesson.controller.js";

export const lessonRouter: ExpressRouter = Router();

lessonRouter.get("/", listLessons);
lessonRouter.get("/:id", getLesson);

lessonRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  createLessonHandler,
);

lessonRouter.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  updateLessonHandler,
);

lessonRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteLessonHandler,
);