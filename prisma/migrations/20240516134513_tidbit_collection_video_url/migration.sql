-- AlterTable
ALTER TABLE "byte_collections" ADD COLUMN     "aspect_ratio" VARCHAR(255),
ADD COLUMN     "video_url" VARCHAR(1024);

-- AlterTable
ALTER TABLE "bytes" ADD COLUMN     "aspect_ratio" VARCHAR(255);
