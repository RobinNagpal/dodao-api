/*
  Warnings:

  - You are about to drop the `ShortVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ShortVideo";

-- CreateTable
CREATE TABLE "short_videos" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(64) NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 20,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "video_url" VARCHAR(1024) NOT NULL,
    "thumbnail" VARCHAR(1024) NOT NULL,

    CONSTRAINT "short_videos_pkey" PRIMARY KEY ("id")
);
