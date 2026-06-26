import test from 'node:test';
import { strictEqual, throws } from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token with JWT_SECRET', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    strictEqual(getJwtToken('user1'), 'user1-test-secret');
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});

test('getJwtToken throws error when JWT_SECRET is missing', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    throws(() => getJwtToken('user1'), Error);
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
