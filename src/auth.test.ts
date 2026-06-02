import test from 'node:test';
import { strictEqual, throws } from 'node:assert';
import { getJwtToken, getJwtSecret } from './auth.ts';

test('getJwtToken uses environment variable', () => {
  process.env.JWT_SECRET = 'test-secret';
  strictEqual(getJwtToken('user1'), 'user1-test-secret');
  delete process.env.JWT_SECRET;
});

test('getJwtSecret throws if environment variable is missing', () => {
  delete process.env.JWT_SECRET;
  throws(() => getJwtToken('user1'), /JWT_SECRET environment variable is required/);
});
