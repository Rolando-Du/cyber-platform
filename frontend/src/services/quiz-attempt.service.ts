import { apiFetch } from "../lib/api";

export type QuizAttemptStatus =
  | "IN_PROGRESS"
  | "COMPLETED";

export type QuizAttempt = {
  id: string;
  userId: string;
  quizId: string;
  status: QuizAttemptStatus;
  score: number | null;
  startedAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;

  quiz: {
    id: string;
    moduleId: string;
    title: string;
    description: string | null;
    passingScore: number;

    module: {
      id: string;
      courseId: string;
      title: string;

      course: {
        id: string;
        title: string;
        slug: string;
      };
    };
  };
};

export type QuizAnswerInput = {
  questionId: string;
  optionIds: string[];
};

export type QuizAttemptResult = {
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  passingScore: number;
  passed: boolean;
};

export type SubmittedQuizAttempt =
  QuizAttempt & {
    answers: Array<{
      id: string;
      attemptId: string;
      questionId: string;
      isCorrect: boolean;

      question: {
        id: string;
        type:
          | "SINGLE_CHOICE"
          | "MULTIPLE_CHOICE"
          | "TRUE_FALSE";
        text: string;
        explanation: string | null;
        order: number;
      };

      selectedOptions: Array<{
        answerId: string;
        optionId: string;

        option: {
          id: string;
          text: string;
          order: number;
        };
      }>;
    }>;
  };

type QuizAttemptsResponse = {
  success: boolean;
  message?: string;
  data?: {
    attempts: QuizAttempt[];
  };
};

type QuizAttemptResponse = {
  success: boolean;
  message?: string;
  data?: {
    attempt: SubmittedQuizAttempt;
  };
};

type CreateQuizAttemptResponse = {
  success: boolean;
  message?: string;
  data?: {
    attempt: QuizAttempt;
  };
};

type SubmitQuizAttemptResponse = {
  success: boolean;
  message?: string;
  data?: {
    attempt: SubmittedQuizAttempt;
    result: QuizAttemptResult;
  };
};

export const getMyQuizAttempts =
  async (): Promise<QuizAttempt[]> => {
    const response = await apiFetch(
      "/api/v1/quiz-attempts",
    );

    const result =
      (await response.json()) as QuizAttemptsResponse;

    if (
      !response.ok ||
      !result.success ||
      !result.data
    ) {
      throw new Error(
        result.message ??
          "No se pudieron obtener los intentos",
      );
    }

    return result.data.attempts;
  };

export const getMyQuizAttemptById = async (
  id: string,
): Promise<SubmittedQuizAttempt> => {
  const response = await apiFetch(
    `/api/v1/quiz-attempts/${id}`,
  );

  const result =
    (await response.json()) as QuizAttemptResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo obtener el intento",
    );
  }

  return result.data.attempt;
};

export const createQuizAttempt = async (
  quizId: string,
): Promise<QuizAttempt> => {
  const response = await apiFetch(
    "/api/v1/quiz-attempts",
    {
      method: "POST",
      body: JSON.stringify({
        quizId,
      }),
    },
  );

  const result =
    (await response.json()) as CreateQuizAttemptResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo iniciar la evaluación",
    );
  }

  return result.data.attempt;
};

export const submitQuizAttempt = async (
  attemptId: string,
  answers: QuizAnswerInput[],
): Promise<{
  attempt: SubmittedQuizAttempt;
  result: QuizAttemptResult;
}> => {
  const response = await apiFetch(
    `/api/v1/quiz-attempts/${attemptId}/submit`,
    {
      method: "POST",
      body: JSON.stringify({
        answers,
      }),
    },
  );

  const result =
    (await response.json()) as SubmitQuizAttemptResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo finalizar la evaluación",
    );
  }

  return result.data;
};