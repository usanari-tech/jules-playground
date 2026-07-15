import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken uses process.env.JWT_SECRET', (t) => {
  const originalSecret = process.env.JWT_SECRET;

  try {
    process.env.JWT_SECRET = 'test-secret-env-123';
    const token = getJwtToken('user-123');
    assert.strictEqual(token, 'user-123-test-secret-env-123');
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});

test('getJwtToken throws when process.env.JWT_SECRET is missing', (t) => {
  const originalSecret = process.env.JWT_SECRET;

  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => {
        getJwtToken('user-456');
      },
      (err: Error) => err.message === 'Missing required environment variable: JWT_SECRET'
    );
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
