import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken throws if JWT_SECRET is not set', () => {
  // Save original secret
  const originalSecret = process.env.JWT_SECRET;

  // Ensure it's not set
  delete process.env.JWT_SECRET;

  assert.throws(
    () => getJwtToken('user123'),
    /JWT_SECRET environment variable is not defined/
  );

  // Restore original secret
  if (originalSecret !== undefined) {
    process.env.JWT_SECRET = originalSecret;
  }
});

test('getJwtToken generates token if JWT_SECRET is set', () => {
  // Save original secret
  const originalSecret = process.env.JWT_SECRET;

  // Set to a test secret
  process.env.JWT_SECRET = 'test-secret';

  assert.strictEqual(getJwtToken('user123'), 'user123-test-secret');

  // Restore original secret
  if (originalSecret !== undefined) {
    process.env.JWT_SECRET = originalSecret;
  } else {
    delete process.env.JWT_SECRET;
  }
});
