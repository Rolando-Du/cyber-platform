import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(2, "El slug debe tener al menos 2 caracteres")
  .max(120, "El slug no puede superar los 120 caracteres")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "El slug solo puede contener letras minúsculas, números y guiones",
  );

export const createLearningPathSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(150, "El título no puede superar los 150 caracteres"),

  slug: slugSchema,

  description: z
    .string()
    .trim()
    .max(1000, "La descripción no puede superar los 1000 caracteres")
    .optional(),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),

  order: z.coerce
    .number()
    .int()
    .min(0, "El orden no puede ser negativo")
    .default(0),
});

export const updateLearningPathSchema = createLearningPathSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const learningPathIdParamSchema = z.object({
  id: z.uuid("El id de la ruta de aprendizaje no es válido"),
});

export type CreateLearningPathInput = z.infer<
  typeof createLearningPathSchema
>;

export type UpdateLearningPathInput = z.infer<
  typeof updateLearningPathSchema
>;
