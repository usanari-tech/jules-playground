import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken returns a correct token when JWT_SECRET is set', async (t) => {
  const originalSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'mock-secret-key';

  try {
    const token = getJwtToken('user-123');
    assert.strictEqual(token, 'user-123-mock-secret-key');
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});

test('getJwtToken throws when JWT_SECRET is missing', async (t) => {
  const originalSecret = process.env.JWT_SECRET;
  delete process.env.JWT_SECRET;

  try {
    assert.throws(
      () => {
        getJwtToken('user-123');
      },
      (err: Error) => err.message === 'JWT_SECRET environment variable is missing'
    );
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
