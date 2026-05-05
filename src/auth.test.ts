import test from 'node:test';
import assert from 'node:assert';

test('auth module missing STRIPE_SECRET_KEY throws Error', async () => {
  const originalStripe = process.env.STRIPE_SECRET_KEY;
  const originalJwt = process.env.JWT_SECRET;

  delete process.env.STRIPE_SECRET_KEY;
  delete process.env.JWT_SECRET;

  await assert.rejects(async () => {
    await import(`./auth.ts?t=${Date.now()}`);
  }, /Missing STRIPE_SECRET_KEY environment variable/);

  if (originalStripe === undefined) {
    delete process.env.STRIPE_SECRET_KEY;
  } else {
    process.env.STRIPE_SECRET_KEY = originalStripe;
  }
  if (originalJwt === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalJwt;
  }
});

test('auth module missing JWT_SECRET throws Error', async () => {
  const originalStripe = process.env.STRIPE_SECRET_KEY;
  const originalJwt = process.env.JWT_SECRET;

  process.env.STRIPE_SECRET_KEY = "test_stripe";
  delete process.env.JWT_SECRET;

  await assert.rejects(async () => {
    await import(`./auth.ts?t=${Date.now()}`);
  }, /Missing JWT_SECRET environment variable/);

  if (originalStripe === undefined) {
    delete process.env.STRIPE_SECRET_KEY;
  } else {
    process.env.STRIPE_SECRET_KEY = originalStripe;
  }
  if (originalJwt === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalJwt;
  }
});

test('auth module successfully generates JWT token with valid env vars', async () => {
  const originalStripe = process.env.STRIPE_SECRET_KEY;
  const originalJwt = process.env.JWT_SECRET;

  process.env.STRIPE_SECRET_KEY = "test_stripe";
  process.env.JWT_SECRET = "test_jwt";

  const auth = await import(`./auth.ts?t=${Date.now()}`);
  assert.strictEqual(auth.getJwtToken("user1"), "user1-test_jwt");

  if (originalStripe === undefined) {
    delete process.env.STRIPE_SECRET_KEY;
  } else {
    process.env.STRIPE_SECRET_KEY = originalStripe;
  }
  if (originalJwt === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = originalJwt;
  }
});
