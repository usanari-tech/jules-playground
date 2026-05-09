import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  t.afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  await t.test('throws when process.env.JWT_SECRET is missing', () => {
    assert.throws(() => getJwtToken('user123'), new Error('Internal Server Error: Missing required configuration'));
  });

  await t.test('returns expected token when process.env.JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret';
    assert.strictEqual(getJwtToken('user123'), 'user123-test-secret');
  });
});
