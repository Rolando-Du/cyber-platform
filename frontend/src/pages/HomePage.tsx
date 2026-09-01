import { useState } from "react";
import { Link } from "react-router-dom";

import {
  clearSession,
  getStoredUser,
} from "../lib/auth";

const courses = [
  {
    title: "Fundamentos de Redes",
    description:
      "Aprendé cómo se comunican los dispositivos, los protocolos principales y las bases necesarias para ciberseguridad.",
    level: "Principiante",
    progress: 35,
    modules: 5,
  },
  {
    title: "Administración de Sistemas",
    description:
      "Conocé los fundamentos de Linux y Windows desde la perspectiva de administración y seguridad.",
    level: "Principiante",
    progress: 0,
    modules: 4,
  },
  {
    title: "Análisis de Tráfico",
    description:
      "Introducción al análisis de paquetes y tráfico de red utilizando herramientas especializadas.",
    level: "Intermedio",
    progress: 0,
    modules: 4,
  },
];

const stats = [
  {
    label: "Cursos activos",
    value: "1",
  },
  {
    label: "Lecciones completadas",
    value: "1",
  },
  {
    label: "Evaluaciones",
    value: "2",
  },
];

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

function HomePage() {
  const [user, setUser] = useState(() => getStoredUser());

  const handleLogout = () => {
    clearSession();
    setUser(null);
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
                {user.firstName.charAt(0).toUpperCase()}
                {user.lastName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden min-w-0 px-2 sm:block">
                <p className="max-w-40 truncate text-sm font-semibold leading-5 text-white">
                  {user.firstName} {user.lastName}
                </p>

                <p className="text-xs leading-4 text-slate-500">
                  {roleLabels[user.role]}
                </p>
              </div>

              <div className="mx-1 hidden h-7 w-px bg-slate-800 sm:block" />

              <button
                type="button"
                onClick={handleLogout}
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
                sistemas, análisis de tráfico, seguridad defensiva
                y hacking ético mediante teoría, práctica y
                evaluaciones.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Continuar aprendiendo
                    <ArrowIcon />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Comenzar a aprender
                    <ArrowIcon />
                  </Link>
                )}

                <button
                  type="button"
                  className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900"
                >
                  Explorar cursos
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Tu progreso
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Fundamentos de Redes
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Ciberseguridad desde Cero
                  </p>
                </div>

                <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                  <ShieldIcon />
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Progreso del curso
                  </span>

                  <span className="font-semibold text-white">
                    35%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[35%] rounded-full bg-cyan-400" />
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Continuar con
                </p>

                <p className="mt-2 font-medium text-white">
                  Introducción a las Redes
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Conceptos fundamentales y funcionamiento de una
                  red informática.
                </p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  Continuar lección
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </section>

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

        <section
          id="cursos"
          className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-cyan-400">
                Formación
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Tus cursos
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Avanzá a tu ritmo y continuá donde lo dejaste.
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Ver todos los cursos
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.title}
                className="group flex min-h-72 flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                    {course.level}
                  </span>

                  <span className="text-xs text-slate-500">
                    {course.modules} módulos
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {course.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                  {course.description}
                </p>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-xs text-slate-500">
                    <span>Progreso</span>
                    <span>{course.progress}%</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition group-hover:text-cyan-300"
                >
                  {course.progress > 0
                    ? "Continuar curso"
                    : "Ver curso"}

                  <ArrowIcon />
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>Cyber Platform</p>

          <p>
            Plataforma de aprendizaje en ciberseguridad.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;