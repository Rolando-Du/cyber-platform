import { z } from "zod";

const lessonProgressStatusSchema = z.enum([
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
]);

const progressSchema = z.coerce
  .number()
  .int("El progreso debe ser un número entero")
  .min(0, "El progreso no puede ser menor a 0")
  .max(100, "El progreso no puede superar 100");

export const createLessonProgressSchema = z.object({
  lessonId: z.uuid("El id de la lección no es válido"),

  status: lessonProgressStatusSchema.default("NOT_STARTED"),

  progress: progressSchema.default(0),
});

export const updateLessonProgressSchema = z
  .object({
    status: lessonProgressStatusSchema.optional(),
    progress: progressSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const lessonProgressIdParamSchema = z.object({
  id: z.uuid("El id del progreso no es válido"),
});

export type CreateLessonProgressInput = z.infer<
  typeof createLessonProgressSchema
>;

export type UpdateLessonProgressInput = z.infer<
  typeof updateLessonProgressSchema
>;