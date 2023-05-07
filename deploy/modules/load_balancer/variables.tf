variable "project_name" {
  description = "The project name"
  type        = string
}

variable "environment" {
  description = "The environment (e.g., prod, staging)"
  type        = string
}

variable "vpc_id" {
  description = "The VPC ID for the load balancer"
  type        = string
}

variable "subnet_ids" {
  description = "The subnet IDs for the load balancer"
  type        = list(string)
}

variable "security_group_ids" {
  description = "The security group IDs for the load balancer"
  type        = list(string)
}

