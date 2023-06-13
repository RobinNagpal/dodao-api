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

data "aws_ecr_repository" "v2_api" {
  name = "v2-api"
}

module "redis" {
  source = "./modules/redis"

  project_name      = local.project_name
  environment       = local.environment
  vpc_id            = module.networking.vpc_id
  subnet_ids        = module.networking.subnets
  security_group_id = module.networking.security_group
}

data "aws_route53_zone" "dodao" {
  name = "dodao.io."
}

resource "aws_route53_record" "alias" {
  name    = "v2-api.dodao.io"
  type    = "A"
  zone_id = data.aws_route53_zone.dodao.zone_id

  alias {
    name                   = module.load_balancer.alb_dns_name
    zone_id                = module.load_balancer.alb_zone_id
    evaluate_target_health = false
  }
}

# Add this block to create an SSL certificate (replace "example.com" with your domain)
resource "aws_acm_certificate" "cert" {
  domain_name       = "v2-api.dodao.io"
  validation_method = "DNS"
  tags              = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = aws_acm_certificate.cert.domain_validation_options.*.resource_record_name
}

module "load_balancer" {
  source             = "./modules/load_balancer"
  project_name       = var.project_name
  environment        = var.environment
  subnet_ids         = module.networking.subnets
  security_group_ids = [module.networking.security_group_id]
  vpc_id             = module.networking.vpc_id
  certificate_arn    = aws_acm_certificate.cert.arn

}


module "efs" {
  source             = "./modules/efs"
  project_name       = var.project_name
  environment        = var.environment
  vpc_id             = module.networking.vpc_id
  subnet_ids         = module.networking.subnets
  security_group_ids = [module.networking.security_group_id]

  enable_dns_hostnames  = var.enable_dns_hostnames
  enable_dns_resolution = var.enable_dns_resolution

  allowed_cidr_blocks   = module.networking.subnet_cidr_blocks
  ecs_security_group_id = module.networking.security_group_id
}

resource "aws_efs_access_point" "efs_access_point" {
  file_system_id = module.efs.efs_id

  posix_user {
    uid = 1000
    gid = 1000
  }

  root_directory {
    path = "/your_mount_path"
    creation_info {
      owner_uid   = 1000
      owner_gid   = 1000
      permissions = "755"
    }
  }
}

module "rds_postgres" {
  project_name = local.project_name
  environment  = local.environment
  source       = "./modules/rds_postgres"

  db_name  = var.rds_init_db
  username = var.rds_username
  password = var.rds_password

  subnet_ids        = module.networking.subnets
  security_group_id = module.networking.security_group
}


module "ecs" {
  source                        = "./modules/ecs"
  project_name                  = local.project_name
  environment                   = local.environment
  ecr_repository_url            = data.aws_ecr_repository.v2_api.repository_url
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
  ecs_target_group_arn          = module.load_balancer.ecs_target_group_arn
  efs_file_system_id            = module.efs.efs_id
  efs_access_point_id           = aws_efs_access_point.efs_access_point.id
  database_host                 = module.rds_postgres.postgres_rds_endpoint
  database_username             = var.rds_username
  database_password             = var.rds_password
  github_token                  = var.github_token
  dodao_auth_secret             = var.dodao_auth_secret
  dodao_auth_header_name        = var.dodao_auth_header_name
  openai_api_key                = var.openai_api_key
}

resource "aws_ecr_repository" "main" {
  name = "${local.project_name}-${local.environment}"
}
