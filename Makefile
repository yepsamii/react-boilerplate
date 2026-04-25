# Docker Makefile
# Usage: make build [IMAGE=<name>] [TAG=<tag>]
#        make push [IMAGE=<name>] [TAG=<tag>]
#        make build-push [IMAGE=<name>] [TAG=<tag>]

# Configurable variables
IMAGE ?= react-app
TAG ?= v1.4
REGISTRY ?= yepsamii
PORT ?= 4000

# Full image name
IMAGE_NAME := $(REGISTRY)/$(IMAGE):$(TAG)
# LATEST_NAME := $(REGISTRY)$(IMAGE):latest
CONTAINER_NAME := $(IMAGE)-$(TAG)

# Default target
.PHONY: help
help:
	@echo "Docker Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make build          Build the Docker image"
	@echo "  make push          Push image to registry"
	@echo "  make build-push    Build and push in one step"
	@echo "  make latest        Build and push with latest tag"
	@echo "  make run           Run container with port forwarding"
	@echo "  make stop          Stop and remove container"
	@echo "  make restart      Restart container"
	@echo ""
	@echo "Variables:"
	@echo "  IMAGE=<name>     Image name (default: react-app)"
	@echo "  TAG=<tag>       Image tag (default: v1.1)"
	@echo "  REGISTRY=<url>  Registry prefix (default: yepsamii)"
	@echo "  PORT=<port>    Host port (default: 8080)"
	@echo ""
	@echo "Examples:"
	@echo "  make build IMAGE=myapp TAG=v1.0.0"
	@echo "  make run PORT=3000"
	@echo "  make build-push REGISTRY=ghcr.io/user/ IMAGE=myapp TAG=v2.0"

# Build the Docker image
.PHONY: build
build:
	@echo "Building $(IMAGE_NAME)..."
	docker build -t $(IMAGE_NAME) .
	@echo "Built successfully: $(IMAGE_NAME)"

# Push image to registry
.PHONY: push
push:
	@echo "Pushing $(IMAGE_NAME)..."
	docker push $(IMAGE_NAME)
	@echo "Pushed successfully"

# Build and push in one step
.PHONY: build-push
build-push: build push

# Build and push with :latest tag
.PHONY: latest
latest: TAG=latest
latest: build-push

# Run the container with port forwarding
.PHONY: run
run:
	@echo "Running $(IMAGE_NAME) on port $(PORT)..."
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):80 $(IMAGE_NAME)
	@echo "Container started: http://localhost:$(PORT)"

# Stop and remove the container
.PHONY: stop
stop:
	@echo "Stopping container $(CONTAINER_NAME)..."
	-@docker stop $(CONTAINER_NAME)
	-@docker rm $(CONTAINER_NAME)
	@echo "Container stopped and removed"

# Restart the container
.PHONY: restart
restart: stop run