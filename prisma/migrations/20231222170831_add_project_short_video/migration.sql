-- CreateTable
CREATE TABLE "project_short_videos" (
    "id" VARCHAR(255) NOT NULL,
    "project_id" VARCHAR(255) NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 20,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "video_url" VARCHAR(1024) NOT NULL,
    "thumbnail" VARCHAR(1024) NOT NULL,

    CONSTRAINT "project_short_videos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_byte_collections" ADD CONSTRAINT "project_byte_collections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_short_videos" ADD CONSTRAINT "project_short_videos_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
