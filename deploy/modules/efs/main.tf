

locals {
  efs_name = "${var.project_name}-${var.environment}"
}

resource "aws_efs_file_system" "efs" {
  creation_token = local.efs_name
  tags = {
    Name        = local.efs_name
    Environment = var.environment
  }
}

resource "aws_efs_mount_target" "efs_mount_target" {
  count           = length(var.subnet_ids)
  file_system_id  = aws_efs_file_system.efs.id
  subnet_id       = var.subnet_ids[count.index]
  security_groups = var.security_group_ids
}

variable "enable_dns_hostnames" {
  default = true
}

variable "enable_dns_resolution" {
  default = true
}

resource "aws_security_group" "efs_security_group" {
  name        = "${var.project_name}-${var.environment}-efs"
  description = "EFS security group"
  vpc_id      = var.vpc_id
}

resource "aws_security_group_rule" "efs_inbound_nfs" {
  security_group_id = aws_security_group.efs_security_group.id

  type        = "ingress"
  from_port   = 2049
  to_port     = 2049
  protocol    = "tcp"
  source_security_group_id = var.ecs_security_group_id
}

resource "aws_security_group_rule" "efs_outbound_nfs" {
  security_group_id = aws_security_group.efs_security_group.id

  type        = "egress"
  from_port   = 2049
  to_port     = 2049
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

