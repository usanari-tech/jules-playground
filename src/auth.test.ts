import { test } from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates correct token when JWT_SECRET is set', (t) => {
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

test('getJwtToken throws error when JWT_SECRET is not set', (t) => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(() => getJwtToken('user123'), {
      message: 'JWT_SECRET environment variable is missing.'
    });
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
