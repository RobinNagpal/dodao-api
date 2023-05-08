variable "project_name" {}
variable "environment" {}
variable "vpc_id" {}
variable "subnet_ids" {}
variable "security_group_ids" {
  description = "The security group IDs for the load balancer"
  type        = list(string)
}

variable "allowed_cidr_blocks" {
  type = list(string)
}

variable "ecs_security_group_id" {}

