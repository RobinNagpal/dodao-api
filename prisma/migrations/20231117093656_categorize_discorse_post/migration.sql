-- AlterTable
ALTER TABLE "discourse_posts" ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "discussed" BOOLEAN,
ADD COLUMN     "enacted" BOOLEAN,
ADD COLUMN     "sub_categories" TEXT[] DEFAULT ARRAY[]::TEXT[];
