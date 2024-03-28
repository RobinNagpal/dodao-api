-- CreateTable
CREATE TABLE "byte_ratings" (
    "rating_uuid" VARCHAR(255) NOT NULL,
    "byte_id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(255),
    "ip_address" VARCHAR(64),
    "skip_rating" BOOLEAN,
    "rating" INTEGER,
    "positive_feedback" JSON,
    "negative_feedback" JSON,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(1024),

    CONSTRAINT "byte_ratings_pkey" PRIMARY KEY ("rating_uuid")
);
