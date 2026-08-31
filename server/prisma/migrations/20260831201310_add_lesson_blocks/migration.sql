-- CreateEnum
CREATE TYPE "LessonBlockType" AS ENUM ('TEXT', 'HEADING', 'IMAGE', 'VIDEO', 'CODE', 'CALLOUT', 'TABLE', 'DOWNLOAD');

-- CreateTable
CREATE TABLE "lesson_blocks" (
    "id" UUID NOT NULL,
    "lessonId" UUID NOT NULL,
    "type" "LessonBlockType" NOT NULL,
    "content" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lesson_blocks_lessonId_idx" ON "lesson_blocks"("lessonId");

-- CreateIndex
CREATE INDEX "lesson_blocks_type_idx" ON "lesson_blocks"("type");

-- CreateIndex
CREATE INDEX "lesson_blocks_order_idx" ON "lesson_blocks"("order");

-- AddForeignKey
ALTER TABLE "lesson_blocks" ADD CONSTRAINT "lesson_blocks_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
