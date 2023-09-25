.PHONY: docker start stop restart logs

.EXPORT_ALL_VARIABLES:
COMPOSE_FILE ?= docker-compose.yaml
ENV_FILE := server/.env
ENV_SAMPLE_FILE := server/.env.sample

docker: 
	@docker-compose -f ${COMPOSE_FILE} build

start: create-env-file docker
	@docker-compose -f ${COMPOSE_FILE} up -d

stop:
	@docker-compose -f ${COMPOSE_FILE} stop

restart: stop start

logs:
	@docker-compose -f ${COMPOSE_FILE} logs -f

create-env-file:
	@echo "Criando arquivo .env a partir do sample (caso não exista)...";
	@if [ ! -f ${ENV_FILE} ]; then \
		cp ${ENV_SAMPLE_FILE} ${ENV_FILE}; \
	fi
