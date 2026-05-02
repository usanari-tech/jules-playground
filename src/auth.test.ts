import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken fails fast if JWT_SECRET is missing', (t) => {
  // Ensure the variable is deleted to simulate it being missing
  delete process.env.JWT_SECRET;

  assert.throws(
    () => {
      getJwtToken('user123');
    },
    /JWT_SECRET environment variable is missing/,
    'Should throw an error if JWT_SECRET is not set'
  );
});

test('getJwtToken generates token if JWT_SECRET is present', (t) => {
  // Set the variable
  process.env.JWT_SECRET = 'test-secret';

  const token = getJwtToken('user123');
  assert.strictEqual(token, 'user123-test-secret', 'Should generate the token correctly');

  // Clean up
  delete process.env.JWT_SECRET;
});
