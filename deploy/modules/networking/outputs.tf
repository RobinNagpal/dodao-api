output "vpc_id" {
  value = aws_vpc.main.id
}

output "subnets" {
  value = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

output "security_group" {
  value = aws_security_group.ecs_tasks.id
}

output "security_group_id" {
  value = aws_security_group.ecs_tasks.id
}

