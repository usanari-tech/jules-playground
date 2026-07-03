import test from 'node:test';
import assert from 'node:assert';
import { getJwtToken } from './auth.ts';

test('getJwtToken generates token correctly with JWT_SECRET', () => {
  try {
    process.env.JWT_SECRET = 'test-secret';
    const token = getJwtToken('user123');
    assert.strictEqual(token, 'user123-test-secret');
  } finally {
    delete process.env.JWT_SECRET;
  }
});

test('getJwtToken throws error if JWT_SECRET is missing', () => {
  try {
    delete process.env.JWT_SECRET;
    assert.throws(
      () => getJwtToken('user123'),
      {
        name: 'Error',
        message: 'Missing JWT_SECRET environment variable'
      }
    );
  } finally {
    delete process.env.JWT_SECRET;
  }
});
