/*
  Warnings:

  - You are about to drop the column `byte_ids` on the `byte_collections` table. All the data in the column will be lost.
  - You are about to drop the column `byteCollectionId` on the `bytes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bytes" DROP CONSTRAINT "bytes_byteCollectionId_fkey";

-- AlterTable
ALTER TABLE "byte_collections" DROP COLUMN "byte_ids";

-- AlterTable
ALTER TABLE "bytes" DROP COLUMN "byteCollectionId";

-- CreateTable
CREATE TABLE "byte_collections_items_mappings" (
    "id" VARCHAR(255) NOT NULL,
    "byte_collection_id" TEXT,
    "itemId" VARCHAR(255) NOT NULL,
    "itemType" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "byte_collections_items_mappings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "byte_collections_items_mappings" ADD CONSTRAINT "FK_ByteCollection" FOREIGN KEY ("byte_collection_id") REFERENCES "byte_collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "byte_collections_items_mappings" ADD CONSTRAINT "FK_Byte" FOREIGN KEY ("itemId") REFERENCES "bytes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "byte_collections_items_mappings" ADD CONSTRAINT "FK_ShortVideo" FOREIGN KEY ("itemId") REFERENCES "short_videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "byte_collections_items_mappings" ADD CONSTRAINT "FK_ClickableDemos" FOREIGN KEY ("itemId") REFERENCES "clickable_demos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
