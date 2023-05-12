


locals {
  family = "${var.project_name}-${var.environment}-app"
}

resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-${var.environment}"
}

resource "aws_ecs_task_definition" "app" {
  family                = local.family
  cpu                   = "512" # 0.5 vCPU
  memory                = "1024" # 1 GB of RAM


  volume {
    name = "efs-volume"

    efs_volume_configuration {
      file_system_id          = var.efs_file_system_id
      transit_encryption      = "ENABLED"
      transit_encryption_port = 2049

      authorization_config {
        access_point_id = var.efs_access_point_id
      }
    }
  }

  container_definitions = jsonencode([
    {
      name  = "${var.project_name}-${var.environment}"
      image = var.ecr_repository_url

      resources = {
        cpu    = 512 # 0.5 vCPU
        memory = 1024 # 1 GB of RAM
      }

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "${var.project_name}-${var.environment}-app-logs"
          "awslogs-region"        = "us-east-1"
          "awslogs-stream-prefix" = "ecs"
        }
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
        { name = "DATABASE_URL", value = "postgresql://${var.database_username}:${var.database_password}@${var.database_host}/v2_api_${var.environment}_db?sslmode=verify-full" },
#        { name = "REDIS_ENDPOINT", value = var.redis_endpoint }
      ]

      healthCheck = {
        retries = 10
        command = [ "CMD-SHELL", "curl -f http://localhost:8000/health || exit 1" ]
        timeout: 10
        interval: 15
        startPeriod: 10
      }


      portMappings = [
        {
          containerPort = 8000
          hostPort      = 8000
        }
      ]

      mountPoints = [
        {
          sourceVolume  = "efs-volume"
          containerPath = "/opt/dodao/dodao-git-folder/prod"
        }
      ]
    }
  ])

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.execution.arn
  task_role_arn            = aws_iam_role.task.arn


}

resource "aws_ecs_service" "main" {
  name            = "${var.project_name}-${var.environment}-app"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.environment == "prod" ? 2 : 1
  launch_type     = "FARGATE"

  deployment_minimum_healthy_percent = 100
  load_balancer {
    target_group_arn = var.ecs_target_group_arn
    container_name   = "${var.project_name}-${var.environment}"
    container_port   = 8000
  }

  network_configuration {
    subnets          = var.subnets
    assign_public_ip = true
    security_groups  = var.security_groups
  }


  depends_on = [aws_ecs_task_definition.app]
}

resource "aws_iam_role" "execution" {
  name               = "${var.project_name}-${var.environment}-execution"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = {
          Service = ["ecs-tasks.amazonaws.com", "ssm.amazonaws.com"]
        }
      }
    ]
  })
}

resource "aws_iam_role" "task" {
  name               = "${var.project_name}-${var.environment}-task"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
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



resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  role       = aws_iam_role.execution.name
}

resource "aws_iam_policy" "ecr_permissions" {
  name        = "${var.project_name}-${var.environment}-ecr-policy"
  description = "Policy to allow ECS tasks to access ECR repositories"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecr_permissions" {
  policy_arn = aws_iam_policy.ecr_permissions.arn
  role       = aws_iam_role.execution.name
}


resource "aws_iam_policy" "ecs_task_execution_efs" {
  name = "ecs-task-execution-efs"
  path = "/"
  description = "ECS Task execution role policy to allow mounting and writing to EFS, and to describe mount targets and availability zones"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "elasticfilesystem:ClientMount",
          "elasticfilesystem:ClientWrite",
          "elasticfilesystem:DescribeAccessPoints",
          "elasticfilesystem:DescribeFileSystems",
          "elasticfilesystem:DescribeMountTargets",
          "ec2:DescribeAvailabilityZones"
        ]
        Effect = "Allow"
        Resource = "*"
      }
    ]
  })
}


resource "aws_iam_role_policy_attachment" "ecs_task_execution_efs_attach" {
  policy_arn = aws_iam_policy.ecs_task_execution_efs.arn
  role = aws_iam_role.execution.name
}



resource "aws_iam_role_policy_attachment" "ssm_managed_policy" {
  role       = aws_iam_role.execution.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_cloudwatch_log_group" "app_logs" {
  name              = "${var.project_name}-${var.environment}-app-logs"
  retention_in_days = 30 # Customize this value based on your retention requirements
}
