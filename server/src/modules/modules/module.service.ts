import { prisma } from "../../config/prisma.js";

import type {
  CreateModuleInput,
  UpdateModuleInput,
} from "./module.schemas.js";

export const getModules = async () => {
  return prisma.module.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    include: {
      course: true,
      _count: {
        select: {
          lessons: true,
          quizzes: true,
        },
      },
    },
  });
};

export const getModuleById = async (id: string) => {
  return prisma.module.findUnique({
    where: {
      id,
    },
    include: {
      course: true,
      lessons: {
        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      },
      quizzes: {
        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      },
    },
  });
};

export const createModule = async (input: CreateModuleInput) => {
  const course = await prisma.course.findUnique({
    where: {
      id: input.courseId,
    },
    select: {
      id: true,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  return prisma.module.create({
    data: {
      courseId: input.courseId,
      title: input.title,
      status: input.status,
      order: input.order,
      ...(input.description !== undefined && {
        description: input.description,
      }),
    },
    include: {
      course: true,
    },
  });
};

export const updateModule = async (
  id: string,
  input: UpdateModuleInput,
) => {
  const existingModule = await prisma.module.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingModule) {
    throw new Error("MODULE_NOT_FOUND");
  }

  const data = {
    ...(input.title !== undefined && {
      title: input.title,
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

  return prisma.module.update({
    where: {
      id,
    },
    data,
    include: {
      course: true,
    },
  });
};

export const deleteModule = async (id: string) => {
  const existingModule = await prisma.module.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingModule) {
    throw new Error("MODULE_NOT_FOUND");
  }

  return prisma.module.delete({
    where: {
      id,
    },
  });
};