import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken fails when JWT_SECRET is missing', () => {
  // Ensure the variable is deleted
  const originalSecret = process.env.JWT_SECRET;
  delete process.env.JWT_SECRET;

  try {
    assert.throws(() => getJwtToken('user123'), {
      message: 'JWT_SECRET environment variable is missing'
    });
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    } else {
      delete process.env.JWT_SECRET;
    }
  }
});

test('getJwtToken returns token when JWT_SECRET is present', () => {
  const originalSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'test-secret-key';

  try {
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret-key');
  } finally {
    if (originalSecret !== undefined) {
      process.env.JWT_SECRET = originalSecret;
    } else {
      delete process.env.JWT_SECRET;
    }
  }
});
