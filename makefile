# Folder constants
DOCKER_COMPOSE := docker-compose.yml

############# BUILD #############
run-build:
	docker-compose -f $(DOCKER_COMPOSE) up -d --build

run-down:
	docker-compose -f $(DOCKER_COMPOSE) down