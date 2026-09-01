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

const orderSchema = z.coerce
  .number()
  .int()
  .min(0, "El orden no puede ser negativo");

export const createModuleSchema = z.object({
  courseId: z.uuid("El id del curso no es válido"),

  title: titleSchema,

  description: descriptionSchema.optional(),

  status: statusSchema.default("DRAFT"),

  order: orderSchema.default(0),
});

export const updateModuleSchema = z
  .object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    status: statusSchema.optional(),
    order: orderSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const moduleIdParamSchema = z.object({
  id: z.uuid("El id del módulo no es válido"),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;