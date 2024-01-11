/*
  Warnings:

  - You are about to drop the column `archive` on the `project_byte_collections` table. All the data in the column will be lost.
  - You are about to drop the column `archive` on the `project_bytes` table. All the data in the column will be lost.
  - You are about to drop the column `archive` on the `project_short_videos` table. All the data in the column will be lost.
  - You are about to drop the column `archive` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project_byte_collections" DROP COLUMN "archive",
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "project_bytes" DROP COLUMN "archive",
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "project_short_videos" DROP COLUMN "archive",
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "archive",
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;
