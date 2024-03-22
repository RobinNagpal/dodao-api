-- CreateTable
CREATE TABLE "byte_collections_category" (
    "id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "excerpt" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(1024),
    "byte_collection_ids" VARCHAR(255)[],
    "creator" VARCHAR(64) NOT NULL,

    CONSTRAINT "byte_collections_category_pkey" PRIMARY KEY ("id")
);
