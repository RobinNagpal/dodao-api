/*
  Warnings:

  - You are about to drop the column `order` on the `byte_collections` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `project_byte_collections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "byte_collections" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "project_byte_collections" DROP COLUMN "order";
