import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken security tests', async (t) => {
  await t.test('throws when JWT_SECRET is not set', () => {
    // Save current environment and ensure JWT_SECRET is undefined
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    assert.throws(
      () => getJwtToken('user-123'),
      /Missing JWT_SECRET environment variable/
    );

    // Restore environment
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    }
  });

  await t.test('returns valid token when JWT_SECRET is set', () => {
    // Set up a test secret
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-secret-456';

    const token = getJwtToken('user-123');
    assert.strictEqual(token, 'user-123-test-secret-456');

    // Restore environment
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  });
});
