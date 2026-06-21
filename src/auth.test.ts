import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken returns a valid token when JWT_SECRET is set', () => {
  const originalJwtSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user-123');
    assert.strictEqual(token, 'user-123-test-secret');
  } finally {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  }
});

test('getJwtToken throws an error when JWT_SECRET is not set', () => {
  const originalJwtSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user-123'),
      { message: 'Missing required configuration' }
    );
  } finally {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  }
});
