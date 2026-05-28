import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  const originalJwtSecret = process.env.JWT_SECRET;

  t.afterEach(() => {
    // Restore original environment variable after each test
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  });

  await t.test('throws error if JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      {
        message: 'JWT_SECRET environment variable is missing'
      }
    );
  });

  await t.test('returns token if JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret-value';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret-value');
  });
});
