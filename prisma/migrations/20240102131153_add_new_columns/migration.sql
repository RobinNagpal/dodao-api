-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "admin_usernames_v1" JSON[] DEFAULT ARRAY[]::json[];

-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "admin_usernames_v1" JSON[] DEFAULT ARRAY[]::json[];
