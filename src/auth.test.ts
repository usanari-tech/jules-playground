import test from 'node:test';
import assert from 'node:assert/strict';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token correctly when JWT_SECRET is set', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});

test('getJwtToken throws error when JWT_SECRET is not set', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      (err: Error) => err.message === 'Internal server error'
    );
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
