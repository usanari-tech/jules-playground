import { test } from 'node:test';
import * as assert from 'node:assert';
import { getJwtToken, getStripeSecretKey } from './auth.ts';

test('auth secrets management', async (t) => {
  const originalJwt = process.env.JWT_SECRET;
  const originalStripe = process.env.STRIPE_SECRET_KEY;

  t.after(() => {
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

  await t.test('getJwtToken returns correct token when JWT_SECRET is set', async () => {
    process.env.JWT_SECRET = 'test-secret';
    assert.strictEqual(getJwtToken('user-1'), 'user-1-test-secret');
  });

  await t.test('getJwtToken throws when JWT_SECRET is missing', async () => {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user-1'),
      /JWT_SECRET is not configured in the environment/
    );
  });

  await t.test('getStripeSecretKey returns correct key when STRIPE_SECRET_KEY is set', async () => {
    process.env.STRIPE_SECRET_KEY = 'stripe-secret';
    assert.strictEqual(getStripeSecretKey(), 'stripe-secret');
  });

  await t.test('getStripeSecretKey throws when STRIPE_SECRET_KEY is missing', async () => {
    delete process.env.STRIPE_SECRET_KEY;
    assert.throws(
      () => getStripeSecretKey(),
      /STRIPE_SECRET_KEY is not configured in the environment/
    );
  });
});
