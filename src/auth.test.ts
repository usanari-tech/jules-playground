import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken, getJwtSecret, getStripeSecretKey } from './auth.ts';

test('auth environment variables', async (t) => {
  const originalJwt = process.env.JWT_SECRET;
  const originalStripe = process.env.STRIPE_SECRET_KEY;

  t.afterEach(() => {
    if (originalJwt === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwt;
    }

    if (originalStripe === undefined) {
      delete process.env.STRIPE_SECRET_KEY;
    } else {
      process.env.STRIPE_SECRET_KEY = originalStripe;
    }
  });

  await t.test('getJwtSecret throws if env var is missing', () => {
    delete process.env.JWT_SECRET;
    assert.throws(() => getJwtSecret(), { message: 'Missing required environment variable: JWT_SECRET' });
  });

  await t.test('getJwtToken throws if env var is missing', () => {
    delete process.env.JWT_SECRET;
    assert.throws(() => getJwtToken('user123'), { message: 'Missing required environment variable: JWT_SECRET' });
  });

  await t.test('getJwtToken returns token when env var is set', () => {
    process.env.JWT_SECRET = 'my-test-secret';
    assert.strictEqual(getJwtToken('user123'), 'user123-my-test-secret');
  });

  await t.test('getStripeSecretKey throws if env var is missing', () => {
    delete process.env.STRIPE_SECRET_KEY;
    assert.throws(() => getStripeSecretKey(), { message: 'Missing required environment variable: STRIPE_SECRET_KEY' });
  });

  await t.test('getStripeSecretKey returns key when env var is set', () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    assert.strictEqual(getStripeSecretKey(), 'sk_test_123');
  });
});
