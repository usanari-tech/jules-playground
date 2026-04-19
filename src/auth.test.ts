import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token with secret from process.env', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user-123');
    assert.strictEqual(token, 'user-123-test-secret');
  } finally {
    process.env.JWT_SECRET = originalSecret;
  }
});

test('getJwtToken throws securely if secret is missing', () => {
  const originalSecret = process.env.JWT_SECRET;
  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user-123'),
      (err: Error) => err.message === 'Internal Server Error: Missing configuration',
      'Should throw generic error message to prevent leaking details'
    );
  } finally {
    process.env.JWT_SECRET = originalSecret;
  }
});
