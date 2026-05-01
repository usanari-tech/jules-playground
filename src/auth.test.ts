import { test, afterEach } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken succeeds with valid secret', () => {
  process.env.JWT_SECRET = 'test-secret';
  assert.strictEqual(getJwtToken('user1'), 'user1-test-secret');
});

test('getJwtToken throws error without secret', () => {
  delete process.env.JWT_SECRET;
  assert.throws(() => getJwtToken('user1'), Error);
});

afterEach(() => {
  delete process.env.JWT_SECRET;
});
