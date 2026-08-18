# ADR 004: Dispatch with candidate windows and configurable scoring

## Status

Accepted

## Context

Broadcasting orders to thousands of drivers is costly, unfair, and operationally noisy. Driver fairness, service compatibility, reliability, distance, ETA, workload, and customer priority all matter.

## Decision

Dispatch will search bounded geographic candidate windows, filter by active availability and service/vehicle compatibility, compute configurable scores, rank candidates, offer to a small set, enforce timeouts, and retry/rebalance idempotently.

## Consequences

- Dispatch policy can change without code rewrites by moving weights into configuration.
- Fairness can be included from the beginning.
- Load tests must measure dispatch latency independently from general API latency.
