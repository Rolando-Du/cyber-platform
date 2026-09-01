import { z } from "zod";

const titleSchema = z
  .string()
  .trim()
  .min(3, "El título debe tener al menos 3 caracteres")
  .max(150, "El título no puede superar los 150 caracteres");

const slugSchema = z
  .string()
  .trim()
  .min(2, "El slug debe tener al menos 2 caracteres")
  .max(120, "El slug no puede superar los 120 caracteres")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "El slug solo puede contener letras minúsculas, números y guiones",
  );

const descriptionSchema = z
  .string()
  .trim()
  .max(1500, "La descripción no puede superar los 1500 caracteres");

const statusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

const orderSchema = z.coerce
  .number()
  .int()
  .min(0, "El orden no puede ser negativo");

export const createLessonSchema = z.object({
  moduleId: z.uuid("El id del módulo no es válido"),

  title: titleSchema,

  slug: slugSchema,

  description: descriptionSchema.optional(),

  status: statusSchema.default("DRAFT"),

  order: orderSchema.default(0),
});

export const updateLessonSchema = z
  .object({
    title: titleSchema.optional(),
    slug: slugSchema.optional(),
    description: descriptionSchema.optional(),
    status: statusSchema.optional(),
    order: orderSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const lessonIdParamSchema = z.object({
  id: z.uuid("El id de la lección no es válido"),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;