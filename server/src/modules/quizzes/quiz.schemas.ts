import { z } from "zod";

const titleSchema = z
  .string()
  .trim()
  .min(3, "El título debe tener al menos 3 caracteres")
  .max(150, "El título no puede superar los 150 caracteres");

const descriptionSchema = z
  .string()
  .trim()
  .max(1500, "La descripción no puede superar los 1500 caracteres");

const statusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

const passingScoreSchema = z.coerce
  .number()
  .int("El puntaje mínimo debe ser un número entero")
  .min(0, "El puntaje mínimo no puede ser menor a 0")
  .max(100, "El puntaje mínimo no puede superar 100");

const orderSchema = z.coerce
  .number()
  .int()
  .min(0, "El orden no puede ser negativo");

export const createQuizSchema = z.object({
  moduleId: z.uuid("El id del módulo no es válido"),

  title: titleSchema,

  description: descriptionSchema.optional(),

  status: statusSchema.default("DRAFT"),

  passingScore: passingScoreSchema.default(70),

  order: orderSchema.default(0),
});

export const updateQuizSchema = z
  .object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    status: statusSchema.optional(),
    passingScore: passingScoreSchema.optional(),
    order: orderSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const quizIdParamSchema = z.object({
  id: z.uuid("El id del cuestionario no es válido"),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
export type UpdateQuizInput = z.infer<typeof updateQuizSchema>;