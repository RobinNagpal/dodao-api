ecr_login:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 729763663166.dkr.ecr.us-east-1.amazonaws.com

pull_image:
	docker pull 729763663166.dkr.ecr.us-east-1.amazonaws.com/v2-api:latest

trigger_deploy:
	aws ecs update-service --cluster v2-api-prod --service v2-api-prod-app --force-new-deployment

ssh:
	aws ecs execute-command  \
		--region us-east-1 \
		--cluster v2-api-prod \
		--task 9e189605a2f540d28f4229a713f98f0b \
		--container v2-api-prod \
		--command "/bin/bash" \
		--interactive

describe_task:
	aws ecs describe-tasks \
        --cluster v2-api-prod \
        --region us-east-1 \
        --tasks 1c67f19dc92c44628b310c502b9c1477

ecs_ssh_setup:
