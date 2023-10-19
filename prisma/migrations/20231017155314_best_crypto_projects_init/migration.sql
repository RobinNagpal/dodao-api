-- CreateTable
CREATE TABLE "projects" (
    "id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator" VARCHAR(64) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "details" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "logo" VARCHAR(255),
    "admins" TEXT[],
    "admin_usernames" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "website" VARCHAR(1024),
    "docs" VARCHAR(1024),
    "discord" VARCHAR(1024),
    "telegram" VARCHAR(1024),
    "github" VARCHAR(1024),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_bytes" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created" VARCHAR(255) NOT NULL,
    "publish_status" VARCHAR(255) NOT NULL,
    "admins" TEXT[],
    "tags" TEXT[],
    "priority" INTEGER NOT NULL,
    "steps" JSONB[],
    "space_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "project_bytes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_byte_collections" (
    "id" VARCHAR(255) NOT NULL,
    "projectId" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "byte_ids" VARCHAR(255)[],
    "status" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "project_byte_collections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_bytes_id_publish_status_key" ON "project_bytes"("id", "publish_status");

-- AddForeignKey
ALTER TABLE "project_bytes" ADD CONSTRAINT "project_bytes_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
