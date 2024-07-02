/*
  Warnings:

  - You are about to drop the column `video_aspect_ratio` on the `project_byte_collections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "byte_collections_category" ADD COLUMN     "archive" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "project_byte_collections" DROP COLUMN "video_aspect_ratio";
