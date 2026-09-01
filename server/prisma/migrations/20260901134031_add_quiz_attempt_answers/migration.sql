-- CreateTable
CREATE TABLE "quiz_attempt_answers" (
    "id" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_attempt_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempt_answer_options" (
    "answerId" UUID NOT NULL,
    "optionId" UUID NOT NULL,

    CONSTRAINT "quiz_attempt_answer_options_pkey" PRIMARY KEY ("answerId","optionId")
);

-- CreateIndex
CREATE INDEX "quiz_attempt_answers_attemptId_idx" ON "quiz_attempt_answers"("attemptId");

-- CreateIndex
CREATE INDEX "quiz_attempt_answers_questionId_idx" ON "quiz_attempt_answers"("questionId");

-- CreateIndex
CREATE INDEX "quiz_attempt_answers_isCorrect_idx" ON "quiz_attempt_answers"("isCorrect");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_attempt_answers_attemptId_questionId_key" ON "quiz_attempt_answers"("attemptId", "questionId");

-- CreateIndex
CREATE INDEX "quiz_attempt_answer_options_optionId_idx" ON "quiz_attempt_answer_options"("optionId");

-- AddForeignKey
ALTER TABLE "quiz_attempt_answers" ADD CONSTRAINT "quiz_attempt_answers_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "quiz_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_answers" ADD CONSTRAINT "quiz_attempt_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_answer_options" ADD CONSTRAINT "quiz_attempt_answer_options_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "quiz_attempt_answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempt_answer_options" ADD CONSTRAINT "quiz_attempt_answer_options_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "question_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
