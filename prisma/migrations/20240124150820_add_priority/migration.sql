-- AlterTable
ALTER TABLE "project_byte_collections" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 50;

-- AlterTable
ALTER TABLE "project_bytes" ALTER COLUMN "priority" SET DEFAULT 50;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 50;
