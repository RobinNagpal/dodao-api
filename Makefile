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
		--task caa271e740e9495f97a7b555db7d5b3f \
		--container v2-api-prod \
		--command "/bin/bash" \
		--interactive

describe_task:
	aws ecs describe-tasks \
        --cluster v2-api-prod \
        --region us-east-1 \
        --tasks 1c67f19dc92c44628b310c502b9c1477

dump_database:
	@PGPASSWORD=$$DB_PASSWORD pg_dump -h $$DB_HOST -U $$DB_USER -d $$DB_NAME --inserts -f backup.sql

read_backup:
	PGPASSWORD=admin psql -h localhost -U admin -d dodao_api_localhost_db < backup.sql
