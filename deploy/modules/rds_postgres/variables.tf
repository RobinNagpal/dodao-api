variable "project_name" {}
variable "environment" {}
variable "allocated_storage" {
  description = "The allocated storage for the RDS instance in GB"
  default     = 20
}

variable "engine" { default = "postgres" }

variable "engine_version" {
  description = "The PostgreSQL engine version"
  default     = "13.10"
}

variable "instance_class" {
  description = "The instance class of the RDS instance"
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "The name of the database"
}

variable "username" {
  description = "The master username for the RDS instance"
}

variable "password" {
  description = "The master password for the RDS instance"
}

variable "security_group_id" {
  description = "The security group ID"
}

variable "subnet_ids" {
  description = "The list of subnet IDs"
  type        = list(string)
}



