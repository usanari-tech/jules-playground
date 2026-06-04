import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  await t.test('should throw an error if JWT_SECRET is not set', () => {
    // Ensure JWT_SECRET is not set
    delete process.env.JWT_SECRET;

    assert.throws(() => {
      getJwtToken('user-123');
    }, new Error('Authentication configuration error'));
  });

  await t.test('should return a token if JWT_SECRET is set', () => {
    // Mock JWT_SECRET
    process.env.JWT_SECRET = 'mock-secret';

    const token = getJwtToken('user-123');
    assert.strictEqual(token, 'user-123-mock-secret');

    // Clean up
    delete process.env.JWT_SECRET;
  });
});
