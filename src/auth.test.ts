import test from 'node:test';
import assert from 'node:assert/strict';
import { getJwtToken } from './auth.ts';

test('getJwtToken throws when JWT_SECRET is missing', () => {
  const originalSecret = process.env.JWT_SECRET;

  delete process.env.JWT_SECRET;
  assert.throws(() => getJwtToken('user1'), /JWT_SECRET environment variable is missing/);

  // Restore env if it was there
  if (originalSecret !== undefined) {
    process.env.JWT_SECRET = originalSecret;
  }
});

test('getJwtToken succeeds when JWT_SECRET is present', () => {
  const originalSecret = process.env.JWT_SECRET;

  process.env.JWT_SECRET = 'test-secret';
  assert.equal(getJwtToken('user1'), 'user1-test-secret');

  // Restore env
  if (originalSecret === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalSecret;
  }
});
