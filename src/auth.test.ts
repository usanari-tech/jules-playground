import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token using environment variable', (t) => {
  const originalSecret = process.env.JWT_SECRET;

  try {
    process.env.JWT_SECRET = 'test-secret-env';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret-env');
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});

test('getJwtToken throws error if JWT_SECRET is not defined', (t) => {
  const originalSecret = process.env.JWT_SECRET;

  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      {
        name: 'Error',
        message: 'JWT_SECRET environment variable is not defined.',
      }
    );
  } finally {
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  }
});
