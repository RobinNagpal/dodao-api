/*
  Warnings:

  - You are about to drop the column `project_byte_style` on the `project_bytes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "project_bytes" DROP COLUMN "project_byte_style",
ADD COLUMN     "byte_style" VARCHAR(255) DEFAULT 'CardAndCircleProgress';
