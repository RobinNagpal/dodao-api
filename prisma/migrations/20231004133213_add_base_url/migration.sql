-- AlterTable
ALTER TABLE "website_scraping_infos" ADD COLUMN     "base_url" VARCHAR(1024) NOT NULL DEFAULT 'https://',
ALTER COLUMN "host" DROP NOT NULL;
