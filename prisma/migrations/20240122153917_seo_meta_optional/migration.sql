-- AlterTable
ALTER TABLE "project_byte_collections" ALTER COLUMN "seo_meta" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project_bytes" ALTER COLUMN "seo_meta" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project_short_videos" ALTER COLUMN "seo_meta" DROP NOT NULL;

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "seo_meta" DROP NOT NULL;
