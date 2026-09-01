import {
  type FormEvent,
  useState,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { apiUrl } from "../lib/api";
import {
  saveSession,
  type AuthUser,
} from "../lib/auth";

type LoginResponse = {
  success: boolean;
  message?: string;
  data?: {
    user: AuthUser;
    accessToken: string;
  };
};

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-7 w-7"
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

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        apiUrl("/api/v1/auth/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const result =
        (await response.json()) as LoginResponse;

      if (
        !response.ok ||
        !result.success ||
        !result.data
      ) {
        setError(
          result.message ??
            "No fue posible iniciar sesión",
        );

        return;
      }

      saveSession(
        result.data.accessToken,
        result.data.user,
      );

      navigate("/");
    } catch {
      setError(
        "No se pudo conectar con el servidor. Verificá que el backend esté funcionando.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-6 py-12">
        <Link
          to="/"
          className="mb-10 flex w-fit items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
            <ShieldIcon />
          </div>

          <div>
            <p className="font-semibold tracking-wide text-white">
              Cyber Platform
            </p>
            <p className="text-xs text-slate-500">
              Learning Security
            </p>
          </div>
        </Link>

        <div>
          <p className="text-sm font-medium text-cyan-400">
            Bienvenido
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Iniciá sesión
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Accedé a tus cursos, lecciones, evaluaciones y
            progreso dentro de la plataforma.
          </p>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="usuario@ejemplo.com"
              required
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Contraseña
              </label>

              <button
                type="button"
                className="text-xs font-medium text-slate-500 transition hover:text-cyan-400"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Ingresá tu contraseña"
              required
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Iniciando sesión..."
              : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-8 border-t border-slate-800 pt-6">
          <p className="text-center text-xs leading-5 text-slate-500">
            Cyber Platform · Formación práctica en
            ciberseguridad
          </p>
        </div>
      </div>

      <div className="relative hidden flex-1 overflow-hidden border-l border-slate-800 lg:block">
        <div className="absolute inset-0 bg-slate-900" />

        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex h-full items-center justify-center p-12">
          <div className="max-w-xl">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
              <ShieldIcon />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Aprender. Practicar. Proteger.
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white">
              Construí una base sólida en ciberseguridad.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
              Avanzá mediante rutas estructuradas, contenido
              práctico, seguimiento de progreso y evaluaciones
              diseñadas para comprobar lo aprendido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;