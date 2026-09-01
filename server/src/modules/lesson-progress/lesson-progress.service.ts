import { prisma } from "../../config/prisma.js";

import type {
  CreateLessonProgressInput,
  UpdateLessonProgressInput,
} from "./lesson-progress.schemas.js";

export const getUserLessonProgress = async (userId: string) => {
  return prisma.lessonProgress.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      lesson: {
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

export const getUserLessonProgressById = async (
  id: string,
  userId: string,
) => {
  return prisma.lessonProgress.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      lesson: {
        include: {
          module: {
            include: {
              course: true,
            },
          },
          blocks: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },
    },
  });
};

export const createLessonProgress = async (
  userId: string,
  input: CreateLessonProgressInput,
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: input.lessonId,
    },
    select: {
      id: true,
      module: {
        select: {
          courseId: true,
        },
      },
    },
  });

  if (!lesson) {
    throw new Error("LESSON_NOT_FOUND");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: lesson.module.courseId,
      },
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!enrollment) {
    throw new Error("ENROLLMENT_REQUIRED");
  }

  if (enrollment.status !== "ACTIVE") {
    throw new Error("ENROLLMENT_NOT_ACTIVE");
  }

  const existingProgress = await prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId: input.lessonId,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingProgress) {
    throw new Error("LESSON_PROGRESS_ALREADY_EXISTS");
  }

  const now = new Date();

  return prisma.lessonProgress.create({
    data: {
      userId,
      lessonId: input.lessonId,
      status: input.status,
      progress: input.progress,
      startedAt:
        input.status === "NOT_STARTED" ? null : now,
      completedAt:
        input.status === "COMPLETED" ? now : null,
    },
    include: {
      lesson: {
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

export const updateLessonProgress = async (
  id: string,
  userId: string,
  input: UpdateLessonProgressInput,
) => {
  const existingProgress = await prisma.lessonProgress.findFirst({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
      status: true,
      progress: true,
      startedAt: true,
      completedAt: true,
      lesson: {
        select: {
          module: {
            select: {
              courseId: true,
            },
          },
        },
      },
    },
  });

  if (!existingProgress) {
    throw new Error("LESSON_PROGRESS_NOT_FOUND");
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: existingProgress.lesson.module.courseId,
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

  const data = {
    ...(input.status !== undefined && {
      status: input.status,

      startedAt:
        input.status === "NOT_STARTED"
          ? null
          : existingProgress.startedAt ?? new Date(),

      completedAt:
        input.status === "COMPLETED"
          ? new Date()
          : null,
    }),

    ...(input.progress !== undefined && {
      progress: input.progress,
    }),
  };

  return prisma.lessonProgress.update({
    where: {
      id,
    },
    data,
    include: {
      lesson: {
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