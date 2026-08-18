# ADR 003: Keep high-frequency driver location in latest-state cache first

## Status

Accepted

## Context

Driver location traffic can be much higher than order traffic. Writing every GPS update synchronously to PostgreSQL would be expensive and would threaten dispatch and order performance.

## Decision

Route driver GPS updates through a realtime gateway to Redis/latest-state storage and event streams. Persist only sampled, throttled, or batched historical records to PostgreSQL according to operational and product requirements.

## Consequences

- Customer tracking and dispatch can read fresh location from Redis.
- PostgreSQL remains protected from unbounded GPS write volume.
- Recovery behavior must tolerate Redis loss by falling back to durable driver availability and recent persisted samples.
