import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token correctly when JWT_SECRET is set', () => {
  const originalJwtSecret = process.env.JWT_SECRET;

  try {
    process.env.JWT_SECRET = 'test-secret';
    assert.strictEqual(getJwtToken('user-id'), 'user-id-test-secret');
  } finally {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  }
});

test('getJwtToken throws Error when JWT_SECRET is missing', () => {
  const originalJwtSecret = process.env.JWT_SECRET;

  try {
    delete process.env.JWT_SECRET;
    assert.throws(() => getJwtToken('user-id'), Error, 'JWT_SECRET environment variable is missing.');
  } finally {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  }
});
