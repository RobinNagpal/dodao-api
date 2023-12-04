-- AlterTable
ALTER TABLE "discourse_posts" ADD COLUMN     "ai_summary" TEXT,
ADD COLUMN     "ai_summary_date" TIMESTAMP(3);
