import { prisma } from "../../config/prisma.js";
import type {
  CreateLearningPathInput,
  UpdateLearningPathInput,
} from "./learning-path.schemas.js";

export const getLearningPaths = async () => {
  return prisma.learningPath.findMany({
    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt: "asc",
      },
    ],
    include: {
      _count: {
        select: {
          courses: true,
        },
      },
    },
  });
};

export const getLearningPathById = async (id: string) => {
  return prisma.learningPath.findUnique({
    where: {
      id,
    },
    include: {
      courses: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const createLearningPath = async (
  input: CreateLearningPathInput,
) => {
  const existingPath = await prisma.learningPath.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (existingPath) {
    throw new Error("LEARNING_PATH_SLUG_ALREADY_EXISTS");
  }

  return prisma.learningPath.create({
    data: {
      title: input.title,
      slug: input.slug,
      status: input.status,
      order: input.order,
      ...(input.description !== undefined && {
        description: input.description,
      }),
    },
  });
};

export const updateLearningPath = async (
  id: string,
  input: UpdateLearningPathInput,
) => {
  const existingPath = await prisma.learningPath.findUnique({
    where: {
      id,
    },
  });

  if (!existingPath) {
    throw new Error("LEARNING_PATH_NOT_FOUND");
  }

  if (input.slug !== undefined && input.slug !== existingPath.slug) {
    const pathWithSameSlug = await prisma.learningPath.findUnique({
      where: {
        slug: input.slug,
      },
    });

    if (pathWithSameSlug) {
      throw new Error("LEARNING_PATH_SLUG_ALREADY_EXISTS");
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
    ...(input.status !== undefined && {
      status: input.status,
    }),
    ...(input.order !== undefined && {
      order: input.order,
    }),
  };

  return prisma.learningPath.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteLearningPath = async (id: string) => {
  const existingPath = await prisma.learningPath.findUnique({
    where: {
      id,
    },
  });

  if (!existingPath) {
    throw new Error("LEARNING_PATH_NOT_FOUND");
  }

  return prisma.learningPath.delete({
    where: {
      id,
    },
  });
};