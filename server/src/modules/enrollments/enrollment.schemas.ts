import { z } from "zod";

const enrollmentStatusSchema = z.enum([
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
]);

export const createEnrollmentSchema = z.object({
  courseId: z.uuid("El id del curso no es válido"),
});

export const updateEnrollmentSchema = z
  .object({
    status: enrollmentStatusSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviarse al menos un campo para actualizar",
  });

export const enrollmentIdParamSchema = z.object({
  id: z.uuid("El id de la inscripción no es válido"),
});

export type CreateEnrollmentInput = z.infer<
  typeof createEnrollmentSchema
>;

export type UpdateEnrollmentInput = z.infer<
  typeof updateEnrollmentSchema
>;