import { prisma } from "../../config/prisma.js";

export const syncCourseCompletion = async (
  userId: string,
  courseId: string,
) => {
  const enrollment =
    await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      select: {
        id: true,
        status: true,
      },
    });

  if (!enrollment) {
    return null;
  }

  if (enrollment.status === "CANCELLED") {
    return enrollment;
  }

  const lessons = await prisma.lesson.findMany({
    where: {
      status: "PUBLISHED",
      module: {
        courseId,
        status: "PUBLISHED",
      },
    },
    select: {
      id: true,
    },
  });

  const quizzes = await prisma.quiz.findMany({
    where: {
      status: "PUBLISHED",
      module: {
        courseId,
        status: "PUBLISHED",
      },
    },
    select: {
      id: true,
      passingScore: true,
      attempts: {
        where: {
          userId,
          status: "COMPLETED",
        },
        select: {
          score: true,
        },
      },
    },
  });

  const completedLessonCount =
    await prisma.lessonProgress.count({
      where: {
        userId,
        status: "COMPLETED",
        lessonId: {
          in: lessons.map(
            (lesson) => lesson.id,
          ),
        },
      },
    });

  const approvedQuizCount = quizzes.filter(
    (quiz) =>
      quiz.attempts.some(
        (attempt) =>
          attempt.score !== null &&
          attempt.score >=
            quiz.passingScore,
      ),
  ).length;

  const allLessonsCompleted =
    completedLessonCount ===
    lessons.length;

  const allQuizzesApproved =
    approvedQuizCount ===
    quizzes.length;

  const hasContent =
    lessons.length > 0 ||
    quizzes.length > 0;

  const isCourseCompleted =
    hasContent &&
    allLessonsCompleted &&
    allQuizzesApproved;

  if (
    isCourseCompleted &&
    enrollment.status === "ACTIVE"
  ) {
    return prisma.enrollment.update({
      where: {
        id: enrollment.id,
      },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });
  }

  if (
    !isCourseCompleted &&
    enrollment.status === "COMPLETED"
  ) {
    return prisma.enrollment.update({
      where: {
        id: enrollment.id,
      },
      data: {
        status: "ACTIVE",
        completedAt: null,
      },
    });
  }

  return enrollment;
};