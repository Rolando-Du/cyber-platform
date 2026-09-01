import { Router } from "express";
import type { Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";

import {
  createEnrollmentHandler,
  getMyEnrollment,
  listMyEnrollments,
  updateEnrollmentHandler,
} from "./enrollment.controller.js";

export const enrollmentRouter: ExpressRouter = Router();

enrollmentRouter.use(requireAuth);

enrollmentRouter.get("/", listMyEnrollments);
enrollmentRouter.get("/:id", getMyEnrollment);
enrollmentRouter.post("/", createEnrollmentHandler);
enrollmentRouter.patch("/:id", updateEnrollmentHandler);