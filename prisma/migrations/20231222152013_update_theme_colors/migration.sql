/*
  Warnings:

  - You are about to drop the column `themeColors` on the `spaces` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "spaces" DROP COLUMN "themeColors",
ADD COLUMN     "theme_colors" JSON;
