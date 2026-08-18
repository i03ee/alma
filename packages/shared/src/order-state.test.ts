import assert from 'node:assert/strict';
import test from 'node:test';
import { canTransitionOrder } from './index.js';

test('allows explicit order transitions only', () => {
  assert.equal(canTransitionOrder('CREATED', 'SEARCHING_DRIVER'), true);
  assert.equal(canTransitionOrder('CREATED', 'COMPLETED'), false);
  assert.equal(canTransitionOrder('COMPLETED', 'CANCELLED'), false);
});
