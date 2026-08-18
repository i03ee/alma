# ALMA

ALMA is an Iraqi multi-service delivery platform foundation for Al-Shatrah district in Dhi Qar, Iraq. The repository starts as a modular monorepo so the team can build backend contracts before mobile UI work.

## Current milestone

This foundation milestone includes:

- pnpm monorepo configuration for apps and packages.
- TypeScript strict base configuration.
- NestJS API application skeleton.
- Versioned health endpoint at `/api/v1/health`.
- Shared package with order status types and an explicit transition validator.
- Database package with an initial PostgreSQL/PostGIS migration for core auditable entities.
- Docker Compose services for PostgreSQL/PostGIS, Redis, and S3-compatible object storage.
- GitHub Actions CI for install, lint, typecheck, test, and build.
- Repository audit, ADRs, and initial OpenAPI contract for the first backend phases.

The project is designed for future scale targets, but no production capacity claims are made until load tests prove them.

## Local development

```bash
pnpm install
# Until pnpm-lock.yaml is generated in an environment with registry access, CI/Docker use --no-frozen-lockfile.
cp .env.example .env
docker compose up -d postgres redis object-storage
pnpm build
pnpm test
pnpm dev
```

Health check:

```bash
curl http://localhost:3000/api/v1/health
```

## Repository safety

- Do not commit production secrets.
- Use `.env.example` for required variable names only.
- Keep development branches separate from `main`.
- Add migrations and audit logs for important state changes.

## Architecture direction

ALMA starts as a modular monolith using TypeScript, NestJS, PostgreSQL/PostGIS, Redis, an async/event architecture, object storage, and REST/WebSocket APIs. Boundaries should remain clear enough to extract high-load modules later if measured bottlenecks justify it.
