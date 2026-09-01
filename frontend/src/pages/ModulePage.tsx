import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { getAccessToken } from "../lib/auth";

import {
  getMyLessonProgress,
  type LessonProgress,
} from "../services/lesson-progress.service";

import {
  getModuleById,
  type ModuleDetails,
} from "../services/module.service";

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M19 12H5M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LessonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        d="M6 4h9a3 3 0 0 1 3 3v13H8a2 2 0 0 1-2-2V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M6 17.5A2.5 2.5 0 0 1 8.5 15H18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        d="M8 4h8M9 3v3M15 3v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <rect
        x="5"
        y="5"
        width="14"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="m9 12 1.2 1.2L12.5 11M14.5 12H16M9 17h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModulePage() {
  const { moduleId } = useParams<{
    moduleId: string;
  }>();

  const [module, setModule] =
    useState<ModuleDetails | null>(null);

  const [lessonProgress, setLessonProgress] =
    useState<LessonProgress[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    const loadModule = async () => {
      if (!moduleId) {
        setError(
          "No se indicó el módulo que querés abrir.",
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const moduleData =
          await getModuleById(moduleId);

        if (isMounted) {
          setModule(moduleData);
        }

        if (getAccessToken()) {
          try {
            const progress =
              await getMyLessonProgress();

            if (isMounted) {
              setLessonProgress(progress);
            }
          } catch (progressError) {
            console.error(
              "Module progress error:",
              progressError,
            );
          }
        }
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar el módulo",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadModule();

    return () => {
      isMounted = false;
    };
  }, [moduleId]);

  const progressByLessonId = useMemo(() => {
    return new Map(
      lessonProgress.map((progress) => [
        progress.lessonId,
        progress,
      ]),
    );
  }, [lessonProgress]);

  const completedLessons =
    module?.lessons.filter(
      (lesson) =>
        progressByLessonId.get(lesson.id)
          ?.status === "COMPLETED",
    ).length ?? 0;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <p className="text-sm text-slate-500">
          Cargando módulo...
        </p>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <p className="text-lg font-semibold text-white">
            No pudimos abrir el módulo
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error ||
              "El módulo solicitado no está disponible."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <ArrowLeftIcon />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex h-20 max-w-6xl items-center px-5 lg:px-8">
          <Link
            to={`/courses/${module.course.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeftIcon />
            Volver al curso
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-800">
          <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-16">
            <p className="text-sm font-medium text-cyan-400">
              {module.course.title}
            </p>

            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {module.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
              {module.description ??
                "Módulo de formación en ciberseguridad."}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <p>
                <span className="font-semibold text-white">
                  {module.lessons.length}
                </span>{" "}
                {module.lessons.length === 1
                  ? "lección"
                  : "lecciones"}
              </p>

              <p>
                <span className="font-semibold text-white">
                  {module.quizzes.length}
                </span>{" "}
                {module.quizzes.length === 1
                  ? "evaluación"
                  : "evaluaciones"}
              </p>

              {module.lessons.length > 0 && (
                <p>
                  <span className="font-semibold text-white">
                    {completedLessons}/
                    {module.lessons.length}
                  </span>{" "}
                  completadas
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              Aprendizaje
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Lecciones
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Completá las lecciones del módulo en el orden propuesto.
            </p>
          </div>

          {module.lessons.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
              <p className="font-medium text-white">
                Este módulo todavía no tiene lecciones.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {module.lessons.map(
                (lesson, index) => {
                  const progress =
                    progressByLessonId.get(
                      lesson.id,
                    );

                  const isCompleted =
                    progress?.status ===
                    "COMPLETED";

                  return (
                    <article
                      key={lesson.id}
                      className="group flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 hover:bg-slate-900"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                        <LessonIcon />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            Lección {index + 1}
                          </p>

                          {isCompleted && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                              <CheckIcon />
                              Completada
                            </span>
                          )}
                        </div>

                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {lesson.title}
                        </h3>

                        {lesson.description && (
                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {lesson.description}
                          </p>
                        )}

                        {progress &&
                          !isCompleted && (
                            <p className="mt-3 text-xs text-slate-500">
                              {progress.progress}%
                              completado
                            </p>
                          )}
                      </div>

                      <Link
                        to={`/lessons/${lesson.id}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-cyan-400 transition group-hover:bg-cyan-500/10 group-hover:text-cyan-300"
                      >
                        {isCompleted
                          ? "Revisar lección"
                          : "Abrir lección"}

                        <ArrowIcon />
                      </Link>
                    </article>
                  );
                },
              )}
            </div>
          )}

          {module.quizzes.length > 0 && (
            <div className="mt-14">
              <div>
                <p className="text-sm font-medium text-cyan-400">
                  Evaluación
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Cuestionarios
                </h2>
              </div>

              <div className="mt-8 space-y-4">
                {module.quizzes.map(
                  (quiz) => (
                    <article
                      key={quiz.id}
                      className="group flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 hover:bg-slate-900"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                        <QuizIcon />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          Evaluación
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-white">
                          {quiz.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          Puntaje mínimo:{" "}
                          {quiz.passingScore}%
                        </p>
                      </div>

                      <Link
                        to={`/quizzes/${quiz.id}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-violet-300 transition group-hover:bg-violet-500/10"
                      >
                        Ver evaluación
                        <ArrowIcon />
                      </Link>
                    </article>
                  ),
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ModulePage;