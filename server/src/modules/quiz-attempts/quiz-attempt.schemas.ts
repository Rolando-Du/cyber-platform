import { z } from "zod";

const answerSchema = z.object({
  questionId: z.uuid("El id de la pregunta no es válido"),

  optionIds: z
    .array(z.uuid("El id de la opción no es válido"))
    .min(1, "Debés seleccionar al menos una opción"),
});

export const createQuizAttemptSchema = z.object({
  quizId: z.uuid("El id del cuestionario no es válido"),
});

export const submitQuizAttemptSchema = z.object({
  answers: z
    .array(answerSchema)
    .min(1, "Debés enviar al menos una respuesta"),
});

export const quizAttemptIdParamSchema = z.object({
  id: z.uuid("El id del intento no es válido"),
});

export type CreateQuizAttemptInput = z.infer<
  typeof createQuizAttemptSchema
>;

export type SubmitQuizAttemptInput = z.infer<
  typeof submitQuizAttemptSchema
>;