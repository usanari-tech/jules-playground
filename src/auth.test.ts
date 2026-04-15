import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token correctly when JWT_SECRET is set', () => {
  process.env.JWT_SECRET = 'test-secret';
  const token = getJwtToken('user-123');
  assert.strictEqual(token, 'user-123-test-secret');
});

test('getJwtToken throws error when JWT_SECRET is not set', () => {
  delete process.env.JWT_SECRET;
  assert.throws(
    () => getJwtToken('user-123'),
    { message: 'Authentication configuration is incomplete' }
  );
});
