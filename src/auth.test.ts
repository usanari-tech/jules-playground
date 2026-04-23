import { test, describe, afterEach } from 'node:test';
import assert from 'node:assert';
import { getJwtToken, getStripeSecretKey } from './auth.ts';

describe('auth.ts security fixes', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  test('getJwtToken should return token when JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  });

  test('getJwtToken should throw an error when JWT_SECRET is missing', () => {
    delete process.env.JWT_SECRET;
    assert.throws(() => getJwtToken('user123'), /Missing required environment variable: JWT_SECRET/);
  });

  test('getStripeSecretKey should return key when STRIPE_SECRET_KEY is set', () => {
    process.env.STRIPE_SECRET_KEY = 'test-stripe-key';
    const key = getStripeSecretKey();
    assert.strictEqual(key, 'test-stripe-key');
  });

  test('getStripeSecretKey should throw an error when STRIPE_SECRET_KEY is missing', () => {
    delete process.env.STRIPE_SECRET_KEY;
    assert.throws(() => getStripeSecretKey(), /Missing required environment variable: STRIPE_SECRET_KEY/);
  });
});
