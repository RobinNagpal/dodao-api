-- AlterTable
ALTER TABLE "bytes" ADD COLUMN     "byte_style" VARCHAR(255) DEFAULT 'CardAndCircleProgress';

-- AlterTable
ALTER TABLE "project_bytes" ADD COLUMN     "project_byte_style" VARCHAR(255) DEFAULT 'CardAndCircleProgress';
