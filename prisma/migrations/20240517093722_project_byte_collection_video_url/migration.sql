-- AlterTable
ALTER TABLE "project_byte_collections" ADD COLUMN     "video_aspect_ratio" VARCHAR(255),
ADD COLUMN     "video_url" VARCHAR(1024);

-- AlterTable
ALTER TABLE "project_bytes" ADD COLUMN     "video_aspect_ratio" VARCHAR(255);
