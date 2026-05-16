import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken fails securely if JWT_SECRET is not set', () => {
  const originalSecret = process.env.JWT_SECRET;
  delete process.env.JWT_SECRET;

  assert.throws(
    () => {
      getJwtToken('user123');
    },
    (err: Error) => err.message === 'Authentication configuration missing. Failing securely.'
  );

  if (originalSecret !== undefined) {
    process.env.JWT_SECRET = originalSecret;
  }
});

test('getJwtToken generates token if JWT_SECRET is set', () => {
  const originalSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'test-secret';

  const token = getJwtToken('user123');
  assert.strictEqual(token, 'user123-test-secret');

  if (originalSecret !== undefined) {
    process.env.JWT_SECRET = originalSecret;
  } else {
    delete process.env.JWT_SECRET;
  }
});
