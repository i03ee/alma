import assert from 'node:assert/strict';
import test from 'node:test';
import { loadConfig } from './config.js';

test('loads typed application configuration', () => {
  const config = loadConfig({
    NODE_ENV: 'test',
    PORT: '3001',
    LOG_LEVEL: 'debug',
    DATABASE_URL: 'postgresql://alma:alma@localhost:5432/alma',
    REDIS_URL: 'redis://localhost:6379',
    OTP_PROVIDER: 'mock'
  });

  assert.equal(config.PORT, 3001);
  assert.equal(config.OTP_PROVIDER, 'mock');
});
