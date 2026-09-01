import {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getLessonById,
  type LessonBlock,
  type LessonDetails,
} from "../services/lesson.service";

import {
  createLessonProgress,
  getMyLessonProgress,
  updateLessonProgress,
  type LessonProgress,
} from "../services/lesson-progress.service";

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

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"
        stroke="currentColor"
        strokeWidth="1.8"
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

const getTextContent = (
  content: unknown,
): string | null => {
  if (
    typeof content === "object" &&
    content !== null &&
    "text" in content
  ) {
    const text = (
      content as Record<string, unknown>
    ).text;

    if (typeof text === "string") {
      return text;
    }
  }

  return null;
};

function LessonContentBlock({
  block,
}: {
  block: LessonBlock;
}) {
  if (block.type === "TEXT") {
    const text = getTextContent(block.content);

    if (!text) {
      return null;
    }

    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
        <p className="text-base leading-8 text-slate-300">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-6">
      <p className="text-sm font-medium text-slate-300">
        Bloque {block.type}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        Este tipo de contenido será incorporado
        al visor de lecciones próximamente.
      </p>
    </div>
  );
}

function LessonPage() {
  const { lessonId } = useParams<{
    lessonId: string;
  }>();

  const [lesson, setLesson] =
    useState<LessonDetails | null>(null);

  const [lessonProgress, setLessonProgress] =
    useState<LessonProgress | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isLoadingProgress, setIsLoadingProgress] =
    useState(true);

  const [isSavingProgress, setIsSavingProgress] =
    useState(false);

  const [error, setError] =
    useState("");

  const [progressError, setProgressError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    const loadLesson = async () => {
      if (!lessonId) {
        setError(
          "No se indicó la lección que querés abrir.",
        );

        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const lessonData =
          await getLessonById(lessonId);

        if (isMounted) {
          setLesson(lessonData);
        }
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar la lección",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadLesson();

    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  useEffect(() => {
    let isMounted = true;

    const loadProgress = async () => {
      if (!lessonId) {
        setIsLoadingProgress(false);
        return;
      }

      try {
        setIsLoadingProgress(true);
        setProgressError("");

        const progressRecords =
          await getMyLessonProgress();

        const currentProgress =
          progressRecords.find(
            (progress) =>
              progress.lessonId === lessonId,
          ) ?? null;

        if (isMounted) {
          setLessonProgress(currentProgress);
        }
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setProgressError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo obtener el progreso",
        );
      } finally {
        if (isMounted) {
          setIsLoadingProgress(false);
        }
      }
    };

    void loadProgress();

    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  const handleCompleteLesson = async () => {
    if (!lessonId) {
      return;
    }

    try {
      setIsSavingProgress(true);
      setProgressError("");

      const updatedProgress = lessonProgress
        ? await updateLessonProgress(
            lessonProgress.id,
            "COMPLETED",
            100,
          )
        : await createLessonProgress(
            lessonId,
            "COMPLETED",
            100,
          );

      setLessonProgress(updatedProgress);
    } catch (saveError) {
      setProgressError(
        saveError instanceof Error
          ? saveError.message
          : "No se pudo actualizar el progreso",
      );
    } finally {
      setIsSavingProgress(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <p className="text-sm text-slate-500">
          Cargando lección...
        </p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <p className="text-lg font-semibold text-white">
            No pudimos abrir la lección
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error ||
              "La lección solicitada no está disponible."}
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

  const progressValue =
    lessonProgress?.progress ?? 0;

  const isCompleted =
    lessonProgress?.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex h-20 max-w-5xl items-center px-5 lg:px-8">
          <Link
            to={`/modules/${lesson.module.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeftIcon />
            Volver al módulo
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-800">
          <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8 lg:py-16">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                <BookIcon />
              </div>

              <p className="text-sm font-medium">
                {lesson.module.title}
              </p>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {lesson.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
              {lesson.description ??
                "Lección de formación en ciberseguridad."}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <p>
                <span className="font-semibold text-white">
                  {lesson.blocks.length}
                </span>{" "}
                {lesson.blocks.length === 1
                  ? "bloque de contenido"
                  : "bloques de contenido"}
              </p>

              {!isLoadingProgress && (
                <p>
                  <span className="font-semibold text-white">
                    {progressValue}%
                  </span>{" "}
                  completado
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-cyan-400">
              Lección
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Contenido
            </h2>
          </div>

          {lesson.blocks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
              <p className="font-medium text-white">
                Esta lección todavía no tiene contenido.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Los bloques aparecerán acá cuando
                estén disponibles.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {lesson.blocks.map((block) => (
                <LessonContentBlock
                  key={block.id}
                  block={block}
                />
              ))}
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-cyan-400">
                  Tu progreso
                </p>

                {isLoadingProgress ? (
                  <p className="mt-2 text-sm text-slate-500">
                    Cargando progreso...
                  </p>
                ) : (
                  <>
                    <div className="mt-3 flex items-center gap-3">
                      <p className="text-xl font-semibold text-white">
                        {isCompleted
                          ? "Lección completada"
                          : "Lección pendiente"}
                      </p>

                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                          <CheckIcon />
                          Completada
                        </span>
                      )}
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-cyan-400 transition-all"
                        style={{
                          width: `${progressValue}%`,
                        }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      {progressValue}% completado
                    </p>
                  </>
                )}

                {progressError && (
                  <p className="mt-4 text-sm text-red-300">
                    {progressError}
                  </p>
                )}
              </div>

              {!isLoadingProgress && (
                <button
                  type="button"
                  onClick={handleCompleteLesson}
                  disabled={
                    isCompleted ||
                    isSavingProgress
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                >
                  {isCompleted ? (
                    <>
                      <CheckIcon />
                      Lección completada
                    </>
                  ) : isSavingProgress ? (
                    "Guardando..."
                  ) : (
                    <>
                      <CheckIcon />
                      Marcar como completada
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LessonPage;