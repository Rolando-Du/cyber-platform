import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";

import {
  clearSession,
  getStoredUser,
} from "../lib/auth";
import { validateSession } from "../lib/session";
import {
  getMyEnrollments,
  type Enrollment,
} from "../services/enrollment.service";

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path
        d="M12 3 5 6v5c0 4.8 2.9 8.7 7 10 4.1-1.3 7-5.2 7-10V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9.5 12 1.7 1.7 3.6-4"
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

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M10 6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8l4 4-4 4M9 12h9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const roleLabels = {
  STUDENT: "Estudiante",
  INSTRUCTOR: "Instructor",
  ADMIN: "Administrador",
};

const courseLevelLabels = {
  BEGINNER: "Principiante",
  INTERMEDIATE: "Intermedio",
  ADVANCED: "Avanzado",
};

const enrollmentStatusLabels = {
  ACTIVE: "En curso",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

function HomePage() {
  const [user, setUser] = useState(() => getStoredUser());

  const [enrollments, setEnrollments] = useState<
    Enrollment[]
  >([]);

  const [
    isLoadingEnrollments,
    setIsLoadingEnrollments,
  ] = useState(false);

  const [
    enrollmentsError,
    setEnrollmentsError,
  ] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      try {
        const validatedUser =
          await validateSession();

        if (!isMounted) {
          return;
        }

        setUser(validatedUser);

        if (!validatedUser) {
          setEnrollments([]);
          return;
        }

        setIsLoadingEnrollments(true);
        setEnrollmentsError("");

        const userEnrollments =
          await getMyEnrollments();

        if (isMounted) {
          setEnrollments(userEnrollments);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error(
          "Home data error:",
          error,
        );

        setEnrollmentsError(
          error instanceof Error
            ? error.message
            : "No fue posible cargar tus cursos",
        );
      } finally {
        if (isMounted) {
          setIsLoadingEnrollments(false);
        }
      }
    };

    void loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const activeCourses = enrollments.filter(
      (enrollment) =>
        enrollment.status === "ACTIVE",
    ).length;

    const completedCourses = enrollments.filter(
      (enrollment) =>
        enrollment.status === "COMPLETED",
    ).length;

    return [
      {
        label: "Cursos activos",
        value: activeCourses,
      },
      {
        label: "Cursos completados",
        value: completedCourses,
      },
      {
        label: "Cursos inscriptos",
        value: enrollments.length,
      },
    ];
  }, [enrollments]);

  const currentEnrollment =
    enrollments.find(
      (enrollment) =>
        enrollment.status === "ACTIVE",
    ) ?? enrollments[0];

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setEnrollments([]);
    setEnrollmentsError("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
              <ShieldIcon />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-white">
                Cyber Platform
              </p>

              <p className="text-xs text-slate-500">
                Learning Security
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-400 lg:flex">
            <a
              href="#inicio"
              className="font-medium text-white transition hover:text-cyan-300"
            >
              Inicio
            </a>

            <a
              href="#rutas"
              className="transition hover:text-white"
            >
              Rutas
            </a>

            <a
              href="#cursos"
              className="transition hover:text-white"
            >
              Cursos
            </a>

            <a
              href="#progreso"
              className="transition hover:text-white"
            >
              Progreso
            </a>
          </nav>

          {user ? (
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 p-1.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-sm font-semibold text-cyan-300">
                {user.firstName
                  .charAt(0)
                  .toUpperCase()}
                {user.lastName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="hidden min-w-0 px-2 sm:block">
                <p className="max-w-40 truncate text-sm font-semibold leading-5 text-white">
                  {user.firstName}{" "}
                  {user.lastName}
                </p>

                <p className="text-xs leading-4 text-slate-500">
                  {roleLabels[user.role]}
                </p>
              </div>

              <div className="mx-1 hidden h-7 w-px bg-slate-800 sm:block" />

              <button
                type="button"
                onClick={handleLogout}
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <LogoutIcon />

                <span className="hidden xl:inline">
                  Cerrar sesión
                </span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="shrink-0 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>

      <main>
        <section
          id="inicio"
          className="relative overflow-hidden border-b border-slate-800"
        >
          <div className="absolute left-1/2 top-0 z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Ciberseguridad desde cero
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Aprendé ciberseguridad
                <span className="block text-cyan-400">
                  paso a paso.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Una plataforma diseñada para aprender redes,
                sistemas, análisis de tráfico, seguridad
                defensiva y hacking ético mediante teoría,
                práctica y evaluaciones.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <a
                    href="#cursos"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Continuar aprendiendo
                    <ArrowIcon />
                  </a>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Comenzar a aprender
                    <ArrowIcon />
                  </Link>
                )}

                <a
                  href="#cursos"
                  className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900"
                >
                  Explorar cursos
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
              {user &&
              isLoadingEnrollments ? (
                <div className="flex min-h-64 items-center justify-center">
                  <p className="text-sm text-slate-500">
                    Cargando tus cursos...
                  </p>
                </div>
              ) : currentEnrollment ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                        Continuar aprendiendo
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-white">
                        {
                          currentEnrollment
                            .course.title
                        }
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {
                          currentEnrollment
                            .course.path.title
                        }
                      </p>
                    </div>

                    <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                      <ShieldIcon />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Estado
                      </p>

                      <p className="mt-2 text-sm font-medium text-white">
                        {
                          enrollmentStatusLabels[
                            currentEnrollment
                              .status
                          ]
                        }
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Módulos
                      </p>

                      <p className="mt-2 text-sm font-medium text-white">
                        {
                          currentEnrollment
                            .course._count
                            .modules
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Curso actual
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {currentEnrollment.course
                        .description ??
                        "Continuá avanzando en este curso para completar tu ruta de aprendizaje."}
                    </p>

                    <Link
                      to={`/courses/${currentEnrollment.course.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                    >
                      Abrir curso
                      <ArrowIcon />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex min-h-64 flex-col items-center justify-center text-center">
                  <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                    <ShieldIcon />
                  </div>

                  <h2 className="mt-5 text-lg font-semibold text-white">
                    {user
                      ? "Todavía no tenés cursos"
                      : "Comenzá tu formación"}
                  </h2>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                    {user
                      ? "Cuando te inscribas a un curso, podrás continuar tu formación desde acá."
                      : "Iniciá sesión para acceder a tus cursos y seguir tu progreso."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {user && (
          <section
            id="progreso"
            className="mx-auto max-w-7xl px-5 py-12 lg:px-8"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
                >
                  <p className="text-sm text-slate-500">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section
          id="cursos"
          className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-cyan-400">
                Formación
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {user
                  ? "Tus cursos"
                  : "Tu formación"}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {user
                  ? "Cursos asociados a tu cuenta dentro de la plataforma."
                  : "Iniciá sesión para consultar tus cursos y tu progreso."}
              </p>
            </div>
          </div>

          {enrollmentsError && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {enrollmentsError}
            </div>
          )}

          {user && isLoadingEnrollments && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center text-sm text-slate-500">
              Cargando tus cursos...
            </div>
          )}

          {user &&
            !isLoadingEnrollments &&
            enrollments.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-10 text-center">
                <p className="font-medium text-white">
                  No tenés cursos inscriptos.
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Tus próximos cursos aparecerán
                  en esta sección.
                </p>
              </div>
            )}

          {user &&
            !isLoadingEnrollments &&
            enrollments.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {enrollments.map(
                  (enrollment) => (
                    <article
                      key={enrollment.id}
                      className="group flex min-h-72 flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                          {
                            courseLevelLabels[
                              enrollment.course
                                .level
                            ]
                          }
                        </span>

                        <span className="text-xs text-slate-500">
                          {
                            enrollment.course
                              ._count.modules
                          }{" "}
                          módulos
                        </span>
                      </div>

                      <p className="mt-5 text-xs font-medium text-cyan-400">
                        {
                          enrollment.course.path
                            .title
                        }
                      </p>

                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {
                          enrollment.course
                            .title
                        }
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                        {enrollment.course
                          .description ??
                          "Curso de formación en ciberseguridad."}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">
                        <span className="text-xs font-medium text-slate-500">
                          {
                            enrollmentStatusLabels[
                              enrollment.status
                            ]
                          }
                        </span>

                        <Link
                          to={`/courses/${enrollment.course.id}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition group-hover:text-cyan-300"
                        >
                          Abrir curso
                          <ArrowIcon />
                        </Link>
                      </div>
                    </article>
                  ),
                )}
              </div>
            )}

          {!user && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
              <p className="text-lg font-semibold text-white">
                Iniciá sesión para continuar.
              </p>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Tus cursos, inscripciones y
                progreso se mostrarán acá.
              </p>

              <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Iniciar sesión
                <ArrowIcon />
              </Link>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Cyber Platform</p>

          <p>
            Plataforma de aprendizaje en
            ciberseguridad.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;