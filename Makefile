


# ============================================================
#  WeJobs — Prisma Makefile
#  Usage: make <command>
#  All commands run from the monorepo root via pnpm --filter
# ============================================================

FILTER = pnpm --filter @wejobs/api
PRISMA = $(FILTER) exec prisma




# ──────────────────────────────────────────────────────────────

.PHONY: dev
dev: ## Start the API server in development mode with hot reload
	$(FILTER) run start:dev

# ── Help ────────────────────────────────────────────────────

.PHONY: help
help: ## Show all available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-28s\033[0m %s\n", $$1, $$2}'

# ── Setup ───────────────────────────────────────────────────

.PHONY: prisma-init
prisma-init: ## Initialize Prisma in apps/api (first time only)
	$(FILTER) exec prisma init

.PHONY: prisma-generate
prisma-generate: ## Regenerate Prisma Client after schema changes
	$(PRISMA) generate

# ── Migrations ──────────────────────────────────────────────

.PHONY: prisma-migrate
prisma-migrate: ## Create and apply a new migration (prompts for name)
	@read -p "Migration name: " name; \
	$(PRISMA) migrate dev --name $$name

.PHONY: prisma-migrate-deploy
prisma-migrate-deploy: ## Apply all pending migrations (use in CI/production)
	$(PRISMA) migrate deploy

.PHONY: prisma-migrate-reset
prisma-migrate-reset: ## ⚠️  Wipe DB and reapply all migrations (dev only!)
	$(PRISMA) migrate reset

.PHONY: prisma-migrate-status
prisma-migrate-status: ## Show the status of all migrations
	$(PRISMA) migrate status

.PHONY: prisma-migrate-diff
prisma-migrate-diff: ## Show diff between schema and current DB state
	$(PRISMA) migrate diff \
		--from-schema-datamodel apps/api/prisma/schema.prisma \
		--to-local-d-b

# ── Database ─────────────────────────────────────────────────

.PHONY: prisma-db-push
prisma-db-push: ## Push schema changes to DB without creating a migration (prototyping)
	$(PRISMA) db push

.PHONY: prisma-db-pull
prisma-db-pull: ## Pull the current DB schema into schema.prisma (introspection)
	$(PRISMA) db pull

.PHONY: prisma-db-seed
prisma-db-seed: ## Run the database seed file
	$(FILTER) exec ts-node prisma/seed.ts

# ── Studio ───────────────────────────────────────────────────

.PHONY: prisma-studio
prisma-studio: ## Open Prisma Studio — visual DB browser in the browser
	$(PRISMA) studio

# ── Validation ───────────────────────────────────────────────

.PHONY: prisma-validate
prisma-validate: ## Validate the schema.prisma file for errors
	$(PRISMA) validate

.PHONY: prisma-format
prisma-format: ## Format schema.prisma file
	$(PRISMA) format