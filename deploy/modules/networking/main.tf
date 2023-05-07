variable "project_name" {}
variable "environment" {}

locals {
  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags       = merge(local.tags, { Name = "${var.project_name}-${var.environment}-vpc" })
}

resource "aws_subnet" "public_a" {
  cidr_block = "10.0.1.0/24"
  vpc_id     = aws_vpc.main.id
  tags       = merge(local.tags, { Name = "${var.project_name}-${var.environment}-subnet-public-a" })
}

resource "aws_subnet" "public_b" {
  cidr_block = "10.0.2.0/24"
  vpc_id     = aws_vpc.main.id
  tags       = merge(local.tags, { Name = "${var.project_name}-${var.environment}-subnet-public-b" })
}

resource "aws_security_group" "ecs_tasks" {
  name        = "${var.project_name}-${var.environment}-ecs-tasks"
  description = "Security group for ECS tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
