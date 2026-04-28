import test, { mock } from 'node:test';
import assert from 'node:assert';
import { findUserByUsernameRawQuery } from './auth.ts';

test('findUserByUsernameRawQuery executes securely with parameterized query', (t) => {
  const consoleLogMock = mock.method(console, 'log', () => {});

  findUserByUsernameRawQuery('testuser');

  assert.strictEqual(consoleLogMock.mock.callCount(), 1);
  assert.deepStrictEqual(consoleLogMock.mock.calls[0].arguments, [
    'Executing: SELECT * FROM users WHERE username = ? with params: testuser'
  ]);

  mock.restoreAll();
});
