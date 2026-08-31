import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { prisma } from "./config/prisma.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      data: {
        service: "Cyber Platform API",
        status: "operational",
        database: "online",
        environment: process.env.NODE_ENV || "development",
      },
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      success: false,
      data: {
        service: "Cyber Platform API",
        status: "degraded",
        database: "offline",
        environment: process.env.NODE_ENV || "development",
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`Cyber Platform API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
});