variable "project_name" {}
variable "environment" {}

locals {
  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  tags                 = merge(local.tags, { Name = "${var.project_name}-${var.environment}-vpc" })
  enable_dns_hostnames = true
}

resource "aws_subnet" "public_a" {
  cidr_block        = "10.0.1.0/24"
  vpc_id            = aws_vpc.main.id
  availability_zone = "us-east-1a" # Update with the appropriate Availability Zone
  tags              = merge(local.tags, { Name = "${var.project_name}-${var.environment}-subnet-public-a" })
}

resource "aws_subnet" "public_b" {
  cidr_block        = "10.0.2.0/24"
  vpc_id            = aws_vpc.main.id
  availability_zone = "us-east-1b" # Update with the appropriate Availability Zone
  tags              = merge(local.tags, { Name = "${var.project_name}-${var.environment}-subnet-public-b" })
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

  ingress {
    from_port  = 2049
    to_port    = 2049
    protocol   = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Add this block to allow traffic on port 443 (HTTPS)
  ingress {
    from_port   = 443
    to_port     = 443
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

# Add this block to create an internet gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = merge(local.tags, { Name = "${var.project_name}-${var.environment}-igw" })
}

# Add this block to create a route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  tags   = merge(local.tags, { Name = "${var.project_name}-${var.environment}-public-rt" })
}

# Add this block to create a route to the internet gateway
resource "aws_route" "public" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

# Attach the route table to public_a subnet
resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

# Attach the route table to public_b subnet
resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}


# ========================== Below here are all EFS related resources ==========================


#resource "aws_network_acl" "efs" {
#  vpc_id = aws_vpc.main.id
#  tags   = merge(local.tags, { Name = "${var.project_name}-${var.environment}-efs-nacl" })
#}
#
#
#resource "aws_network_acl_rule" "efs_inbound_nfs" {
#  network_acl_id = aws_network_acl.efs.id
#  rule_number    = 100
#  egress         = false
#  protocol       = "tcp"
#  rule_action    = "allow"
#  from_port      = 2049
#  to_port        = 2049
#  cidr_block     = "0.0.0.0/0"
#}
#
#resource "aws_network_acl_rule" "efs_outbound_nfs" {
#  network_acl_id = aws_network_acl.efs.id
#  rule_number    = 100
#  egress         = true
#  protocol       = "tcp"
#  rule_action    = "allow"
#  from_port      = 2049
#  to_port        = 2049
#  cidr_block     = "0.0.0.0/0"
#}
#
#
#resource "aws_network_acl" "efs_acl" {
#  vpc_id = aws_vpc.main.id
#
#  subnet_ids = [aws_subnet.public_a.id, aws_subnet.public_b.id]
#
#  egress {
#    rule_no    = 100
#    action     = "allow"
#    cidr_block = "0.0.0.0/0"
#    from_port  = 0
#    to_port    = 0
#    protocol   = -1
#  }
#
#  ingress {
#    rule_no    = 100
#    action     = "allow"
#    cidr_block = "0.0.0.0/0"
#    from_port  = 2049
#    to_port    = 2049
#    protocol   = "tcp"
#  }
#
#  tags = {
#    Name        = "${var.project_name}-${var.environment}-efs-acl"
#    Environment = var.environment
#    Project     = var.project_name
#  }
#}
#
#
#resource "aws_security_group_rule" "ecs_tasks_egress_ecr" {
#  security_group_id = aws_security_group.ecs_tasks.id
#
#  type        = "egress"
#  from_port   = 443
#  to_port     = 443
#  protocol    = "tcp"
#  cidr_blocks = ["0.0.0.0/0"]
#}
