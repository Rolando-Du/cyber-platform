import { prisma } from "../../config/prisma.js";

import type {
  CreateEnrollmentInput,
  UpdateEnrollmentInput,
} from "./enrollment.schemas.js";

export const getUserEnrollments = async (userId: string) => {
  return prisma.enrollment.findMany({
    where: {
      userId,
    },
    orderBy: {
      enrolledAt: "desc",
    },
    include: {
      course: {
        include: {
          path: true,
          _count: {
            select: {
              modules: true,
            },
          },
        },
      },
    },
  });
};

export const getUserEnrollmentById = async (
  id: string,
  userId: string,
) => {
  return prisma.enrollment.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      course: {
        include: {
          path: true,
          modules: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },
    },
  });
};

export const createEnrollment = async (
  userId: string,
  input: CreateEnrollmentInput,
) => {
  const course = await prisma.course.findUnique({
    where: {
      id: input.courseId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!course) {
    throw new Error("COURSE_NOT_FOUND");
  }

  if (course.status !== "PUBLISHED") {
    throw new Error("COURSE_NOT_AVAILABLE");
  }

  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: input.courseId,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingEnrollment) {
    throw new Error("ENROLLMENT_ALREADY_EXISTS");
  }

  return prisma.enrollment.create({
    data: {
      userId,
      courseId: input.courseId,
      status: "ACTIVE",
    },
    include: {
      course: {
        include: {
          path: true,
        },
      },
    },
  });
};

export const updateEnrollment = async (
  id: string,
  userId: string,
  input: UpdateEnrollmentInput,
) => {
  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!existingEnrollment) {
    throw new Error("ENROLLMENT_NOT_FOUND");
  }

  const data = {
    ...(input.status !== undefined && {
      status: input.status,
      completedAt:
        input.status === "COMPLETED" ? new Date() : null,
    }),
  };

  return prisma.enrollment.update({
    where: {
      id,
    },
    data,
    include: {
      course: {
        include: {
          path: true,
        },
      },
    },
  });
};