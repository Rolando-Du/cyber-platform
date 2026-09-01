import { prisma } from "../../config/prisma.js";

import type {
  CreateLessonInput,
  UpdateLessonInput,
} from "./lesson.schemas.js";

export const getLessons = async () => {
  return prisma.lesson.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    include: {
      module: true,
      _count: {
        select: {
          blocks: true,
          progress: true,
        },
      },
    },
  });
};

export const getLessonById = async (id: string) => {
  return prisma.lesson.findUnique({
    where: {
      id,
    },
    include: {
      module: true,
      blocks: {
        orderBy: {
          order: "asc",
        },
      },
      _count: {
        select: {
          progress: true,
        },
      },
    },
  });
};

export const createLesson = async (input: CreateLessonInput) => {
  const module = await prisma.module.findUnique({
    where: {
      id: input.moduleId,
    },
    select: {
      id: true,
    },
  });

  if (!module) {
    throw new Error("MODULE_NOT_FOUND");
  }

  const existingSlug = await prisma.lesson.findUnique({
    where: {
      slug: input.slug,
    },
    select: {
      id: true,
    },
  });

  if (existingSlug) {
    throw new Error("LESSON_SLUG_ALREADY_EXISTS");
  }

  return prisma.lesson.create({
    data: {
      moduleId: input.moduleId,
      title: input.title,
      slug: input.slug,
      status: input.status,
      order: input.order,
      ...(input.description !== undefined && {
        description: input.description,
      }),
    },
    include: {
      module: true,
    },
  });
};

export const updateLesson = async (
  id: string,
  input: UpdateLessonInput,
) => {
  const existingLesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!existingLesson) {
    throw new Error("LESSON_NOT_FOUND");
  }

  if (input.slug !== undefined && input.slug !== existingLesson.slug) {
    const existingSlug = await prisma.lesson.findUnique({
      where: {
        slug: input.slug,
      },
      select: {
        id: true,
      },
    });

    if (existingSlug) {
      throw new Error("LESSON_SLUG_ALREADY_EXISTS");
    }
  }

  const data = {
    ...(input.title !== undefined && {
      title: input.title,
    }),
    ...(input.slug !== undefined && {
      slug: input.slug,
    }),
    ...(input.description !== undefined && {
      description: input.description,
    }),
    ...(input.status !== undefined && {
      status: input.status,
    }),
    ...(input.order !== undefined && {
      order: input.order,
    }),
  };

  return prisma.lesson.update({
    where: {
      id,
    },
    data,
    include: {
      module: true,
    },
  });
};

export const deleteLesson = async (id: string) => {
  const existingLesson = await prisma.lesson.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingLesson) {
    throw new Error("LESSON_NOT_FOUND");
  }

  return prisma.lesson.delete({
    where: {
      id,
    },
  });
};