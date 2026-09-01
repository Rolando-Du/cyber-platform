import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

import {
  createQuestionOptionHandler,
  deleteQuestionOptionHandler,
  getQuestionOption,
  listQuestionOptions,
  updateQuestionOptionHandler,
} from "./question-option.controller.js";

export const questionOptionRouter: ExpressRouter = Router();

questionOptionRouter.get("/", listQuestionOptions);
questionOptionRouter.get("/:id", getQuestionOption);

questionOptionRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  createQuestionOptionHandler,
);

questionOptionRouter.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  updateQuestionOptionHandler,
);

questionOptionRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteQuestionOptionHandler,
);