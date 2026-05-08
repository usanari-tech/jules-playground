import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken', async (t) => {
  t.afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  await t.test('throws an error when JWT_SECRET is not set', async () => {
    delete process.env.JWT_SECRET; // Ensure it's not set

    assert.throws(
      () => getJwtToken('user123'),
      /Missing JWT_SECRET environment variable/
    );
  });

  await t.test('returns token when JWT_SECRET is set', async () => {
    process.env.JWT_SECRET = 'test-secret';

    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  });
});
