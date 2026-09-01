import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";
import {
  createCourseHandler,
  deleteCourseHandler,
  getCourse,
  listCourses,
  updateCourseHandler,
} from "./course.controller.js";

export const courseRouter: ExpressRouter = Router();

courseRouter.get("/", listCourses);
courseRouter.get("/:id", getCourse);

courseRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  createCourseHandler,
);

courseRouter.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "INSTRUCTOR"),
  updateCourseHandler,
);

courseRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteCourseHandler,
);