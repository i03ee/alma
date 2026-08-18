# ADR 005: Use an immutable ledger for wallet and payment accounting

## Status

Accepted

## Context

ALMA will support cash, future electronic payment, driver earnings, platform commission, merchant settlement, refunds, and adjustments. Direct balance mutation makes fraud investigation and reconciliation difficult.

## Decision

Represent financial movement as immutable ledger transactions posted to ledger accounts connected to wallets. Balances must be derived from ledger entries or maintained as audited projections, never by untraceable mutation such as incrementing a driver balance field directly.

## Consequences

- Financial history is traceable and auditable.
- Duplicate payment handling requires idempotency keys.
- Ledger schema and tests are required before production financial flows.
