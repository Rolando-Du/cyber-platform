import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

import {
  createQuestionHandler,
  deleteQuestionHandler,
  getQuestion,
  listQuestions,
  updateQuestionHandler,
} from "./question.controller.js";

export const questionRouter: ExpressRouter = Router();

questionRouter.get("/", listQuestions);
questionRouter.get("/:id", getQuestion);

questionRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  createQuestionHandler,
);

questionRouter.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  updateQuestionHandler,
);

questionRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteQuestionHandler,
);