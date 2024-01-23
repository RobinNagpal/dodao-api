-- AlterTable
ALTER TABLE "project_byte_collections" ADD COLUMN     "seo_meta" JSONB;

-- AlterTable
ALTER TABLE "project_bytes" ADD COLUMN     "seo_meta" JSONB;

-- AlterTable
ALTER TABLE "project_short_videos" ADD COLUMN     "seo_meta" JSONB;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "seo_meta" JSONB;
