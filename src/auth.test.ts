import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken, getStripeSecretKey } from './auth.ts';

test('auth module', async (t) => {
  let originalJwtSecret: string | undefined;
  let originalStripeSecret: string | undefined;

  t.beforeEach(() => {
    originalJwtSecret = process.env.JWT_SECRET;
    originalStripeSecret = process.env.STRIPE_SECRET_KEY;
  });

  t.afterEach(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }

    if (originalStripeSecret === undefined) {
      delete process.env.STRIPE_SECRET_KEY;
    } else {
      process.env.STRIPE_SECRET_KEY = originalStripeSecret;
    }
  });

  await t.test('getJwtToken throws if JWT_SECRET is not set', () => {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user-123'),
      /JWT_SECRET environment variable is missing/
    );
  });

  await t.test('getJwtToken returns token if JWT_SECRET is set', () => {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user-123');
    assert.strictEqual(token, 'user-123-test-secret');
  });

  await t.test('getStripeSecretKey throws if STRIPE_SECRET_KEY is not set', () => {
    delete process.env.STRIPE_SECRET_KEY;
    assert.throws(
      () => getStripeSecretKey(),
      /STRIPE_SECRET_KEY environment variable is missing/
    );
  });

  await t.test('getStripeSecretKey returns key if STRIPE_SECRET_KEY is set', () => {
    process.env.STRIPE_SECRET_KEY = 'stripe-secret';
    const key = getStripeSecretKey();
    assert.strictEqual(key, 'stripe-secret');
  });
});
