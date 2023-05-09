variable "project_name" {}
variable "environment" {}
variable "ecr_repository_url" {}
variable "jwt_private_key" {}
variable "all_guide_submissions_webhook" {}
variable "server_errors_webhook" {}
variable "public_aws_s3_bucket" {}
variable "discord_client_id" {}
variable "discord_client_secret" {}
variable "discord_bot_token" {}
variable "all_guides_git_repository" {}
variable "database_host" {}
variable "database_username" {}
variable "database_password" {}
#variable "redis_endpoint" {}

variable "efs_file_system_id" {}
variable "ecs_target_group_arn" {}
variable "efs_access_point_id" {
  description = "The ID of the EFS access point"
  type        = string
}
