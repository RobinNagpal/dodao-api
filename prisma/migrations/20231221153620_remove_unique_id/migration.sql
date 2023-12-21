/*
  Warnings:

  - The primary key for the `bytes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `unique_id` on the `bytes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `bytes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "bytes_unique_id_key";

-- AlterTable
ALTER TABLE "bytes" DROP CONSTRAINT "bytes_pkey",
DROP COLUMN "unique_id",
ADD CONSTRAINT "bytes_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "bytes_id_key" ON "bytes"("id");
