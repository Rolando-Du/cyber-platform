-- AlterTable
ALTER TABLE "quiz_attempts" ADD COLUMN     "quizVersion" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "quiz_attempts_quizVersion_idx" ON "quiz_attempts"("quizVersion");
