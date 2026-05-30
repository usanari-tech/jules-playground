import test from 'node:test';
import assert from 'node:assert';
import { getStripeSecretKey, getJwtSecret, getJwtToken } from './auth.ts';

test('auth environment variables', async (t) => {
  await t.test('getStripeSecretKey throws when missing', () => {
    delete process.env.STRIPE_SECRET_KEY;
    assert.throws(getStripeSecretKey, /Missing STRIPE_SECRET_KEY environment variable/);
  });

  await t.test('getJwtSecret throws when missing', () => {
    delete process.env.JWT_SECRET;
    assert.throws(getJwtSecret, /Missing JWT_SECRET environment variable/);
  });

  await t.test('getJwtToken returns token when secret is set', () => {
    process.env.JWT_SECRET = 'mock-secret';
    assert.strictEqual(getJwtToken("user123"), "user123-mock-secret");
    delete process.env.JWT_SECRET;
  });
});
