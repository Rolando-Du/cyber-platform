import { apiFetch } from "../lib/api";

export type CourseLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

export type ContentStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export type CourseModule = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  status: ContentStatus;
  order: number;
  createdAt: string;
  updatedAt: string;

  _count: {
    lessons: number;
    quizzes: number;
  };
};

export type CourseDetails = {
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

  path: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    status: ContentStatus;
    order: number;
    createdAt: string;
    updatedAt: string;
  };

  modules: CourseModule[];

  _count: {
    enrollments: number;
  };
};

type CourseResponse = {
  success: boolean;
  message?: string;
  data?: {
    course: CourseDetails;
  };
};

export const getCourseById = async (
  id: string,
): Promise<CourseDetails> => {
  const response = await apiFetch(
    `/api/v1/courses/${id}`,
  );

  const result =
    (await response.json()) as CourseResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo obtener el curso",
    );
  }

  return result.data.course;
};