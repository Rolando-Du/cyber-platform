-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "quizzes_version_idx" ON "quizzes"("version");
