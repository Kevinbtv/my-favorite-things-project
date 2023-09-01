.PHONY: docker start stop restart logs

.EXPORT_ALL_VARIABLES:
COMPOSE_FILE ?= docker-compose.yaml

docker: 
	@docker-compose -f ${COMPOSE_FILE} build

start: docker
	@docker-compose -f ${COMPOSE_FILE} up -d

stop:
	@docker-compose -f ${COMPOSE_FILE} stop

restart: stop start

logs:
	@docker-compose -f ${COMPOSE_FILE} logs -f