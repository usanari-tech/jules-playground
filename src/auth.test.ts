import test from 'node:test';
import assert from 'node:assert';

test('auth module throws if secrets are missing', async () => {
  // Save original env vars
  const originalStripeSecret = process.env.STRIPE_SECRET_KEY;
  const originalJwtSecret = process.env.JWT_SECRET;

  try {
    // Delete env vars for the test
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.JWT_SECRET;

    // Use dynamic import and cache busting to ensure fresh evaluation
    await assert.rejects(
      async () => await import(`./auth.ts?t=${Date.now()}`),
      (err: Error) => {
        assert.strictEqual(err.message, "Required security configuration is missing.");
        return true;
      }
    );
  } finally {
    // Restore env vars
    if (originalStripeSecret !== undefined) process.env.STRIPE_SECRET_KEY = originalStripeSecret;
    if (originalJwtSecret !== undefined) process.env.JWT_SECRET = originalJwtSecret;
  }
});

test('auth module loads successfully if secrets are present', async () => {
    // Save original env vars
    const originalStripeSecret = process.env.STRIPE_SECRET_KEY;
    const originalJwtSecret = process.env.JWT_SECRET;

    try {
      // Set env vars for the test
      process.env.STRIPE_SECRET_KEY = 'test_stripe_secret';
      process.env.JWT_SECRET = 'test_jwt_secret';

      // Use dynamic import and cache busting to ensure fresh evaluation
      const auth = await import(`./auth.ts?t=${Date.now()}`);

      // Basic verification that we can call a function from the module
      const token = auth.getJwtToken('user123');
      assert.strictEqual(token, 'user123-test_jwt_secret');

    } finally {
      // Restore env vars
      if (originalStripeSecret !== undefined) {
          process.env.STRIPE_SECRET_KEY = originalStripeSecret;
      } else {
          delete process.env.STRIPE_SECRET_KEY;
      }

      if (originalJwtSecret !== undefined) {
          process.env.JWT_SECRET = originalJwtSecret;
      } else {
          delete process.env.JWT_SECRET;
      }
    }
  });