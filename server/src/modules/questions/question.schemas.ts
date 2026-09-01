import { z } from "zod";

const questionTypeSchema = z.enum([
  "SINGLE_CHOICE",
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
]);

const textSchema = z
  .string()
  .trim()
  .min(3, "La pregunta debe tener al menos 3 caracteres")
  .max(1000, "La pregunta no puede superar los 1000 caracteres");

const explanationSchema = z
  .string()
  .trim()
  .max(2000, "La explicación no puede superar los 2000 caracteres");

const orderSchema = z.coerce
  .number()
  .int()
  .min(0, "El orden no puede ser negativo");

export const createQuestionSchema = z.object({
  quizId: z.uuid("El id del cuestionario no es válido"),

  type: questionTypeSchema,

  text: textSchema,

  explanation: explanationSchema.optional(),

  order: orderSchema.default(0),
});

export const updateQuestionSchema = z
  .object({
    type: questionTypeSchema.optional(),
    text: textSchema.optional(),
    explanation: explanationSchema.optional(),
    order: orderSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const questionIdParamSchema = z.object({
  id: z.uuid("El id de la pregunta no es válido"),
});

export type CreateQuestionInput = z.infer<
  typeof createQuestionSchema
>;

export type UpdateQuestionInput = z.infer<
  typeof updateQuestionSchema
>;