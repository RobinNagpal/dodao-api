/*
  Warnings:

  - You are about to drop the column `archived` on the `project_byte_collections` table. All the data in the column will be lost.
  - You are about to drop the column `archived` on the `project_bytes` table. All the data in the column will be lost.
  - You are about to drop the column `archived` on the `project_short_videos` table. All the data in the column will be lost.
  - You are about to drop the column `archived` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `projects` table. All the data in the column will be lost.
  - Added the required column `seo_meta` to the `project_byte_collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seo_meta` to the `project_bytes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seo_meta` to the `project_short_videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seo_meta` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_byte_collections" DROP COLUMN "archived",
ADD COLUMN     "seo_meta" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "project_bytes" DROP COLUMN "archived",
ADD COLUMN     "seo_meta" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "project_short_videos" DROP COLUMN "archived",
ADD COLUMN     "seo_meta" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "archived",
DROP COLUMN "excerpt",
ADD COLUMN     "seo_meta" JSONB NOT NULL;
