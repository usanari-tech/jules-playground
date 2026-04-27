import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  const originalJwtSecret = process.env.JWT_SECRET;

  t.afterEach(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  });

  await t.test('generates token successfully when JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user-123');
    assert.strictEqual(token, 'user-123-test-secret');
  });

  await t.test('throws an error when JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;
    assert.throws(() => {
      getJwtToken('user-123');
    }, {
      message: 'JWT_SECRET is not configured'
    });
  });
});
