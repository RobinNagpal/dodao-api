output "ecs_cluster_name" {
  value = module.ecs.cluster_name
}

output "ecs_service_name" {
  value = module.ecs.service_name
}

output "subnet_ids" {
  value = module.networking.subnets
}

output "security_group_ids" {
  value = module.networking.security_group
}


output "alb_dns_name" {
  value = module.load_balancer.alb_dns_name
}
