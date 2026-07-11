import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token when JWT_SECRET is set', () => {
  const originalEnv = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  } finally {
    if (originalEnv === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalEnv;
    }
  }
});

test('getJwtToken throws error when JWT_SECRET is missing', () => {
  const originalEnv = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      /JWT_SECRET environment variable is missing/
    );
  } finally {
    if (originalEnv === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalEnv;
    }
  }
});
