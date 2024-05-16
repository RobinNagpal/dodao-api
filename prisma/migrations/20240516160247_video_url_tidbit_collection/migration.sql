-- AlterTable
ALTER TABLE "byte_collections" ADD COLUMN     "video_aspect_ratio" VARCHAR(255),
ADD COLUMN     "video_url" VARCHAR(1024);

-- AlterTable
ALTER TABLE "bytes" ADD COLUMN     "video_aspect_ratio" VARCHAR(255);
