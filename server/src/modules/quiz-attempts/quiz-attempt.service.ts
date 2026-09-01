import { prisma } from "../../config/prisma.js";

import type {
  CreateQuizAttemptInput,
  SubmitQuizAttemptInput,
} from "./quiz-attempt.schemas.js";

export const getUserQuizAttempts = async (userId: string) => {
  return prisma.quizAttempt.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
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
    },
  });
};

export const getUserQuizAttemptById = async (
  id: string,
  userId: string,
) => {
  return prisma.quizAttempt.findFirst({
    where: {
      id,
      userId,
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
    },
  });
};

export const createQuizAttempt = async (
  userId: string,
  input: CreateQuizAttemptInput,
) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: input.quizId,
    },
    include: {
      module: {
        select: {
          courseId: true,
        },
      },
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });

  if (!quiz) {
    throw new Error("QUIZ_NOT_FOUND");
  }

  if (quiz.status !== "PUBLISHED") {
    throw new Error("QUIZ_NOT_AVAILABLE");
  }

  if (quiz._count.questions === 0) {
    throw new Error("QUIZ_HAS_NO_QUESTIONS");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: quiz.module.courseId,
      },
    },
    select: {
      status: true,
    },
  });

  if (!enrollment) {
    throw new Error("ENROLLMENT_REQUIRED");
  }

  if (enrollment.status !== "ACTIVE") {
    throw new Error("ENROLLMENT_NOT_ACTIVE");
  }

  const existingAttempt = await prisma.quizAttempt.findFirst({
    where: {
      userId,
      quizId: input.quizId,
      status: "IN_PROGRESS",
    },
    select: {
      id: true,
    },
  });

  if (existingAttempt) {
    throw new Error("QUIZ_ATTEMPT_ALREADY_IN_PROGRESS");
  }

  return prisma.quizAttempt.create({
    data: {
      userId,
      quizId: input.quizId,
      status: "IN_PROGRESS",
      startedAt: new Date(),
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
    },
  });
};

export const submitQuizAttempt = async (
  id: string,
  userId: string,
  input: SubmitQuizAttemptInput,
) => {
  const attempt = await prisma.quizAttempt.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      quiz: {
        include: {
          module: {
            select: {
              courseId: true,
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
        },
      },
    },
  });

  if (!attempt) {
    throw new Error("QUIZ_ATTEMPT_NOT_FOUND");
  }

  if (attempt.status !== "IN_PROGRESS") {
    throw new Error("QUIZ_ATTEMPT_ALREADY_COMPLETED");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: attempt.quiz.module.courseId,
      },
    },
    select: {
      status: true,
    },
  });

  if (!enrollment) {
    throw new Error("ENROLLMENT_REQUIRED");
  }

  if (enrollment.status !== "ACTIVE") {
    throw new Error("ENROLLMENT_NOT_ACTIVE");
  }

  const answersByQuestion = new Map(
    input.answers.map((answer) => [
      answer.questionId,
      answer.optionIds,
    ]),
  );

  if (answersByQuestion.size !== input.answers.length) {
    throw new Error("DUPLICATE_QUESTION_ANSWER");
  }

  if (input.answers.length !== attempt.quiz.questions.length) {
    throw new Error("ALL_QUESTIONS_MUST_BE_ANSWERED");
  }

  let correctAnswers = 0;

  for (const question of attempt.quiz.questions) {
    const selectedOptionIds = answersByQuestion.get(question.id);

    if (!selectedOptionIds) {
      throw new Error("ALL_QUESTIONS_MUST_BE_ANSWERED");
    }

    const validOptionIds = new Set(
      question.options.map((option) => option.id),
    );

    const uniqueSelectedOptionIds = new Set(selectedOptionIds);

    if (uniqueSelectedOptionIds.size !== selectedOptionIds.length) {
      throw new Error("DUPLICATE_OPTION_SELECTED");
    }

    for (const optionId of selectedOptionIds) {
      if (!validOptionIds.has(optionId)) {
        throw new Error("INVALID_OPTION_FOR_QUESTION");
      }
    }

    if (
      question.type === "SINGLE_CHOICE" ||
      question.type === "TRUE_FALSE"
    ) {
      if (selectedOptionIds.length !== 1) {
        throw new Error("QUESTION_REQUIRES_SINGLE_OPTION");
      }
    }

    const correctOptionIds = question.options
      .filter((option) => option.isCorrect)
      .map((option) => option.id)
      .sort();

    const selectedIds = [...selectedOptionIds].sort();

    const isCorrect =
      correctOptionIds.length === selectedIds.length &&
      correctOptionIds.every(
        (optionId, index) => optionId === selectedIds[index],
      );

    if (isCorrect) {
      correctAnswers += 1;
    }
  }

  const totalQuestions = attempt.quiz.questions.length;

  const score = Math.round(
    (correctAnswers / totalQuestions) * 100,
  );

  const completedAttempt = await prisma.quizAttempt.update({
    where: {
      id,
    },
    data: {
      status: "COMPLETED",
      score,
      completedAt: new Date(),
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
    },
  });

  return {
    attempt: completedAttempt,
    result: {
      correctAnswers,
      totalQuestions,
      score,
      passingScore: attempt.quiz.passingScore,
      passed: score >= attempt.quiz.passingScore,
    },
  };
};