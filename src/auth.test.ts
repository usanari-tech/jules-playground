import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken returns token when secret is configured', () => {
  process.env.JWT_SECRET = 'test-secret';
  const token = getJwtToken('user123');
  assert.strictEqual(token, 'user123-test-secret');
});

test('getJwtToken throws error when secret is missing', () => {
  delete process.env.JWT_SECRET;
  assert.throws(() => getJwtToken('user123'), /missing required authentication secrets/);
});