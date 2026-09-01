import {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getCourseById,
  type CourseDetails,
} from "../services/course.service";

const courseLevelLabels = {
  BEGINNER: "Principiante",
  INTERMEDIATE: "Intermedio",
  ADVANCED: "Avanzado",
};

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

function ModuleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        d="M4 6.5 12 3l8 3.5-8 3.5-8-3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m4 11 8 3.5 8-3.5M4 15.5 12 19l8-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CoursePage() {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  const [course, setCourse] =
    useState<CourseDetails | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCourse = async () => {
      if (!courseId) {
        setError(
          "No se indicó el curso que querés abrir.",
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const courseData =
          await getCourseById(courseId);

        if (isMounted) {
          setCourse(courseData);
        }
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar el curso",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <p className="text-sm text-slate-500">
          Cargando curso...
        </p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <p className="text-lg font-semibold text-white">
            No pudimos abrir el curso
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error ||
              "El curso solicitado no está disponible."}
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
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeftIcon />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-800">
          <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                {course.path.title}
              </span>

              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400">
                {courseLevelLabels[course.level]}
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
              {course.description ??
                "Curso de formación en ciberseguridad."}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <p>
                <span className="font-semibold text-white">
                  {course.modules.length}
                </span>{" "}
                {course.modules.length === 1
                  ? "módulo"
                  : "módulos"}
              </p>

              <p>
                <span className="font-semibold text-white">
                  {course._count.enrollments}
                </span>{" "}
                {course._count.enrollments === 1
                  ? "inscripción"
                  : "inscripciones"}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-cyan-400">
              Contenido
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Módulos del curso
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Avanzá por los módulos en el orden propuesto.
            </p>
          </div>

          {course.modules.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
              <p className="font-medium text-white">
                Este curso todavía no tiene módulos.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                El contenido aparecerá acá cuando esté disponible.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {course.modules.map(
                (module, index) => (
                  <article
                    key={module.id}
                    className="group flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700 hover:bg-slate-900"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                      <ModuleIcon />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Módulo {index + 1}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {module.title}
                      </h3>

                      {module.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {module.description}
                        </p>
                      )}
                    </div>

                    <Link
                      to={`/modules/${module.id}`}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-cyan-400 transition group-hover:bg-cyan-500/10 group-hover:text-cyan-300"
                    >
                      Ver módulo
                      <ArrowIcon />
                    </Link>
                  </article>
                ),
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default CoursePage;