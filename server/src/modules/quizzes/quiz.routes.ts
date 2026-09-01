import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

import {
  createQuizHandler,
  deleteQuizHandler,
  getQuiz,
  listQuizzes,
  updateQuizHandler,
} from "./quiz.controller.js";

export const quizRouter: ExpressRouter = Router();

quizRouter.get("/", listQuizzes);
quizRouter.get("/:id", getQuiz);

quizRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  createQuizHandler,
);

quizRouter.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  updateQuizHandler,
);

quizRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteQuizHandler,
);