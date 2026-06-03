import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken, getStripeSecretKey } from './auth.ts';

test('getStripeSecretKey throws if STRIPE_SECRET_KEY is missing', () => {
    const orig = process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_SECRET_KEY;

    assert.throws(() => getStripeSecretKey(), /Missing STRIPE_SECRET_KEY environment variable/);

    if (orig !== undefined) process.env.STRIPE_SECRET_KEY = orig;
});

test('getStripeSecretKey returns key from process.env', () => {
    const orig = process.env.STRIPE_SECRET_KEY;
    process.env.STRIPE_SECRET_KEY = 'test_stripe_key';

    assert.strictEqual(getStripeSecretKey(), 'test_stripe_key');

    if (orig === undefined) {
        delete process.env.STRIPE_SECRET_KEY;
    } else {
        process.env.STRIPE_SECRET_KEY = orig;
    }
});

test('getJwtToken throws if JWT_SECRET is missing', () => {
    const orig = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    assert.throws(() => getJwtToken('user123'), /Missing JWT_SECRET environment variable/);

    if (orig !== undefined) process.env.JWT_SECRET = orig;
});

test('getJwtToken returns token combining userId and process.env.JWT_SECRET', () => {
    const orig = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'test_jwt_secret';

    assert.strictEqual(getJwtToken('user123'), 'user123-test_jwt_secret');

    if (orig === undefined) {
        delete process.env.JWT_SECRET;
    } else {
        process.env.JWT_SECRET = orig;
    }
});
