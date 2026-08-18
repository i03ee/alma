# ADR 002: Use PostgreSQL with PostGIS as durable system of record

## Status

Accepted

## Context

ALMA needs transactional correctness, auditability, ledger support, geospatial queries, and deliberate indexing for orders, drivers, zones, and assignments.

## Decision

Use PostgreSQL as the durable source of truth and enable PostGIS for geospatial data. Store locations using PostGIS geography/geometry types, never latitude/longitude text fields. Use Redis for latest-state and ephemeral coordination, not durable business records.

## Consequences

- Strong consistency is available for core business and financial workflows.
- Geographic indexes support service zones and dispatch candidate search.
- High-frequency GPS writes must be throttled/batched to avoid overloading PostgreSQL.
