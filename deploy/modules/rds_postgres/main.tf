resource "aws_db_instance" "postgres" {
  identifier             = "${var.project_name}-${var.environment}-db"
  allocated_storage      = var.allocated_storage
  engine                 = var.engine
  instance_class         = var.instance_class
  username               = var.username
  password               = var.password
  engine_version         = var.engine_version
  vpc_security_group_ids = [var.security_group_id]
  db_subnet_group_name   = aws_db_subnet_group.postgres.name

  tags = {
    Name = var.db_name
  }

  publicly_accessible       = true
  final_snapshot_identifier = "${var.project_name}-${var.environment}-db-final-snapshot"
  skip_final_snapshot       = true
  apply_immediately         = true
}

resource "aws_db_subnet_group" "postgres" {
  name       = "${var.db_name}-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "${var.db_name}-subnet-group"
  }
}
