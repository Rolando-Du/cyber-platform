import { apiFetch } from "../lib/api";
import type {
  ContentStatus,
  CourseLevel,
} from "./course.service";

export type QuestionType =
  | "SINGLE_CHOICE"
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE";

export type QuizOption = {
  id: string;
  questionId: string;
  text: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type QuizQuestion = {
  id: string;
  quizId: string;
  type: QuestionType;
  text: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  options: QuizOption[];
};

export type QuizDetails = {
  id: string;
  moduleId: string;
  title: string;
  description: string | null;
  status: ContentStatus;
  passingScore: number;
  order: number;
  createdAt: string;
  updatedAt: string;

  module: {
    id: string;
    courseId: string;
    title: string;
    description: string | null;
    status: ContentStatus;
    order: number;
    createdAt: string;
    updatedAt: string;

    course: {
      id: string;
      pathId: string;
      title: string;
      slug: string;
      description: string | null;
      level: CourseLevel;
      status: ContentStatus;
      order: number;
      createdAt: string;
      updatedAt: string;
    };
  };

  questions: QuizQuestion[];

  _count: {
    attempts: number;
  };
};

type QuizResponse = {
  success: boolean;
  message?: string;
  data?: {
    quiz: QuizDetails;
  };
};

export const getQuizById = async (
  id: string,
): Promise<QuizDetails> => {
  const response = await apiFetch(
    `/api/v1/quizzes/${id}`,
  );

  const result =
    (await response.json()) as QuizResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo obtener la evaluación",
    );
  }

  return result.data.quiz;
};