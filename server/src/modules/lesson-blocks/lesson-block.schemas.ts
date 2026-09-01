import { z } from "zod";

const blockTypeSchema = z.enum([
  "TEXT",
  "HEADING",
  "IMAGE",
  "VIDEO",
  "CODE",
  "CALLOUT",
  "TABLE",
  "DOWNLOAD",
]);

const contentSchema = z.record(z.string(), z.unknown());

const orderSchema = z.coerce
  .number()
  .int()
  .min(0, "El orden no puede ser negativo");

export const createLessonBlockSchema = z.object({
  lessonId: z.uuid("El id de la lección no es válido"),

  type: blockTypeSchema,

  content: contentSchema,

  order: orderSchema.default(0),
});

export const updateLessonBlockSchema = z
  .object({
    type: blockTypeSchema.optional(),
    content: contentSchema.optional(),
    order: orderSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const lessonBlockIdParamSchema = z.object({
  id: z.uuid("El id del bloque no es válido"),
});

export type CreateLessonBlockInput = z.infer<
  typeof createLessonBlockSchema
>;

export type UpdateLessonBlockInput = z.infer<
  typeof updateLessonBlockSchema
>;