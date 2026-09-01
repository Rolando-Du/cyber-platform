import { prisma } from "../../config/prisma.js";
import type {
  CreateCourseInput,
  UpdateCourseInput,
} from "./course.schemas.js";

export const getCourses = async () => {
  return prisma.course.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    include: {
      path: true,
      _count: {
        select: {
          modules: true,
          enrollments: true,
        },
      },
    },
  });
};

export const getCourseById = async (id: string) => {
  return prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      path: true,
      modules: {
        orderBy: {
          order: "asc",
        },
        include: {
          _count: {
            select: {
              lessons: true,
              quizzes: true,
            },
          },
        },
      },
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });
};

export const createCourse = async (input: CreateCourseInput) => {
  const learningPath = await prisma.learningPath.findUnique({
    where: {
      id: input.pathId,
    },
  });

  if (!learningPath) {
    throw new Error("LEARNING_PATH_NOT_FOUND");
  }

  const existingCourse = await prisma.course.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (existingCourse) {
    throw new Error("COURSE_SLUG_ALREADY_EXISTS");
  }

  return prisma.course.create({
    data: {
      pathId: input.pathId,
      title: input.title,
      slug: input.slug,
      level: input.level,
      status: input.status,
      order: input.order,
      ...(input.description !== undefined && {
        description: input.description,
      }),
    },
    include: {
      path: true,
    },
  });
};

export const updateCourse = async (
  id: string,
  input: UpdateCourseInput,
) => {
  const existingCourse = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!existingCourse) {
    throw new Error("COURSE_NOT_FOUND");
  }

  if (
    input.slug !== undefined &&
    input.slug !== existingCourse.slug
  ) {
    const courseWithSameSlug =
      await prisma.course.findUnique({
        where: {
          slug: input.slug,
        },
      });

    if (courseWithSameSlug) {
      throw new Error("COURSE_SLUG_ALREADY_EXISTS");
    }
  }

  const data = {
    ...(input.title !== undefined && {
      title: input.title,
    }),
    ...(input.slug !== undefined && {
      slug: input.slug,
    }),
    ...(input.description !== undefined && {
      description: input.description,
    }),
    ...(input.level !== undefined && {
      level: input.level,
    }),
    ...(input.status !== undefined && {
      status: input.status,
    }),
    ...(input.order !== undefined && {
      order: input.order,
    }),
  };

  return prisma.course.update({
    where: {
      id,
    },
    data,
    include: {
      path: true,
    },
  });
};

export const deleteCourse = async (id: string) => {
  const existingCourse = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!existingCourse) {
    throw new Error("COURSE_NOT_FOUND");
  }

  return prisma.course.delete({
    where: {
      id,
    },
  });
};