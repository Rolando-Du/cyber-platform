import { prisma } from "../../config/prisma.js";

import type {
  CreateQuestionOptionInput,
  UpdateQuestionOptionInput,
} from "./question-option.schemas.js";

export const getQuestionOptions = async () => {
  return prisma.questionOption.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    include: {
      question: {
        include: {
          quiz: true,
        },
      },
    },
  });
};

export const getQuestionOptionById = async (id: string) => {
  return prisma.questionOption.findUnique({
    where: {
      id,
    },
    include: {
      question: {
        include: {
          quiz: true,
        },
      },
    },
  });
};

export const createQuestionOption = async (
  input: CreateQuestionOptionInput,
) => {
  const question = await prisma.question.findUnique({
    where: {
      id: input.questionId,
    },
    select: {
      id: true,
      type: true,
    },
  });

  if (!question) {
    throw new Error("QUESTION_NOT_FOUND");
  }

  if (
    question.type === "SINGLE_CHOICE" &&
    input.isCorrect
  ) {
    const existingCorrectOption = await prisma.questionOption.findFirst({
      where: {
        questionId: input.questionId,
        isCorrect: true,
      },
      select: {
        id: true,
      },
    });

    if (existingCorrectOption) {
      throw new Error("SINGLE_CHOICE_CORRECT_OPTION_ALREADY_EXISTS");
    }
  }

  return prisma.questionOption.create({
    data: {
      questionId: input.questionId,
      text: input.text,
      isCorrect: input.isCorrect,
      order: input.order,
    },
    include: {
      question: {
        include: {
          quiz: true,
        },
      },
    },
  });
};

export const updateQuestionOption = async (
  id: string,
  input: UpdateQuestionOptionInput,
) => {
  const existingOption = await prisma.questionOption.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      questionId: true,
      question: {
        select: {
          type: true,
        },
      },
    },
  });

  if (!existingOption) {
    throw new Error("QUESTION_OPTION_NOT_FOUND");
  }

  if (
    existingOption.question.type === "SINGLE_CHOICE" &&
    input.isCorrect === true
  ) {
    const existingCorrectOption = await prisma.questionOption.findFirst({
      where: {
        questionId: existingOption.questionId,
        isCorrect: true,
        NOT: {
          id,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingCorrectOption) {
      throw new Error("SINGLE_CHOICE_CORRECT_OPTION_ALREADY_EXISTS");
    }
  }

  const data = {
    ...(input.text !== undefined && {
      text: input.text,
    }),
    ...(input.isCorrect !== undefined && {
      isCorrect: input.isCorrect,
    }),
    ...(input.order !== undefined && {
      order: input.order,
    }),
  };

  return prisma.questionOption.update({
    where: {
      id,
    },
    data,
    include: {
      question: {
        include: {
          quiz: true,
        },
      },
    },
  });
};

export const deleteQuestionOption = async (id: string) => {
  const existingOption = await prisma.questionOption.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingOption) {
    throw new Error("QUESTION_OPTION_NOT_FOUND");
  }

  return prisma.questionOption.delete({
    where: {
      id,
    },
  });
};