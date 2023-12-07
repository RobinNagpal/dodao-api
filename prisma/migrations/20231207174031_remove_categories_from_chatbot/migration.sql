/*
  Warnings:

  - You are about to drop the column `categories` on the `chatbot_faqs` table. All the data in the column will be lost.
  - You are about to drop the column `subCategories` on the `chatbot_faqs` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `chatbot_user_questions` table. All the data in the column will be lost.
  - You are about to drop the column `subCategories` on the `chatbot_user_questions` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `discourse_posts` table. All the data in the column will be lost.
  - You are about to drop the column `sub_categories` on the `discourse_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chatbot_faqs" DROP COLUMN "categories",
DROP COLUMN "subCategories";

-- AlterTable
ALTER TABLE "chatbot_user_questions" DROP COLUMN "categories",
DROP COLUMN "subCategories";

-- AlterTable
ALTER TABLE "discourse_posts" DROP COLUMN "categories",
DROP COLUMN "sub_categories";
