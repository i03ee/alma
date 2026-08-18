# ALMA Architecture Foundation

ALMA starts as a modular monolith. This avoids premature microservice complexity while preserving boundaries for future extraction after real measurements.

## Initial modules

- Auth and users
- Customers and drivers
- Services and zones
- Orders and order state machine
- Dispatch and tracking
- Payments, wallets, and ledger
- Chat, notifications, ratings, disputes, audit logs, files, and admin

## Realtime and dispatch principles

Driver GPS updates should flow through a realtime gateway into Redis/latest-state storage and event streams. The system must not synchronously write every GPS update into PostgreSQL. Dispatch should use candidate windows, geographic filtering, configurable scoring weights, and manual operations overrides. Jobs must not be broadcast to thousands of drivers.

## Auditability

Important state changes require status history, audit logs, idempotent events, and retry-safe consumers. Financial changes should use immutable ledger transactions rather than direct balance mutation.

## Capacity claims

The platform has design targets for high traffic, including 10,000 active drivers and 100,000 orders per hour, but those are not supported claims until independent load tests demonstrate them.
