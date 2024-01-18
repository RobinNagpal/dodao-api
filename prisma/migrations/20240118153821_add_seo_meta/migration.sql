/*
  Warnings:

  - Added the required column `seo_meta` to the `project_byte_collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seo_meta` to the `project_bytes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seo_meta` to the `project_short_videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seo_meta` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_byte_collections" ADD COLUMN     "seo_meta" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "project_bytes" ADD COLUMN     "seo_meta" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "project_short_videos" ADD COLUMN     "seo_meta" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "seo_meta" JSONB NOT NULL;
