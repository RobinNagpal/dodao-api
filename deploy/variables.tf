variable "jwt_private_key" {}
variable "all_guide_submissions_webhook" {}
variable "server_errors_webhook" {}
variable "public_aws_s3_bucket" {}
variable "discord_client_id" {}
variable "discord_client_secret" {}
variable "discord_bot_token" {}
variable "all_guides_git_repository" {}
variable "openai_api_key" {}

variable "project_name" {
  description = "The project name"
  type        = string
  default = "v2-api"
}

variable "environment" {
  description = "The environment (e.g., prod, staging)"
  type        = string
  default = "prod"
}


variable "enable_dns_hostnames" {
  default = true
}

variable "enable_dns_resolution" {
  default = true
}


variable "rds_username" {}
variable "rds_password" {}
variable "rds_init_db" {}
variable "github_token" {}
variable "dodao_auth_secret" {}
variable "dodao_auth_header_name" {}
