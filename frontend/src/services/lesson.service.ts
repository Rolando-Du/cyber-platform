import { apiFetch } from "../lib/api";
import type { ContentStatus } from "./course.service";

export type LessonBlockType =
  | "TEXT"
  | "HEADING"
  | "IMAGE"
  | "VIDEO"
  | "CODE"
  | "CALLOUT"
  | "TABLE"
  | "DOWNLOAD";

export type LessonModule = {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  status: ContentStatus;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type LessonBlock = {
  id: string;
  lessonId: string;
  type: LessonBlockType;
  content: unknown;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type LessonDetails = {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  description: string | null;
  status: ContentStatus;
  order: number;
  createdAt: string;
  updatedAt: string;

  module: LessonModule;

  blocks: LessonBlock[];

  _count: {
    progress: number;
  };
};

type LessonResponse = {
  success: boolean;
  message?: string;
  data?: {
    lesson: LessonDetails;
  };
};

export const getLessonById = async (
  id: string,
): Promise<LessonDetails> => {
  const response = await apiFetch(
    `/api/v1/lessons/${id}`,
  );

  const result =
    (await response.json()) as LessonResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo obtener la lección",
    );
  }

  return result.data.lesson;
};