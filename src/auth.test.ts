import test, { describe } from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

describe('Authentication Module Security Fixes', () => {
  test('getJwtToken should dynamically read JWT_SECRET and generate token', () => {
    // Setup environment
    const originalSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test-dynamic-secret-555';

    try {
      const token = getJwtToken('user-123');
      assert.strictEqual(token, 'user-123-test-dynamic-secret-555');
    } finally {
      // Teardown
      if (originalSecret === undefined) {
        delete process.env.JWT_SECRET;
      } else {
        process.env.JWT_SECRET = originalSecret;
      }
    }
  });

  test('getJwtToken should throw an Error if JWT_SECRET is missing', () => {
    // Setup environment
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    try {
      assert.throws(
        () => getJwtToken('user-123'),
        (err) => err instanceof Error && err.message === 'JWT_SECRET environment variable is missing.'
      );
    } finally {
      // Teardown
      if (originalSecret !== undefined) {
        process.env.JWT_SECRET = originalSecret;
      }
    }
  });
});
