/*
  Warnings:

  - You are about to drop the column `publish_status` on the `bytes` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `bytes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "bytes_id_publish_status_key";

-- AlterTable
ALTER TABLE "bytes" DROP COLUMN "publish_status",
DROP COLUMN "visibility";
