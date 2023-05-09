resource "aws_lb" "alb" {
  name               = "${var.project_name}-${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = var.security_group_ids
  subnets            = var.subnet_ids
}

resource "aws_lb_target_group" "ecs_target_group" {
  name     = "${var.project_name}-${var.environment}-ecs-tg"
  port     = 8000
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  target_type = "ip" # Add this line to change the target type to "ip"

#  health_check {
#    interval            = 30
#    path                = "/"
#    timeout             = 5
#    healthy_threshold   = 3
#    unhealthy_threshold = 3
#    protocol            = "HTTP"
#    matcher             = "200"
#  }
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_target_group.arn
  }
}





# Add this block to create an HTTPS listener
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_target_group.arn
  }
}

