import { test } from 'node:test';
import * as assert from 'node:assert';

test('getJwtToken returns the correct token when JWT_SECRET is set', async () => {
  // Save original environment variable
  const originalJwtSecret = process.env.JWT_SECRET;
  const isOriginalJwtSecretSet = 'JWT_SECRET' in process.env;

  try {
    process.env.JWT_SECRET = 'test-secret';
    // Dynamic import to avoid module evaluation issues before setting process.env
    const { getJwtToken } = await import('./auth.ts');

    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  } finally {
    // Restore original environment variable
    if (isOriginalJwtSecretSet) {
      process.env.JWT_SECRET = originalJwtSecret;
    } else {
      delete process.env.JWT_SECRET;
    }
  }
});

test('getJwtToken throws an error when JWT_SECRET is missing', async () => {
  // Save original environment variable
  const originalJwtSecret = process.env.JWT_SECRET;
  const isOriginalJwtSecretSet = 'JWT_SECRET' in process.env;

  try {
    delete process.env.JWT_SECRET;
    const { getJwtToken } = await import('./auth.ts');

    assert.throws(
      () => getJwtToken('user123'),
      {
        message: 'JWT_SECRET is not configured in the environment variables.'
      }
    );
  } finally {
    // Restore original environment variable
    if (isOriginalJwtSecretSet) {
      process.env.JWT_SECRET = originalJwtSecret;
    } else {
      delete process.env.JWT_SECRET;
    }
  }
});
