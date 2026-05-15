import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  await t.test('throws an error if JWT_SECRET is missing', () => {
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    assert.throws(
      () => getJwtToken('user123'),
      /Missing required environment variable: JWT_SECRET/
    );

    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    }
  });

  await t.test('returns a token if JWT_SECRET is set', () => {
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret';

    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');

    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    } else {
      delete process.env.JWT_SECRET;
    }
  });
});
