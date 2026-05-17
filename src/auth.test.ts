import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken, getJwtSecret, getStripeSecretKey } from './auth.ts';

test('auth.ts secret functions', async (t) => {
  await t.test('returns values from process.env when set', () => {
    process.env.JWT_SECRET = 'test-secret';
    process.env.STRIPE_SECRET_KEY = 'test-stripe';

    assert.strictEqual(getJwtSecret(), 'test-secret');
    assert.strictEqual(getStripeSecretKey(), 'test-stripe');
    assert.strictEqual(getJwtToken('user'), 'user-test-secret');
  });

  await t.test('throws secure error when process.env is missing', () => {
    delete process.env.JWT_SECRET;
    delete process.env.STRIPE_SECRET_KEY;

    assert.throws(() => getJwtSecret(), { message: 'Missing required configuration' });
    assert.throws(() => getStripeSecretKey(), { message: 'Missing required configuration' });
    assert.throws(() => getJwtToken('user'), { message: 'Missing required configuration' });
  });
});
