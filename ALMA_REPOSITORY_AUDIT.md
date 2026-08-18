# ALMA Repository Audit

Audit date: 2026-08-18
Branch inspected: `work`
Latest commit inspected: `c91896e`

## Current state

The repository contains an initial TypeScript monorepo foundation with a NestJS API skeleton, shared package, database package, Docker Compose, CI workflow, and introductory documentation. The current branch is not `main`; this preserves the requested separation between development work and the production branch.

## Existing files

- Root project files: `README.md`, `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.gitignore`, `.env.example`.
- API app: `apps/api/package.json`, `apps/api/tsconfig.json`, and `apps/api/src/*`.
- Shared package: `packages/shared/package.json`, `packages/shared/tsconfig.json`, `packages/shared/src/*`.
- Database package: `packages/database/package.json`, `packages/database/tsconfig.json`, `packages/database/src/index.ts`, `packages/database/migrations/0001_foundation.sql`.
- Local infrastructure: `docker-compose.yml`.
- CI: `.github/workflows/ci.yml`.
- Documentation: `docs/architecture.md`.

## Detected technology

- Runtime/tooling: Node.js, pnpm workspace, TypeScript.
- Backend framework: NestJS skeleton.
- Database: PostgreSQL with PostGIS extension in the first migration.
- Realtime/cache target: Redis service in Docker Compose.
- Object storage target: MinIO service in Docker Compose.
- CI: GitHub Actions.

## Detected problems

1. Dependency installation could not be verified in this environment because npm/Corepack registry access is blocked by a proxy `403`.
2. No lockfile exists yet because dependency installation did not complete.
3. The database migration only covers a foundation subset; several required production entities are still missing.
4. No OpenAPI contract exists yet for the initial API list.
5. No ADRs exist yet for key architectural choices.
6. Docker Compose currently provides dependencies but not API/worker containers.
7. No authentication, authorization, idempotency, rate limiting, or request correlation middleware exists yet.
8. No migrations runner exists yet; migrations are SQL files only.
9. Load, integration, database, and API tests are not implemented yet.

## Architecture recommendation

Continue with a modular monolith. Keep the API, workers, dispatch, realtime, and AI code in a single repository with strong module boundaries. Avoid microservices until measured bottlenecks or operational isolation needs justify extraction. PostgreSQL/PostGIS should be the durable source of truth, Redis should hold latest realtime state and ephemeral coordination, and object storage should hold evidence/media files.

## Risks

- Public repository risk: do not commit production secrets or real customer/driver data.
- Scale risk: design targets are ambitious and must not be represented as achieved without measured load tests.
- Realtime risk: GPS traffic can overload PostgreSQL if latest-state caching and batching are not enforced.
- Financial risk: wallet balances must be derived from immutable ledger transactions, not direct mutation.
- Dispatch fairness risk: optimizing only for nearest driver can harm driver trust and marketplace health.
- Dependency risk: CI will fail until a lockfile is generated in an environment with npm registry access.

## Missing components

- ADRs for modular monolith, PostgreSQL/PostGIS, realtime location, dispatch, and ledger.
- Complete database schema for drivers, vehicles, orders, assignments, evidence, payments, ratings, disputes, events, and risk.
- API modules and OpenAPI documentation for auth, orders, drivers, evidence, tracking, ratings, and disputes.
- Observability: correlation IDs, metrics, tracing, readiness/liveness checks.
- Security: validation, RBAC, rate limiting, token/session model, idempotency keys, audit middleware.
- Docker images for API and worker processes.
- Migration runner and database tests.
- Load test scaffolding and documented performance methodology.

## Proposed phase plan

1. Phase 1 foundation hardening: add repository audit, ADRs, OpenAPI contract, Dockerfile, and local API service wiring.
2. Phase 2 database: add complete core schema, migration runner, seeds, and database tests.
3. Phase 3 authentication: implement OTP provider abstraction, mock provider, request/verify flows, session model, and rate limits.
4. Phase 4 users/customers/drivers: implement profiles, driver onboarding, documents, vehicles, availability.
5. Phase 5 services/orders: implement generic service catalog and order creation/read/cancel APIs.
6. Phase 6 order state machine: persist validated transitions, events, and audit records.
7. Phase 7 dispatch: implement configurable candidate scoring and offer lifecycle.
8. Phase 8 realtime: implement WebSocket gateway and Redis latest-state pattern.
9. Continue through routing, purchase evidence, delivery verification, ledger, chat, ratings/disputes, admin, observability, security hardening, and load testing.
