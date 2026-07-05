import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken throws if JWT_SECRET is not set', (t) => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(() => getJwtToken('user123'), { message: 'Missing JWT_SECRET environment variable.' });
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    } else {
      delete process.env.JWT_SECRET;
    }
  }
});

test('getJwtToken returns token with JWT_SECRET', (t) => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    assert.strictEqual(getJwtToken('user123'), 'user123-test-secret');
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    } else {
      delete process.env.JWT_SECRET;
    }
  }
});
