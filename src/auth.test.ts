import { test } from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken throws when JWT_SECRET is missing', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      { message: 'Missing JWT_SECRET environment variable' }
    );
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});

test('getJwtToken returns token when JWT_SECRET is set', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    assert.strictEqual(getJwtToken('user123'), 'user123-test-secret');
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
