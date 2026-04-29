import test, { afterEach } from 'node:test';
import { strictEqual, throws } from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken returns correct token when JWT_SECRET is set', () => {
  const originalSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'test-secret';

  const token = getJwtToken('user123');
  strictEqual(token, 'user123-test-secret');

  if (originalSecret === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalSecret;
  }
});

test('getJwtToken throws Error when JWT_SECRET is missing', () => {
  const originalSecret = process.env.JWT_SECRET;
  delete process.env.JWT_SECRET;

  throws(() => {
    getJwtToken('user123');
  }, /Missing JWT_SECRET environment variable/);

  if (originalSecret !== undefined) {
    process.env.JWT_SECRET = originalSecret;
  }
});
