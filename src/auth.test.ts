import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken uses process.env.JWT_SECRET correctly', () => {
  const originalSecret = process.env.JWT_SECRET;

  process.env.JWT_SECRET = 'test-secret-123';
  const token = getJwtToken('user123');
  assert.strictEqual(token, 'user123-test-secret-123');

  if (originalSecret === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalSecret;
  }
});

test('getJwtToken throws error when process.env.JWT_SECRET is missing', () => {
  const originalSecret = process.env.JWT_SECRET;

  delete process.env.JWT_SECRET;

  assert.throws(
    () => {
      getJwtToken('user123');
    },
    {
      message: 'JWT_SECRET environment variable is missing'
    }
  );

  if (originalSecret !== undefined) {
    process.env.JWT_SECRET = originalSecret;
  }
});
