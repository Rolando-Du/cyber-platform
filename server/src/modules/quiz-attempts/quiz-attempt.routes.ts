import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";

import {
  createQuizAttemptHandler,
  getMyQuizAttempt,
  listMyQuizAttempts,
  submitQuizAttemptHandler,
} from "./quiz-attempt.controller.js";

export const quizAttemptRouter: ExpressRouter = Router();

quizAttemptRouter.use(requireAuth);

quizAttemptRouter.get("/", listMyQuizAttempts);

quizAttemptRouter.get(
  "/:id",
  getMyQuizAttempt,
);

quizAttemptRouter.post(
  "/",
  createQuizAttemptHandler,
);

quizAttemptRouter.post(
  "/:id/submit",
  submitQuizAttemptHandler,
);