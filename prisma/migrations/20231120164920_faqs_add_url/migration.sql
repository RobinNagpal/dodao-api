/*
  Warnings:

  - Added the required column `url` to the `chatbot_faqs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatbot_faqs" ADD COLUMN     "url" VARCHAR(1024) NOT NULL default '';
