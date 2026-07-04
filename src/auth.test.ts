import { test } from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  await t.test('throws an error if JWT_SECRET is missing', () => {
    const originalSecret = process.env.JWT_SECRET;
    try {
      delete process.env.JWT_SECRET;
      assert.throws(() => {
        getJwtToken('user123');
      }, new Error('Missing JWT_SECRET environment variable'));
    } finally {
      if (originalSecret !== undefined) {
        process.env.JWT_SECRET = originalSecret;
      } else {
        delete process.env.JWT_SECRET;
      }
    }
  });

  await t.test('generates a token successfully with JWT_SECRET', () => {
    const originalSecret = process.env.JWT_SECRET;
    try {
      process.env.JWT_SECRET = 'test-secret';
      const token = getJwtToken('user123');
      assert.strictEqual(token, 'user123-test-secret');
    } finally {
      if (originalSecret !== undefined) {
        process.env.JWT_SECRET = originalSecret;
      } else {
        delete process.env.JWT_SECRET;
      }
    }
  });
});
