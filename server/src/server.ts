import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";
import {
  requireAuth,
  type AuthenticatedRequest,
} from "./middleware/auth.middleware.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { courseRouter } from "./modules/courses/course.routes.js";
import { enrollmentRouter } from "./modules/enrollments/enrollment.routes.js";
import { learningPathRouter } from "./modules/learning-paths/learning-path.routes.js";
import { lessonBlockRouter } from "./modules/lesson-blocks/lesson-block.routes.js";
import { lessonProgressRouter } from "./modules/lesson-progress/lesson-progress.routes.js";
import { lessonRouter } from "./modules/lessons/lesson.routes.js";
import { moduleRouter } from "./modules/modules/module.routes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      success: true,
      data: {
        service: "Cyber Platform API",
        status: "operational",
        database: "online",
        environment: env.NODE_ENV,
      },
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    return res.status(503).json({
      success: false,
      data: {
        service: "Cyber Platform API",
        status: "degraded",
        database: "offline",
        environment: env.NODE_ENV,
      },
    });
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/learning-paths", learningPathRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/modules", moduleRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/lesson-blocks", lessonBlockRouter);
app.use("/api/v1/enrollments", enrollmentRouter);
app.use("/api/v1/lesson-progress", lessonProgressRouter);

app.get(
  "/api/v1/me",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    if (!req.auth) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.auth.userId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  },
);

app.listen(env.PORT, () => {
  console.log(`Cyber Platform API running on http://localhost:${env.PORT}`);
  console.log(
    `Health check: http://localhost:${env.PORT}/api/v1/health`,
  );
});