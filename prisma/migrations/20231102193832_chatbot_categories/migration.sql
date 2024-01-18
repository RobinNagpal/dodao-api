-- CreateTable
CREATE TABLE "ChatbotCategories" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "sub_categories" JSON[],
    "priority" INTEGER NOT NULL,

    CONSTRAINT "ChatbotCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotUserQuestion" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "categories" TEXT[],
    "subCategories" TEXT[],

    CONSTRAINT "ChatbotUserQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotFAQ" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "categories" TEXT[],
    "subCategories" TEXT[],
    "priority" INTEGER NOT NULL,

    CONSTRAINT "ChatbotFAQ_pkey" PRIMARY KEY ("id")
);
