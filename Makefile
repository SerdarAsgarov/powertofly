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

.PHONY: init
init:
	cd api && python3 -m venv .venv
	cd api && .venv/bin/python -m pip install -r requirements.txt
	cd api && ln -s powertoflyapi/seeds seeds
	cd api && FLASK_APP=powertoflyapi.api .venv/bin/flask db init
	cd api && FLASK_APP=powertoflyapi.api .venv/bin/flask db migrate
	cd api && FLASK_APP=powertoflyapi.api .venv/bin/flask db upgrade
	cd api && FLASK_APP=powertoflyapi.api .venv/bin/flask seed run
	cd api && FLASK_APP=powertoflyapi.api .venv/bin/flask cacheusers


.PHONY: cache-users
cache-users:
	cd api && FLASK_APP=powertoflyapi.api .venv/bin/flask cacheusers
