import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";

import {
  createLessonProgressHandler,
  getMyLessonProgress,
  listMyLessonProgress,
  updateLessonProgressHandler,
} from "./lesson-progress.controller.js";

export const lessonProgressRouter: ExpressRouter = Router();

lessonProgressRouter.use(requireAuth);

lessonProgressRouter.get("/", listMyLessonProgress);
lessonProgressRouter.get("/:id", getMyLessonProgress);
lessonProgressRouter.post("/", createLessonProgressHandler);
lessonProgressRouter.patch("/:id", updateLessonProgressHandler);