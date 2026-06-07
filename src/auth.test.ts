import test from 'node:test';
import assert from 'node:assert';
import { getStripeSecretKey, getJwtSecret, getJwtToken } from './auth.ts';

test('auth.ts security fixes', async (t) => {
  await t.test('getStripeSecretKey throws if STRIPE_SECRET_KEY is missing', () => {
    const original = process.env.STRIPE_SECRET_KEY;
    try {
      delete process.env.STRIPE_SECRET_KEY;
      assert.throws(() => getStripeSecretKey(), /Missing required environment variable: STRIPE_SECRET_KEY/);
    } finally {
      if (original === undefined) {
        delete process.env.STRIPE_SECRET_KEY;
      } else {
        process.env.STRIPE_SECRET_KEY = original;
      }
    }
  });

  await t.test('getStripeSecretKey returns secret if STRIPE_SECRET_KEY is set', () => {
    const original = process.env.STRIPE_SECRET_KEY;
    try {
      process.env.STRIPE_SECRET_KEY = 'test_stripe_secret';
      assert.strictEqual(getStripeSecretKey(), 'test_stripe_secret');
    } finally {
      if (original === undefined) {
        delete process.env.STRIPE_SECRET_KEY;
      } else {
        process.env.STRIPE_SECRET_KEY = original;
      }
    }
  });

  await t.test('getJwtSecret throws if JWT_SECRET is missing', () => {
    const original = process.env.JWT_SECRET;
    try {
      delete process.env.JWT_SECRET;
      assert.throws(() => getJwtSecret(), /Missing required environment variable: JWT_SECRET/);
    } finally {
      if (original === undefined) {
        delete process.env.JWT_SECRET;
      } else {
        process.env.JWT_SECRET = original;
      }
    }
  });

  await t.test('getJwtSecret returns secret if JWT_SECRET is set', () => {
    const original = process.env.JWT_SECRET;
    try {
      process.env.JWT_SECRET = 'test_jwt_secret';
      assert.strictEqual(getJwtSecret(), 'test_jwt_secret');
    } finally {
      if (original === undefined) {
        delete process.env.JWT_SECRET;
      } else {
        process.env.JWT_SECRET = original;
      }
    }
  });

  await t.test('getJwtToken generates token correctly when JWT_SECRET is set', () => {
    const original = process.env.JWT_SECRET;
    try {
      process.env.JWT_SECRET = 'test_jwt_secret';
      assert.strictEqual(getJwtToken('user123'), 'user123-test_jwt_secret');
    } finally {
      if (original === undefined) {
        delete process.env.JWT_SECRET;
      } else {
        process.env.JWT_SECRET = original;
      }
    }
  });
});
