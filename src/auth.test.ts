import { test, describe, beforeEach, afterEach } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken } from './auth.ts';

describe('auth tests', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  test('getJwtToken returns correct token when JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  });

  test('getJwtToken throws secure error when JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;

    assert.throws(
      () => getJwtToken('user123'),
      (err: Error) => {
        assert.strictEqual(err.message, 'Authentication configuration error.');
        return true;
      }
    );
  });
});
