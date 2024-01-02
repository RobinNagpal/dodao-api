-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "admin_usernames_v1" JSONB[];

-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "admin_usernames_v1" JSONB[];
