import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken tests', async (t) => {
  const originalSecret = process.env.JWT_SECRET;

  t.afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  });

  await t.test('throws an error if JWT_SECRET is not set', () => {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      {
        name: 'Error',
        message: 'Internal Configuration Error'
      }
    );
  });

  await t.test('returns correct token if JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  });
});
