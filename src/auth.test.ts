import test, { afterEach } from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  const originalJwtSecret = process.env.JWT_SECRET;

  afterEach(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  });

  await t.test('generates token when JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  });

  await t.test('throws error when JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;
    assert.throws(() => getJwtToken('user123'), {
      message: 'Missing required environment variable: JWT_SECRET',
    });
  });
});
