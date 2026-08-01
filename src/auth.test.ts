import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

declare var process: any;

test('getJwtToken generates token using JWT_SECRET', () => {
  const originalSecret = process.env.JWT_SECRET;

  try {
    process.env.JWT_SECRET = 'test-secret-value';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret-value');
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});

test('getJwtToken throws Error if JWT_SECRET is missing', () => {
  const originalSecret = process.env.JWT_SECRET;

  try {
    delete process.env.JWT_SECRET;

    assert.throws(
      () => getJwtToken('user123'),
      {
        message: 'JWT_SECRET environment variable is missing'
      }
    );
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
