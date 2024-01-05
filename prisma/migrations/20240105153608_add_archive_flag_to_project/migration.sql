-- AlterTable
ALTER TABLE "project_byte_collections" ADD COLUMN     "archive" BOOLEAN;

-- AlterTable
ALTER TABLE "project_bytes" ADD COLUMN     "archive" BOOLEAN;

-- AlterTable
ALTER TABLE "project_short_videos" ADD COLUMN     "archive" BOOLEAN;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "archive" BOOLEAN;
