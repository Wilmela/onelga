.PHONY: up down

up: 
	docker compose up -d
	@sleep 3
	@echo "starting app in dev mode..."
	npm run dev

down: 
	docker compose down