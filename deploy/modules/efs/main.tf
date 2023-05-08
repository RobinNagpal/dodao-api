

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
