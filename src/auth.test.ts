import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  await t.test('returns token when JWT_SECRET is set', () => {
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret';
    try {
      const token = getJwtToken('user123');
      assert.strictEqual(token, 'user123-test-secret');
    } finally {
      process.env.JWT_SECRET = originalSecret;
    }
  });

  await t.test('throws secure error when JWT_SECRET is missing', () => {
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    try {
      assert.throws(
        () => getJwtToken('user123'),
        { message: 'Authentication configuration error' }
      );
    } finally {
      process.env.JWT_SECRET = originalSecret;
    }
  });
});
