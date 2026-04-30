import { describe, it, afterEach } from 'node:test';
import { strictEqual, throws } from 'node:assert';
import { getJwtToken } from './auth.ts';

describe('auth.ts', () => {
  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  describe('getJwtToken', () => {
    it('should throw an Error if JWT_SECRET is not set', () => {
      delete process.env.JWT_SECRET;
      throws(() => {
        getJwtToken('user1');
      }, /Missing JWT_SECRET environment variable/);
    });

    it('should return a token if JWT_SECRET is set', () => {
      process.env.JWT_SECRET = 'test-secret';
      const token = getJwtToken('user1');
      strictEqual(token, 'user1-test-secret');
    });
  });
});
