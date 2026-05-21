import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken, getStripeSecretKey } from './auth.ts';

test('getJwtToken fails when JWT_SECRET is missing', (t) => {
  const originalJwt = process.env.JWT_SECRET;
  if (originalJwt === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    delete process.env.JWT_SECRET;
  }

  assert.throws(() => getJwtToken('user'), /JWT_SECRET environment variable is missing/);

  if (originalJwt !== undefined) {
    process.env.JWT_SECRET = originalJwt;
  }
});

test('getJwtToken returns token when JWT_SECRET is present', (t) => {
  const originalJwt = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'test-sec';

  assert.strictEqual(getJwtToken('user'), 'user-test-sec');

  if (originalJwt === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalJwt;
  }
});

test('getStripeSecretKey fails when STRIPE_SECRET_KEY is missing', (t) => {
  const originalStripe = process.env.STRIPE_SECRET_KEY;
  if (originalStripe === undefined) {
    delete process.env.STRIPE_SECRET_KEY;
  } else {
    delete process.env.STRIPE_SECRET_KEY;
  }

  assert.throws(() => getStripeSecretKey(), /STRIPE_SECRET_KEY environment variable is missing/);

  if (originalStripe !== undefined) {
    process.env.STRIPE_SECRET_KEY = originalStripe;
  }
});

test('getStripeSecretKey returns key when STRIPE_SECRET_KEY is present', (t) => {
  const originalStripe = process.env.STRIPE_SECRET_KEY;
  process.env.STRIPE_SECRET_KEY = 'stripe-sec';

  assert.strictEqual(getStripeSecretKey(), 'stripe-sec');

  if (originalStripe === undefined) {
    delete process.env.STRIPE_SECRET_KEY;
  } else {
    process.env.STRIPE_SECRET_KEY = originalStripe;
  }
});
