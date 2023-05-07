provider "aws" {
  region = "us-east-1" # Update the region
}

locals {
  project_name = "v2-api"
  environment  = terraform.workspace == "default" ? "staging" : terraform.workspace
}

module "networking" {
  source = "./modules/networking"

  project_name = local.project_name
  environment  = local.environment
}

resource "aws_ecr_repository" "v2_api" {
  name = "my-example-repository"
}

module "redis" {
  source = "./modules/redis"

  project_name = local.project_name
  environment  = local.environment
  vpc_id       = module.networking.vpc_id
  subnet_ids   = module.networking.subnets
}


module "ecs" {
  source = "./modules/ecs"

  project_name                  = local.project_name
  environment                   = local.environment
  ecr_repository_url            = aws_ecr_repository.v2_api.repository_url
  jwt_private_key               = var.jwt_private_key
  all_guide_submissions_webhook = var.all_guide_submissions_webhook
  server_errors_webhook         = var.server_errors_webhook
  public_aws_s3_bucket          = var.public_aws_s3_bucket
  discord_client_id             = var.discord_client_id
  discord_client_secret         = var.discord_client_secret
  discord_bot_token             = var.discord_bot_token
  all_guides_git_repository     = var.all_guides_git_repository
  subnets                       = module.networking.subnets
  security_groups               = [module.networking.security_group]
  redis_endpoint                = module.redis.redis_endpoint

}

resource "aws_ecr_repository" "main" {
  name = "${local.project_name}-${local.environment}"
}
