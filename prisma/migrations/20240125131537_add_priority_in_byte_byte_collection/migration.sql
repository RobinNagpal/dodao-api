-- AlterTable
ALTER TABLE "byte_collections" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 50;

-- AlterTable
ALTER TABLE "bytes" ALTER COLUMN "priority" SET DEFAULT 50;
