import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL es obligatoria"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL es obligatoria"),
  JWT_SECRET: z
    .string()
    .min(64, "JWT_SECRET debe tener al menos 64 caracteres"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Variables de entorno inválidas:");
  console.error(parsedEnv.error.flatten().fieldErrors);

  throw new Error("Configuración de entorno inválida");
}

export const env = parsedEnv.data;