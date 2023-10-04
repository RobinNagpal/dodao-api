-- CreateTable
CREATE TABLE "academy_tasks" (
    "uuid" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(128) NOT NULL,
    "prerequisite_courses" JSONB NOT NULL,
    "prerequisite_guides" JSONB NOT NULL,
    "space_id" VARCHAR(64) NOT NULL,
    "status" VARCHAR(64) NOT NULL,
    "details" TEXT NOT NULL,
    "title" VARCHAR(66) NOT NULL,
    "items" JSONB NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(128) NOT NULL,
    "excerpt" VARCHAR(256) NOT NULL,

    CONSTRAINT "academy_tasks_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "byte_submissions" (
    "id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(64) NOT NULL,
    "byte_id" VARCHAR(64) NOT NULL,
    "space_id" VARCHAR(64) NOT NULL,
    "ip_address" VARCHAR(64),

    CONSTRAINT "byte_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "git_course_submissions" (
    "uuid" VARCHAR(66) NOT NULL,
    "course_key" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(64) NOT NULL,
    "is_latest_submission" BOOLEAN NOT NULL,
    "questions_attempted" INTEGER,
    "questions_correct" INTEGER,
    "questions_incorrect" INTEGER,
    "questions_skipped" INTEGER,
    "space_id" VARCHAR(64) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(64) NOT NULL DEFAULT 'InProgress',
    "galaxy_credentials_updated" BOOLEAN,

    CONSTRAINT "git_course_submissions_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "git_course_topic_submissions" (
    "uuid" VARCHAR(66) NOT NULL,
    "course_key" VARCHAR(128) NOT NULL,
    "course_submission_uuid" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(64) NOT NULL,
    "is_latest_submission" BOOLEAN NOT NULL,
    "questions_attempted" INTEGER,
    "questions_correct" INTEGER,
    "questions_incorrect" INTEGER,
    "questions_skipped" INTEGER,
    "submission" JSON NOT NULL,
    "space_id" VARCHAR(64) NOT NULL,
    "topic_key" VARCHAR(128) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(64) NOT NULL DEFAULT 'InProgress',
    "correct_answers" JSONB,

    CONSTRAINT "git_course_topic_submissions_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "guides" (
    "id" VARCHAR(66) NOT NULL,
    "content" TEXT NOT NULL,
    "previous_id" VARCHAR(66),
    "uuid" VARCHAR(255) NOT NULL,
    "authors" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "space_id" VARCHAR(64) NOT NULL,
    "guide_name" VARCHAR(255) NOT NULL,
    "guide_source" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "version" INTEGER NOT NULL,
    "thumbnail" VARCHAR(255),
    "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "discord_webhook" VARCHAR(1024),
    "guide_type" VARCHAR(128) NOT NULL DEFAULT 'onboarding',
    "publish_status" VARCHAR(128) NOT NULL DEFAULT 'Live',
    "social_share_image" VARCHAR(2048),
    "discord_role_ids" JSONB NOT NULL,
    "discord_role_passing_count" INTEGER,
    "show_incorrect_on_completion" BOOLEAN NOT NULL DEFAULT true,
    "post_submission_step_content" TEXT NOT NULL,

    CONSTRAINT "guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spaces" (
    "id" VARCHAR(64) NOT NULL,
    "settings" JSON,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator" VARCHAR(64) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "avatar" VARCHAR(255),
    "admins" TEXT[],
    "admin_usernames" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "domains" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "skin" VARCHAR(128) NOT NULL DEFAULT 'dodao',
    "discord_invite" VARCHAR(1024),
    "telegram_invite" VARCHAR(1024),
    "invite_links" JSON,
    "auth_settings" JSON NOT NULL DEFAULT '{}',
    "guide_settings" JSON NOT NULL DEFAULT '{}',
    "social_settings" JSON NOT NULL DEFAULT '{}',
    "byte_settings" JSON NOT NULL DEFAULT '{}',
    "features" TEXT[],
    "botDomains" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bytes" (
    "unique_id" VARCHAR(255) NOT NULL,
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created" VARCHAR(255) NOT NULL,
    "visibility" VARCHAR(255) NOT NULL DEFAULT 'Public',
    "publish_status" VARCHAR(255) NOT NULL,
    "admins" TEXT[],
    "tags" TEXT[],
    "priority" INTEGER NOT NULL,
    "steps" JSONB[],
    "space_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "bytes_pkey" PRIMARY KEY ("unique_id")
);

-- CreateTable
CREATE TABLE "byte_social_shares" (
    "uuid" VARCHAR(255) NOT NULL,
    "byte_id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(255) NOT NULL,
    "linkedin_pdf_content" JSON,
    "linked_in_images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "linked_in_pdf" VARCHAR(1024),
    "twitter_image" VARCHAR(1024),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(256),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(256),

    CONSTRAINT "byte_social_shares_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "course_integrations" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(255) NOT NULL,
    "course_key" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(256),
    "discord_role_ids" JSON,
    "discord_role_passing_count" INTEGER,
    "discord_webhook" VARCHAR(1024),
    "project_galaxy_credential_id" VARCHAR(255),
    "project_galaxy_oat_mint_url" VARCHAR(255),
    "project_galaxy_oat_passing_count" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(256),
    "project_galaxy_oat_minted_content" TEXT,

    CONSTRAINT "course_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "git_courses" (
    "id" VARCHAR(255) NOT NULL,
    "course_key" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(256),
    "weight" INTEGER NOT NULL DEFAULT 20,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(256),
    "course_repo_url" VARCHAR(1024) NOT NULL,
    "publish_status" VARCHAR(128) NOT NULL DEFAULT 'Live',
    "course_admins" JSON NOT NULL,

    CONSTRAINT "git_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide_integrations" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(255) NOT NULL,
    "guide_uuid" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(256),
    "discord_role_ids" JSON,
    "discord_role_passing_count" INTEGER,
    "discord_webhook" VARCHAR(1024),
    "project_galaxy_credential_id" VARCHAR(255),
    "project_galaxy_oat_mint_url" VARCHAR(255),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(256),
    "project_galaxy_oat_passing_count" INTEGER,

    CONSTRAINT "guide_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide_steps" (
    "id" VARCHAR(66) NOT NULL,
    "uuid" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "step_name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "step_items" JSON NOT NULL,
    "step_order" INTEGER NOT NULL,
    "space_id" VARCHAR(64) NOT NULL,

    CONSTRAINT "guide_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide_submissions" (
    "id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(64) NOT NULL,
    "created_by_username" VARCHAR(128) NOT NULL,
    "guide_id" VARCHAR(64) NOT NULL,
    "guide_uuid" VARCHAR(255) NOT NULL,
    "result" JSON NOT NULL,
    "space_id" VARCHAR(64) NOT NULL,
    "steps" JSON NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "ip_address" VARCHAR(64),
    "correct_questions_count" INTEGER NOT NULL,

    CONSTRAINT "guide_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide_ratings" (
    "rating_uuid" VARCHAR(255) NOT NULL,
    "guide_uuid" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(255),
    "ip_address" VARCHAR(64),
    "skip_start_rating" BOOLEAN,
    "skip_end_rating" BOOLEAN,
    "start_rating" INTEGER,
    "end_rating" INTEGER,
    "positive_feedback" JSON,
    "negative_feedback" JSON,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "username" VARCHAR(1024),

    CONSTRAINT "guide_ratings_pkey" PRIMARY KEY ("rating_uuid")
);

-- CreateTable
CREATE TABLE "guides_guide_steps" (
    "id" VARCHAR(255) NOT NULL,
    "guide_step_id" VARCHAR(66) NOT NULL,
    "guide_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "space_id" VARCHAR(64) NOT NULL,

    CONSTRAINT "guides_guide_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_discords" (
    "id" VARCHAR(255) NOT NULL,
    "access_token" VARCHAR(255) NOT NULL,
    "access_token_expiry" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refresh_token" VARCHAR(255) NOT NULL,
    "selected_guide_id" VARCHAR(255),
    "space_id" VARCHAR(66) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "space_discords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_integrations" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(256),
    "discord_guild_id" VARCHAR(255),
    "project_galaxy_token" VARCHAR(256),
    "project_galaxy_token_last_four" VARCHAR(64),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(256),
    "gnosis_safe_wallets" JSON,
    "git_guide_repositories" JSON[],
    "academy_repository" VARCHAR(2048),
    "loadersInfo" JSON,

    CONSTRAINT "space_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discourse_index_runs" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "run_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "discourse_index_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discourse_posts" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "title" VARCHAR(1024) NOT NULL,
    "url" VARCHAR(1024) NOT NULL,
    "full_content" TEXT,
    "author" VARCHAR(255),
    "date_published" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "indexed_at" TIMESTAMP(3),
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "discourse_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discourse_post_comments" (
    "id" VARCHAR(255) NOT NULL,
    "comment_post_id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "content" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "date_published" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "indexed_at" TIMESTAMP(3),
    "post_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "discourse_post_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discord_servers" (
    "id" VARCHAR(255) NOT NULL,
    "discord_server_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon_url" VARCHAR(1024),

    CONSTRAINT "discord_servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discord_channels" (
    "id" VARCHAR(255) NOT NULL,
    "discord_channel_id" VARCHAR(255) NOT NULL,
    "server_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "should_index" BOOLEAN NOT NULL,

    CONSTRAINT "discord_channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discord_messages" (
    "id" VARCHAR(255) NOT NULL,
    "discord_message_id" VARCHAR(255) NOT NULL,
    "channel_id" VARCHAR(255) NOT NULL,
    "server_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "message_date" TIMESTAMP(3) NOT NULL,
    "author_username" VARCHAR(255) NOT NULL,

    CONSTRAINT "discord_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_scraping_infos" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "host" VARCHAR(1024) NOT NULL,
    "scraping_start_url" VARCHAR(1024) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ignore_hash_in_url" BOOLEAN NOT NULL DEFAULT true,
    "ignore_query_params" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "website_scraping_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_scraping_runs" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "website_scraping_info_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "scraping_run_date" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "site_scraping_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scraped_url_infos" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "website_scraping_info_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "url" VARCHAR(1024) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "scraped_url_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_indexing_infos" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "scraping_start_url" VARCHAR(1024) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "text" TEXT,

    CONSTRAINT "article_indexing_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "byte_collections" (
    "id" VARCHAR(255) NOT NULL,
    "space_id" VARCHAR(66) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "byte_ids" VARCHAR(255)[],
    "status" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "byte_collections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bytes_unique_id_key" ON "bytes"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "bytes_id_publish_status_key" ON "bytes"("id", "publish_status");

-- CreateIndex
CREATE UNIQUE INDEX "byte_social_shares_byte_id_key" ON "byte_social_shares"("byte_id");

-- CreateIndex
CREATE UNIQUE INDEX "byte_social_shares_byte_id_space_id_key" ON "byte_social_shares"("byte_id", "space_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_integrations_space_id_course_key_key" ON "course_integrations"("space_id", "course_key");

-- CreateIndex
CREATE UNIQUE INDEX "git_courses_space_id_course_key_key" ON "git_courses"("space_id", "course_key");

-- CreateIndex
CREATE UNIQUE INDEX "guide_integrations_space_id_guide_uuid_key" ON "guide_integrations"("space_id", "guide_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "space_integrations_space_id_key" ON "space_integrations"("space_id");

-- CreateIndex
CREATE UNIQUE INDEX "discourse_posts_url_key" ON "discourse_posts"("url");

-- CreateIndex
CREATE UNIQUE INDEX "discourse_post_comments_comment_post_id_post_id_key" ON "discourse_post_comments"("comment_post_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "discord_servers_discord_server_id_key" ON "discord_servers"("discord_server_id");

-- CreateIndex
CREATE UNIQUE INDEX "discord_channels_discord_channel_id_key" ON "discord_channels"("discord_channel_id");

-- CreateIndex
CREATE UNIQUE INDEX "discord_messages_discord_message_id_key" ON "discord_messages"("discord_message_id");

-- CreateIndex
CREATE UNIQUE INDEX "website_scraping_infos_host_scraping_start_url_key" ON "website_scraping_infos"("host", "scraping_start_url");

-- CreateIndex
CREATE UNIQUE INDEX "scraped_url_infos_url_website_scraping_info_id_key" ON "scraped_url_infos"("url", "website_scraping_info_id");

-- CreateIndex
CREATE UNIQUE INDEX "article_indexing_infos_space_id_scraping_start_url_key" ON "article_indexing_infos"("space_id", "scraping_start_url");

-- AddForeignKey
ALTER TABLE "git_course_topic_submissions" ADD CONSTRAINT "git_course_topic_submissions_course_submission_uuid_fkey" FOREIGN KEY ("course_submission_uuid") REFERENCES "git_course_submissions"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bytes" ADD CONSTRAINT "bytes_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_integrations" ADD CONSTRAINT "course_integrations_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "git_courses" ADD CONSTRAINT "git_courses_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_integrations" ADD CONSTRAINT "guide_integrations_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_steps" ADD CONSTRAINT "guide_steps_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guide_submissions" ADD CONSTRAINT "guide_submissions_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guides_guide_steps" ADD CONSTRAINT "guides_guide_steps_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_discords" ADD CONSTRAINT "space_discords_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_integrations" ADD CONSTRAINT "space_integrations_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discourse_post_comments" ADD CONSTRAINT "discourse_post_comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "discourse_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discord_channels" ADD CONSTRAINT "discord_channels_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "discord_servers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discord_messages" ADD CONSTRAINT "discord_messages_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "discord_channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discord_messages" ADD CONSTRAINT "discord_messages_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "discord_servers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_scraping_runs" ADD CONSTRAINT "site_scraping_runs_website_scraping_info_id_fkey" FOREIGN KEY ("website_scraping_info_id") REFERENCES "website_scraping_infos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scraped_url_infos" ADD CONSTRAINT "scraped_url_infos_website_scraping_info_id_fkey" FOREIGN KEY ("website_scraping_info_id") REFERENCES "website_scraping_infos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

