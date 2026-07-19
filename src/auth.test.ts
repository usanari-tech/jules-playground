import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken returns token when process.env.JWT_SECRET is set', () => {
  const originalJwtSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  } finally {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  }
});

test('getJwtToken throws error when process.env.JWT_SECRET is missing', () => {
  const originalJwtSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      new Error('Missing JWT_SECRET environment variable')
    );
  } finally {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  }
});
