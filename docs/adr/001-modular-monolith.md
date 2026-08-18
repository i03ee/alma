# ADR 001: Start ALMA as a modular monolith

## Status

Accepted

## Context

ALMA must support multiple service categories, realtime dispatch, auditability, and future scale. Starting with many microservices would increase operational cost, deployment complexity, and debugging overhead before the product has measured bottlenecks.

## Decision

Build the backend as a modular monolith with explicit boundaries for auth, users, drivers, services, orders, dispatch, tracking, payments, ledger, chat, notifications, disputes, audit, files, and admin. Extract services only after measurements show a scaling, fault-isolation, or deployment-independence requirement.

## Consequences

- Developers can move faster with one deployable backend early on.
- Cross-module boundaries still need discipline and tests.
- Future extraction remains possible because modules own their domain logic and data access.
