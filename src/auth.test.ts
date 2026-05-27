import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken throws error when JWT_SECRET is not set', () => {
  // Ensure the environment variable is not set
  if (process.env.JWT_SECRET !== undefined) {
    delete process.env.JWT_SECRET;
  }

  assert.throws(
    () => getJwtToken('user-123'),
    {
      name: 'Error',
      message: 'JWT_SECRET is not configured'
    }
  );
});

test('getJwtToken returns expected token when JWT_SECRET is set', () => {
  process.env.JWT_SECRET = 'test-secret-value';

  const token = getJwtToken('user-123');

  assert.strictEqual(token, 'user-123-test-secret-value');

  // Cleanup
  delete process.env.JWT_SECRET;
});
