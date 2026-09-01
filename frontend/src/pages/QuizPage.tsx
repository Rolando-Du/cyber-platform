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
  createQuizAttempt,
  getMyQuizAttemptById,
  getMyQuizAttempts,
  submitQuizAttempt,
  type QuizAttempt,
  type QuizAttemptResult,
  type SubmittedQuizAttempt,
} from "../services/quiz-attempt.service";

import {
  getQuizById,
  type QuizDetails,
  type QuizQuestion,
} from "../services/quiz.service";

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

function QuizIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M9 3v3M15 3v3M9 11h6M9 15h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const questionTypeLabels = {
  SINGLE_CHOICE: "Una respuesta",
  MULTIPLE_CHOICE: "Varias respuestas",
  TRUE_FALSE: "Verdadero o falso",
};

function QuizPage() {
  const { quizId } = useParams<{
    quizId: string;
  }>();

  const [quiz, setQuiz] =
    useState<QuizDetails | null>(null);

  const [attempt, setAttempt] =
    useState<QuizAttempt | null>(null);

  const [answers, setAnswers] =
    useState<Record<string, string[]>>({});

  const [result, setResult] =
    useState<QuizAttemptResult | null>(null);

  const [
    submittedAttempt,
    setSubmittedAttempt,
  ] = useState<SubmittedQuizAttempt | null>(
    null,
  );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isStarting, setIsStarting] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formError, setFormError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    const loadQuiz = async () => {
      if (!quizId) {
        setError(
          "No se indicó la evaluación que querés abrir.",
        );
        setIsLoading(false);
        return;
      }

      if (!getAccessToken()) {
        setError(
          "Debés iniciar sesión para realizar esta evaluación.",
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const [quizData, attempts] =
          await Promise.all([
            getQuizById(quizId),
            getMyQuizAttempts(),
          ]);

        if (!isMounted) {
          return;
        }

        setQuiz(quizData);

        const activeAttempt =
          attempts.find(
            (currentAttempt) =>
              currentAttempt.quizId === quizId &&
              currentAttempt.status ===
                "IN_PROGRESS",
          ) ?? null;

        if (activeAttempt) {
          setAttempt(activeAttempt);
          return;
        }

        const completedAttemptSummary =
          attempts.find(
            (currentAttempt) =>
              currentAttempt.quizId === quizId &&
              currentAttempt.status ===
                "COMPLETED",
          ) ?? null;

        if (!completedAttemptSummary) {
          setAttempt(null);
          return;
        }

        const completedAttempt =
          await getMyQuizAttemptById(
            completedAttemptSummary.id,
          );

        if (!isMounted) {
          return;
        }

        const correctAnswers =
          completedAttempt.answers.filter(
            (answer) => answer.isCorrect,
          ).length;

        const totalQuestions =
          completedAttempt.answers.length;

        const score =
          completedAttempt.score ?? 0;

        const restoredResult: QuizAttemptResult =
          {
            correctAnswers,
            totalQuestions,
            score,
            passingScore:
              quizData.passingScore,
            passed:
              score >=
              quizData.passingScore,
          };

        setAttempt(completedAttempt);
        setSubmittedAttempt(
          completedAttempt,
        );
        setResult(restoredResult);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar la evaluación",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadQuiz();

    return () => {
      isMounted = false;
    };
  }, [quizId]);

  const answeredQuestions = useMemo(() => {
    if (!quiz) {
      return 0;
    }

    return quiz.questions.filter(
      (question) =>
        (answers[question.id]?.length ?? 0) >
        0,
    ).length;
  }, [answers, quiz]);

  const handleStartAttempt = async () => {
    if (!quiz) {
      return;
    }

    try {
      setIsStarting(true);
      setFormError("");

      const newAttempt =
        await createQuizAttempt(quiz.id);

      setAttempt(newAttempt);
      setAnswers({});
      setResult(null);
      setSubmittedAttempt(null);
    } catch (startError) {
      setFormError(
        startError instanceof Error
          ? startError.message
          : "No se pudo iniciar la evaluación",
      );
    } finally {
      setIsStarting(false);
    }
  };

  const handleOptionChange = (
    question: QuizQuestion,
    optionId: string,
  ) => {
    setFormError("");

    setAnswers((currentAnswers) => {
      const currentSelection =
        currentAnswers[question.id] ?? [];

      if (
        question.type ===
        "MULTIPLE_CHOICE"
      ) {
        const isSelected =
          currentSelection.includes(optionId);

        return {
          ...currentAnswers,
          [question.id]: isSelected
            ? currentSelection.filter(
                (id) => id !== optionId,
              )
            : [
                ...currentSelection,
                optionId,
              ],
        };
      }

      return {
        ...currentAnswers,
        [question.id]: [optionId],
      };
    });
  };

  const handleSubmit = async () => {
    if (!quiz || !attempt) {
      return;
    }

    const unansweredQuestions =
      quiz.questions.filter(
        (question) =>
          (answers[question.id]?.length ??
            0) === 0,
      );

    if (unansweredQuestions.length > 0) {
      setFormError(
        "Debés responder todas las preguntas antes de finalizar la evaluación.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError("");

      const submission =
        await submitQuizAttempt(
          attempt.id,
          quiz.questions.map(
            (question) => ({
              questionId: question.id,
              optionIds:
                answers[question.id] ?? [],
            }),
          ),
        );

      setSubmittedAttempt(
        submission.attempt,
      );

      setResult(submission.result);
      setAttempt(submission.attempt);
    } catch (submitError) {
      setFormError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo finalizar la evaluación",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <p className="text-sm text-slate-500">
          Cargando evaluación...
        </p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
          <p className="text-lg font-semibold text-white">
            No pudimos abrir la evaluación
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error ||
              "La evaluación solicitada no está disponible."}
          </p>

          {quizId && !getAccessToken() ? (
            <Link
              to="/login"
              className="mt-6 inline-flex rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Iniciar sesión
            </Link>
          ) : (
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <ArrowLeftIcon />
              Volver al inicio
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (result && submittedAttempt) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-950/95">
          <div className="mx-auto flex h-20 max-w-5xl items-center px-5 lg:px-8">
            <Link
              to={`/modules/${quiz.module.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              <ArrowLeftIcon />
              Volver al módulo
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          <div
            className={`rounded-2xl border p-8 ${
              result.passed
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-amber-500/20 bg-amber-500/5"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                result.passed
                  ? "text-emerald-300"
                  : "text-amber-300"
              }`}
            >
              Resultado de la evaluación
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-white">
              {result.passed
                ? "Evaluación aprobada"
                : "Evaluación no aprobada"}
            </h1>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Puntaje
                </p>

                <p className="mt-2 text-3xl font-semibold text-white">
                  {result.score}%
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Respuestas correctas
                </p>

                <p className="mt-2 text-3xl font-semibold text-white">
                  {result.correctAnswers}/
                  {result.totalQuestions}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Puntaje mínimo
                </p>

                <p className="mt-2 text-3xl font-semibold text-white">
                  {result.passingScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-white">
              Revisión de respuestas
            </h2>

            <div className="mt-6 space-y-5">
              {submittedAttempt.answers.map(
                (answer, index) => (
                  <article
                    key={answer.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Pregunta {index + 1}
                      </p>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                          answer.isCorrect
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-red-500/10 text-red-300"
                        }`}
                      >
                        {answer.isCorrect && (
                          <CheckIcon />
                        )}

                        {answer.isCorrect
                          ? "Correcta"
                          : "Incorrecta"}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {answer.question.text}
                    </h3>

                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Tu respuesta
                      </p>

                      <div className="mt-2 space-y-2">
                        {answer.selectedOptions.map(
                          (selectedOption) => (
                            <div
                              key={
                                selectedOption.optionId
                              }
                              className="rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300"
                            >
                              {
                                selectedOption
                                  .option.text
                              }
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {answer.question
                      .explanation && (
                      <div className="mt-5 rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                          Explicación
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {
                            answer.question
                              .explanation
                          }
                        </p>
                      </div>
                    )}
                  </article>
                ),
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex h-20 max-w-5xl items-center px-5 lg:px-8">
          <Link
            to={`/modules/${quiz.module.id}`}
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
            <div className="flex items-center gap-3 text-violet-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                <QuizIcon />
              </div>

              <p className="text-sm font-medium">
                {quiz.module.title}
              </p>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {quiz.title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
              {quiz.description ??
                "Evaluación del módulo."}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <p>
                <span className="font-semibold text-white">
                  {quiz.questions.length}
                </span>{" "}
                {quiz.questions.length === 1
                  ? "pregunta"
                  : "preguntas"}
              </p>

              <p>
                Puntaje mínimo:{" "}
                <span className="font-semibold text-white">
                  {quiz.passingScore}%
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
          {!attempt ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
              <p className="text-sm font-medium text-violet-300">
                Antes de comenzar
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Preparado para la evaluación
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Una vez iniciado el intento,
                respondé todas las preguntas y
                enviá la evaluación para obtener
                tu resultado.
              </p>

              {formError && (
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {formError}
                </div>
              )}

              <button
                type="button"
                onClick={handleStartAttempt}
                disabled={isStarting}
                className="mt-7 rounded-lg bg-violet-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isStarting
                  ? "Iniciando..."
                  : "Iniciar evaluación"}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-violet-300">
                    Intento en curso
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {answeredQuestions} de{" "}
                    {quiz.questions.length}{" "}
                    respondidas
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {quiz.questions.map(
                  (question, index) => {
                    const selectedOptions =
                      answers[
                        question.id
                      ] ?? [];

                    return (
                      <article
                        key={question.id}
                        className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                            Pregunta {index + 1}
                          </p>

                          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400">
                            {
                              questionTypeLabels[
                                question.type
                              ]
                            }
                          </span>
                        </div>

                        <h2 className="mt-4 text-xl font-semibold leading-8 text-white">
                          {question.text}
                        </h2>

                        <div className="mt-6 space-y-3">
                          {question.options.map(
                            (option) => {
                              const isSelected =
                                selectedOptions.includes(
                                  option.id,
                                );

                              const inputType =
                                question.type ===
                                "MULTIPLE_CHOICE"
                                  ? "checkbox"
                                  : "radio";

                              return (
                                <label
                                  key={option.id}
                                  className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                                    isSelected
                                      ? "border-violet-400/50 bg-violet-500/10"
                                      : "border-slate-800 bg-slate-950/50 hover:border-slate-700"
                                  }`}
                                >
                                  <input
                                    type={
                                      inputType
                                    }
                                    name={
                                      question.id
                                    }
                                    checked={
                                      isSelected
                                    }
                                    onChange={() =>
                                      handleOptionChange(
                                        question,
                                        option.id,
                                      )
                                    }
                                    className="mt-1 h-4 w-4 accent-violet-400"
                                  />

                                  <span className="text-sm leading-6 text-slate-300">
                                    {
                                      option.text
                                    }
                                  </span>
                                </label>
                              );
                            },
                          )}
                        </div>
                      </article>
                    );
                  },
                )}
              </div>

              {formError && (
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {formError}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="rounded-lg bg-violet-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Enviando..."
                    : "Finalizar evaluación"}
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default QuizPage;