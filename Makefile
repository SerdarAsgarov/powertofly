ROOT_DIRECTORY=$(shell dirname "$(realpath $(lastword $(MAKEFILE_LIST)))")
DOCKER_COMPOSE_FILE=docker-compose.yaml
DOCKER_COMPOSE_DEV_FILE=docker-compose.dev.yaml
DEBUG=true
DAEMONIZED=$(if $(DEBUG),,-d)
REBUILD:=$(if $(REBUILD),--build,)


.PHONY: docker-up-dev
docker-up-dev:
	docker-compose down
	DEPLOY_ENVIRONMENT=dev docker-compose -f $(DOCKER_COMPOSE_FILE) -f $(DOCKER_COMPOSE_DEV_FILE) up $(DAEMONIZED) $(REBUILD)

.PHONY: docker-up-prod
docker-up-prod:
	DEPLOY_ENVIRONMENT=prod docker-compose -f $(DOCKER_COMPOSE_FILE) up -d --build

.PHONY: docker-down
docker-down:
	docker-compose down
