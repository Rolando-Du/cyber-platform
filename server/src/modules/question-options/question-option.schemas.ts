import { z } from "zod";

const textSchema = z
  .string()
  .trim()
  .min(1, "La opción debe tener contenido")
  .max(1000, "La opción no puede superar los 1000 caracteres");

const orderSchema = z.coerce
  .number()
  .int()
  .min(0, "El orden no puede ser negativo");

export const createQuestionOptionSchema = z.object({
  questionId: z.uuid("El id de la pregunta no es válido"),

  text: textSchema,

  isCorrect: z.boolean().default(false),

  order: orderSchema.default(0),
});

export const updateQuestionOptionSchema = z
  .object({
    text: textSchema.optional(),
    isCorrect: z.boolean().optional(),
    order: orderSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const questionOptionIdParamSchema = z.object({
  id: z.uuid("El id de la opción no es válido"),
});

export type CreateQuestionOptionInput = z.infer<
  typeof createQuestionOptionSchema
>;

export type UpdateQuestionOptionInput = z.infer<
  typeof updateQuestionOptionSchema
>;