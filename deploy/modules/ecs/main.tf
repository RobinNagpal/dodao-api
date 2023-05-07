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
variable "redis_endpoint" {}


locals {
  family = "${var.project_name}-${var.environment}-app"
}

resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-${var.environment}"
}

resource "aws_ecs_task_definition" "app" {
  family                = local.family
  cpu                      = "512" # 0.5 vCPU
  memory                   = "1024" # 1 GB of RAM
  container_definitions = jsonencode([{
    name  = "${var.project_name}-${var.environment}"
    image = var.ecr_repository_url

    resources = {
      cpu    = 512 # 0.5 vCPU
      memory = 1024 # 1 GB of RAM
    }

    environment = [
      { name = "JWT_PRIVATE_KEY", value = var.jwt_private_key },
      { name = "ALL_GUIDE_SUBMISSIONS_WEBHOOK", value = var.all_guide_submissions_webhook },
      { name = "SERVER_ERRORS_WEBHOOK", value = var.server_errors_webhook },
      { name = "PUBLIC_AWS_S3_BUCKET", value = var.public_aws_s3_bucket },
      { name = "DISCORD_CLIENT_ID", value = var.discord_client_id },
      { name = "DISCORD_CLIENT_SECRET", value = var.discord_client_secret },
      { name = "DISCORD_BOT_TOKEN", value = var.discord_bot_token },
      { name = "ALL_GUIDES_GIT_REPOSITORY", value = var.all_guides_git_repository },
      { name  = "REDIS_ENDPOINT" value = var.redis_endpoint }
    ]

    portMappings = [
      {
        containerPort = 8000
        hostPort      = 0
      }
    ]
  }])

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  execution_role_arn        = aws_iam_role.execution.arn
  task_role_arn            = aws_iam_role.task.arn
}

resource "aws_ecs_service" "main" {
  name            = "${var.project_name}-${var.environment}-app"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.environment == "prod" ? 2 : 1
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = var.ecs_target_group_arn
    container_name   = "${var.project_name}-${var.environment}"
    container_port   = 8000
  }

  network_configuration {
    subnets = var.subnets
    assign_public_ip = true
    security_groups = var.security_groups
  }


  depends_on = [aws_ecs_task_definition.app]
}

resource "aws_iam_role" "execution" {
  name = "${var.project_name}-${var.environment}-execution"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role" "task" {
  name = "${var.project_name}-${var.environment}-task"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# Attach necessary policies to the task role.
# Modify the policies based on your application's requirements.
resource "aws_iam_role_policy_attachment" "task" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  role       = aws_iam_role.task.name
}


variable "subnets" {
  type = list(string)
}

variable "security_groups" {
  type = list(string)
}

