import { prisma } from "../../config/prisma.js";

import type {
  CreateQuestionInput,
  UpdateQuestionInput,
} from "./question.schemas.js";

export const getQuestions = async () => {
  return prisma.question.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    include: {
      quiz: {
        include: {
          module: {
            include: {
              course: true,
            },
          },
        },
      },
      options: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const getQuestionById = async (id: string) => {
  return prisma.question.findUnique({
    where: {
      id,
    },
    include: {
      quiz: {
        include: {
          module: {
            include: {
              course: true,
            },
          },
        },
      },
      options: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const createQuestion = async (
  input: CreateQuestionInput,
) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: input.quizId,
    },
    select: {
      id: true,
    },
  });

  if (!quiz) {
    throw new Error("QUIZ_NOT_FOUND");
  }

  return prisma.question.create({
    data: {
      quizId: input.quizId,
      type: input.type,
      text: input.text,
      order: input.order,
      ...(input.explanation !== undefined && {
        explanation: input.explanation,
      }),
    },
    include: {
      quiz: true,
      options: true,
    },
  });
};

export const updateQuestion = async (
  id: string,
  input: UpdateQuestionInput,
) => {
  const existingQuestion = await prisma.question.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingQuestion) {
    throw new Error("QUESTION_NOT_FOUND");
  }

  const data = {
    ...(input.type !== undefined && {
      type: input.type,
    }),
    ...(input.text !== undefined && {
      text: input.text,
    }),
    ...(input.explanation !== undefined && {
      explanation: input.explanation,
    }),
    ...(input.order !== undefined && {
      order: input.order,
    }),
  };

  return prisma.question.update({
    where: {
      id,
    },
    data,
    include: {
      quiz: true,
      options: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const deleteQuestion = async (id: string) => {
  const existingQuestion = await prisma.question.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingQuestion) {
    throw new Error("QUESTION_NOT_FOUND");
  }

  return prisma.question.delete({
    where: {
      id,
    },
  });
};