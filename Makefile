ecr_login:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 729763663166.dkr.ecr.us-east-1.amazonaws.com

pull_image:
	docker pull 729763663166.dkr.ecr.us-east-1.amazonaws.com/v2-api:latest

ecr-ssh:
	aws ecs execute-command  \
		--region eu-east-1 \
		--cluster v2-api-prod \
		--task c26ec483a0444cda9feae08c733d3f0b \
		--container v2-api-prod \
		--command "/bin/bash" \
		--interactive
