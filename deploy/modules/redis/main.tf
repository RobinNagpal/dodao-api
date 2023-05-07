variable "project_name" {}
variable "environment" {}
variable "vpc_id" {}
variable "subnet_ids" {}

locals {
  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_security_group" "redis" {
  name        = "${var.project_name}-${var.environment}-redis"
  description = "Security group for Redis"
  vpc_id      = var.vpc_id

  tags = local.tags
}

resource "aws_elasticache_subnet_group" "redis" {
  name       = "${var.project_name}-${var.environment}-redis"
  subnet_ids = var.subnet_ids

  tags = local.tags
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "${var.project_name}-${var.environment}-redis"
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  engine_version       = "6.x"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis.id]

  tags = local.tags
}
