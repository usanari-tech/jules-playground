"use strict";
// ==========================================
// Jules Playground: Security Test
// ==========================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsernameRawQuery = exports.getJwtToken = void 0;
// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------
// @ts-ignore
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
// @ts-ignore
const JWT_SECRET = process.env.JWT_SECRET;
function getJwtToken(userId) {
    // Security concern: Ensure secrets are not hardcoded but loaded from the environment securely. Validate that the required environment variable is present to fail securely.
    if (!JWT_SECRET) {
        throw new Error('Missing JWT_SECRET environment variable');
    }
    // A dummy token generation
    return `${userId}-${JWT_SECRET}`;
}
exports.getJwtToken = getJwtToken;
// ----------------------------------------------------
// [TRAP 4: Security] SQL Injection vulnerability pattern
// Jules should detect this string concatenation and suggest parameterized queries.
// ----------------------------------------------------
function findUserByUsernameRawQuery(username) {
    // This is a fake database connection simulating a raw query that is vulnerable
    const dummyDbConnection = {
        query: (q) => { console.log(`Executing: ${q}`); return []; }
    };
    // VULNERABLE: Direct string concatenation
    const sql = "SELECT * FROM users WHERE username = '" + username + "'";
    return dummyDbConnection.query(sql);
}
exports.findUserByUsernameRawQuery = findUserByUsernameRawQuery;
// TODO: implement proper secure authentication flow
