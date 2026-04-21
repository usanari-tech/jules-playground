import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken fails fast when JWT_SECRET is missing', (t) => {
  const originalEnv = process.env.JWT_SECRET;
  delete process.env.JWT_SECRET;

  assert.throws(
    () => {
      getJwtToken('user-123');
    },
    {
      message: 'Missing required environment variable: JWT_SECRET'
    }
  );

  if (originalEnv === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalEnv;
  }
});

test('getJwtToken generates token correctly when JWT_SECRET is present', (t) => {
  const originalEnv = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'test-secret';

  const token = getJwtToken('user-123');
  assert.strictEqual(token, 'user-123-test-secret');

  if (originalEnv === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalEnv;
  }
});
