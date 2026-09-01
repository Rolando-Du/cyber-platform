import type { Prisma } from "../../generated/prisma/client.js";

import { prisma } from "../../config/prisma.js";

import type {
  CreateLessonBlockInput,
  UpdateLessonBlockInput,
} from "./lesson-block.schemas.js";

export const getLessonBlocks = async () => {
  return prisma.lessonBlock.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      lesson: true,
    },
  });
};

export const getLessonBlockById = async (id: string) => {
  return prisma.lessonBlock.findUnique({
    where: {
      id,
    },
    include: {
      lesson: true,
    },
  });
};

export const createLessonBlock = async (
  input: CreateLessonBlockInput,
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: input.lessonId,
    },
    select: {
      id: true,
    },
  });

  if (!lesson) {
    throw new Error("LESSON_NOT_FOUND");
  }

  return prisma.lessonBlock.create({
    data: {
      lessonId: input.lessonId,
      type: input.type,
      content: input.content as Prisma.InputJsonValue,
      order: input.order,
    },
    include: {
      lesson: true,
    },
  });
};

export const updateLessonBlock = async (
  id: string,
  input: UpdateLessonBlockInput,
) => {
  const existingBlock = await prisma.lessonBlock.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingBlock) {
    throw new Error("LESSON_BLOCK_NOT_FOUND");
  }

  const data = {
    ...(input.type !== undefined && {
      type: input.type,
    }),
    ...(input.content !== undefined && {
      content: input.content as Prisma.InputJsonValue,
    }),
    ...(input.order !== undefined && {
      order: input.order,
    }),
  };

  return prisma.lessonBlock.update({
    where: {
      id,
    },
    data,
    include: {
      lesson: true,
    },
  });
};

export const deleteLessonBlock = async (id: string) => {
  const existingBlock = await prisma.lessonBlock.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingBlock) {
    throw new Error("LESSON_BLOCK_NOT_FOUND");
  }

  return prisma.lessonBlock.delete({
    where: {
      id,
    },
  });
};