import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

describe('auth module', () => {
  describe('getJwtToken', () => {
    it('throws an error if JWT_SECRET is not set', () => {
      // Temporarily remove JWT_SECRET
      const originalSecret = process.env.JWT_SECRET;
      delete process.env.JWT_SECRET;

      try {
        assert.throws(
          () => getJwtToken('user-123'),
          { message: 'Server configuration error: Authentication failed' }
        );
      } finally {
        // Restore
        if (originalSecret !== undefined) {
          process.env.JWT_SECRET = originalSecret;
        }
      }
    });

    it('returns a token when JWT_SECRET is set', () => {
      const originalSecret = process.env.JWT_SECRET;
      process.env.JWT_SECRET = 'test-secret';

      try {
        const token = getJwtToken('user-123');
        assert.strictEqual(token, 'user-123-test-secret');
      } finally {
        if (originalSecret !== undefined) {
          process.env.JWT_SECRET = originalSecret;
        } else {
          delete process.env.JWT_SECRET;
        }
      }
    });
  });
});
