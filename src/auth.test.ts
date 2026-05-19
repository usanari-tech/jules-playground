import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  t.afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  await t.test('throws when JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user-1'),
      /Missing JWT_SECRET environment variable/
    );
  });

  await t.test('returns valid token when JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret';
    assert.strictEqual(getJwtToken('user-1'), 'user-1-test-secret');
  });
});
