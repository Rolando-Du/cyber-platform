import { apiFetch } from "../lib/api";

export type EnrollmentStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

export type CourseLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

export type ContentStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export type EnrollmentCourse = {
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

  _count: {
    modules: number;
  };
};

export type Enrollment = {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  completedAt: string | null;
  updatedAt: string;
  course: EnrollmentCourse;
};

type EnrollmentsResponse = {
  success: boolean;
  message?: string;
  data?: {
    enrollments: Enrollment[];
  };
};

export const getMyEnrollments = async (): Promise<
  Enrollment[]
> => {
  const response = await apiFetch(
    "/api/v1/enrollments",
  );

  const result =
    (await response.json()) as EnrollmentsResponse;

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "No se pudieron obtener tus cursos",
    );
  }

  return result.data.enrollments;
};