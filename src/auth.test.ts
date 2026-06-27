import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken returns token when process.env.JWT_SECRET is set', (t) => {
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

test('getJwtToken throws when process.env.JWT_SECRET is missing', (t) => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      /Internal Server Configuration Error/
    );
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
