default: start

project:=nb-demo
service:=ms-nodebootstrap-example
NODE_ENV?=dev
COMMIT_HASH = $(shell git rev-parse --verify HEAD)

.PHONY: start
start: 
	docker-compose -p ${project} up -d

.PHONY: stop
stop: 
	docker-compose -p ${project} down

.PHONY: restart
restart: stop start

.PHONY: logs
logs: 
	docker-compose -p ${project} logs -f ${service}

.PHONY: logs-db
logs-db: 
	docker-compose -p ${project} logs -f ${service}-db

.PHONY: ps
ps: 
	docker-compose -p ${project} ps

.PHONY: build
build:
	docker-compose -p ${project} build --no-cache

.PHONY: clean
clean: stop build start

.PHONY: install-dependencies
install-dependencies:
	docker-compose -p ${project} exec ${service} npm install

.PHONY: install-package
install-package:
	docker-compose -p ${project} exec ${service} npm install -S ${package}

.PHONY: install-dev-package
install-dev-package:
	docker-compose -p ${project} exec ${service} npm install -D ${package}

.PHONY: dependencies
dependencies:
	docker-compose -p ${project} exec ${service} npm install	

.PHONY: migration-create
migration-create:
	docker-compose -p ${project} exec ${service} node_modules/db-migrate/bin/db-migrate create --sql-file

.PHONY: migrate
migrate:
	docker-compose -p ${project} exec ${service} node_modules/db-migrate/bin/db-migrate up -e ${NODE_ENV}

.PHONY: test
test:
	docker-compose -p ${project} exec ${service} npm run test

.PHONY: lint-fix
lint-fix:
	docker-compose -p ${project} exec ${service} npm run lint:fix

.PHONY: test-cov
test-cov:
	docker-compose -p ${project} exec ${service} npm run test-cov

.PHONY: commit-hash
commit-hash:
	@echo $(COMMIT_HASH)

.PHONY: build-release
build-release:
	docker build --target release -t local/${service}:${COMMIT_HASH} .

.PHONY: run-release
run-release:
	docker run -d --name ${service}_${COMMIT_HASH} -p :5501 local/${service}:${COMMIT_HASH}
	docker logs -f ${service}_${COMMIT_HASH}
