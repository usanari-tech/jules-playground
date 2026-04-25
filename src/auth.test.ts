import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token correctly with JWT_SECRET', () => {
  // Setup environment variable
  process.env.JWT_SECRET = 'test-secret';

  const token = getJwtToken('user-123');
  assert.strictEqual(token, 'user-123-test-secret');

  // Cleanup environment variable
  delete process.env.JWT_SECRET;
});

test('getJwtToken throws error when JWT_SECRET is missing', () => {
  // Ensure the variable is completely removed using delete,
  // do not assign to undefined since it gets casted to the string 'undefined'
  delete process.env.JWT_SECRET;

  assert.throws(() => {
    getJwtToken('user-123');
  }, /JWT_SECRET is missing from environment variables/);
});
