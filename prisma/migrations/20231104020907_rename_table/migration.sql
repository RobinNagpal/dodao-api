/*
  Warnings:

  - You are about to drop the `ChatbotCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ChatbotCategories";

-- CreateTable
CREATE TABLE "ChatbotCategory" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "sub_categories" JSON[],
    "priority" INTEGER NOT NULL,

    CONSTRAINT "ChatbotCategory_pkey" PRIMARY KEY ("id")
);
