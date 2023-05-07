output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  value       = aws_lb.alb.dns_name
}


output "ecs_target_group_arn" {
  value = aws_lb_target_group.ecs_target_group.arn
}


output "alb_zone_id" {
  description = "The zone ID of the Application Load Balancer."
  value       = aws_lb.alb.zone_id
}
