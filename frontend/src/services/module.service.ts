import { apiFetch } from "../lib/api";
import type {
  ContentStatus,
  CourseLevel,
} from "./course.service";

export type ModuleCourse = {
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

export type ModuleLesson = {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  description: string | null;
  status: ContentStatus;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ModuleQuiz = {
  id: string;
  moduleId: string;
  title: string;
  description: string | null;
  status: ContentStatus;
  passingScore: number;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ModuleDetails = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  status: ContentStatus;
  order: number;
  createdAt: string;
  updatedAt: string;

  course: ModuleCourse;
  lessons: ModuleLesson[];
  quizzes: ModuleQuiz[];
};

type ModuleResponse = {
  success: boolean;
  message?: string;
  data?: {
    module: ModuleDetails;
  };
};

export const getModuleById = async (
  id: string,
): Promise<ModuleDetails> => {
  const response = await apiFetch(
    `/api/v1/modules/${id}`,
  );

  const result =
    (await response.json()) as ModuleResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo obtener el módulo",
    );
  }

  return result.data.module;
};