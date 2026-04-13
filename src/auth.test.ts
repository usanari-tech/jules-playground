import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken fails securely if JWT_SECRET is missing', (t) => {
  // Ensure it's not set
  delete process.env.JWT_SECRET;

  assert.throws(
    () => getJwtToken('user123'),
    { message: 'Internal server error' }
  );
});

test('getJwtToken succeeds if JWT_SECRET is provided', (t) => {
  process.env.JWT_SECRET = 'test-secret';

  const token = getJwtToken('user123');
  assert.strictEqual(token, 'user123-test-secret');
});
