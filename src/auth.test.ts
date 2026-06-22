import test from 'node:test';
import assert from 'node:assert/strict';
import { getJwtToken } from './auth.ts';

test('getJwtToken should generate token successfully when JWT_SECRET is provided', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    const result = getJwtToken('user-123');
    assert.strictEqual(result, 'user-123-test-secret');
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});

test('getJwtToken should fail fast when JWT_SECRET is missing', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(() => {
      getJwtToken('user-123');
    }, { message: 'Missing environment variable: JWT_SECRET is required.' });
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});