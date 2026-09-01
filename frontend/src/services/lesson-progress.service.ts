import { apiFetch } from "../lib/api";

export type LessonProgressStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED";

export type LessonProgress = {
  id: string;
  userId: string;
  lessonId: string;
  status: LessonProgressStatus;
  progress: number;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;

  lesson: {
    id: string;
    moduleId: string;
    title: string;
    slug: string;
    description: string | null;

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

type LessonProgressListResponse = {
  success: boolean;
  message?: string;
  data?: {
    progress: LessonProgress[];
  };
};

type LessonProgressResponse = {
  success: boolean;
  message?: string;
  data?: {
    progress: LessonProgress;
  };
};

export const getMyLessonProgress =
  async (): Promise<LessonProgress[]> => {
    const response = await apiFetch(
      "/api/v1/lesson-progress",
    );

    const result =
      (await response.json()) as LessonProgressListResponse;

    if (
      !response.ok ||
      !result.success ||
      !result.data
    ) {
      throw new Error(
        result.message ??
          "No se pudo obtener el progreso de las lecciones",
      );
    }

    return result.data.progress;
  };

export const createLessonProgress = async (
  lessonId: string,
  status: LessonProgressStatus,
  progress: number,
): Promise<LessonProgress> => {
  const response = await apiFetch(
    "/api/v1/lesson-progress",
    {
      method: "POST",
      body: JSON.stringify({
        lessonId,
        status,
        progress,
      }),
    },
  );

  const result =
    (await response.json()) as LessonProgressResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo crear el progreso de la lección",
    );
  }

  return result.data.progress;
};

export const updateLessonProgress = async (
  id: string,
  status: LessonProgressStatus,
  progress: number,
): Promise<LessonProgress> => {
  const response = await apiFetch(
    `/api/v1/lesson-progress/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
        progress,
      }),
    },
  );

  const result =
    (await response.json()) as LessonProgressResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudo actualizar el progreso de la lección",
    );
  }

  return result.data.progress;
};