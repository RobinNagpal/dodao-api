/*
  Warnings:

  - You are about to drop the `ChatbotCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatbotFAQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatbotUserQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ChatbotCategory";

-- DropTable
DROP TABLE "ChatbotFAQ";

-- DropTable
DROP TABLE "ChatbotUserQuestion";

-- CreateTable
CREATE TABLE "chatbot_categories" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "sub_categories" JSON[],
    "priority" INTEGER NOT NULL,

    CONSTRAINT "chatbot_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatbot_user_questions" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "categories" TEXT[],
    "subCategories" TEXT[],

    CONSTRAINT "chatbot_user_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatbot_faqs" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "categories" TEXT[],
    "subCategories" TEXT[],
    "priority" INTEGER NOT NULL,

    CONSTRAINT "chatbot_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chatbot_categories_space_id_key_key" ON "chatbot_categories"("space_id", "key");
