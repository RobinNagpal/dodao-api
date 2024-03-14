/*
  Warnings:

  - Added the required column `space_id` to the `byte_collections_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "byte_collections_category" ADD COLUMN     "space_id" VARCHAR(66) NOT NULL;

-- AddForeignKey
ALTER TABLE "byte_collections_category" ADD CONSTRAINT "byte_collections_category_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
