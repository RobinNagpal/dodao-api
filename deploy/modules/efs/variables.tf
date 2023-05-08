variable "project_name" {}
variable "environment" {}
variable "vpc_id" {}
variable "subnet_ids" {}
variable "security_group_ids" {
  description = "The security group IDs for the load balancer"
  type        = list(string)
}
