import test from 'node:test';
import assert from 'node:assert/strict';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  await t.test('throws when JWT_SECRET is unset', () => {
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    try {
      assert.throws(
        () => getJwtToken('user1'),
        (err: any) => err.message === 'Missing required environment variable for token generation.'
      );
    } finally {
      if (originalSecret !== undefined) {
        process.env.JWT_SECRET = originalSecret;
      } else {
        delete process.env.JWT_SECRET;
      }
    }
  });

  await t.test('returns token when JWT_SECRET is set', () => {
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret';
    try {
      assert.strictEqual(getJwtToken('user1'), 'user1-test-secret');
    } finally {
      if (originalSecret !== undefined) {
        process.env.JWT_SECRET = originalSecret;
      } else {
        delete process.env.JWT_SECRET;
      }
    }
  });
});
