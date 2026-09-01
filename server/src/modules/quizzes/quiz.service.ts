import { prisma } from "../../config/prisma.js";

import type {
  CreateQuizInput,
  UpdateQuizInput,
} from "./quiz.schemas.js";

export const getQuizzes = async () => {
  return prisma.quiz.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    include: {
      module: {
        include: {
          course: true,
        },
      },
      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
    },
  });
};

export const getQuizById = async (id: string) => {
  return prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      module: {
        include: {
          course: true,
        },
      },
      questions: {
        orderBy: {
          order: "asc",
        },
        include: {
          options: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },
      _count: {
        select: {
          attempts: true,
        },
      },
    },
  });
};

export const createQuiz = async (input: CreateQuizInput) => {
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

  return prisma.quiz.create({
    data: {
      moduleId: input.moduleId,
      title: input.title,
      status: input.status,
      passingScore: input.passingScore,
      order: input.order,
      ...(input.description !== undefined && {
        description: input.description,
      }),
    },
    include: {
      module: {
        include: {
          course: true,
        },
      },
    },
  });
};

export const updateQuiz = async (
  id: string,
  input: UpdateQuizInput,
) => {
  const existingQuiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingQuiz) {
    throw new Error("QUIZ_NOT_FOUND");
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
    ...(input.passingScore !== undefined && {
      passingScore: input.passingScore,
    }),
    ...(input.order !== undefined && {
      order: input.order,
    }),
  };

  return prisma.quiz.update({
    where: {
      id,
    },
    data,
    include: {
      module: {
        include: {
          course: true,
        },
      },
    },
  });
};

export const deleteQuiz = async (id: string) => {
  const existingQuiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingQuiz) {
    throw new Error("QUIZ_NOT_FOUND");
  }

  return prisma.quiz.delete({
    where: {
      id,
    },
  });
};