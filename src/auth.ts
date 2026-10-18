// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------
// Security: Load credentials from environment variables to prevent secret leakage
// @ts-ignore
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Security: Load credentials from environment variables to prevent secret leakage
// @ts-ignore
const JWT_SECRET = process.env.JWT_SECRET;

export function getJwtToken(userId: string) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  // A dummy token generation
  return `${userId}-${JWT_SECRET}`;
}

// ----------------------------------------------------
// [TRAP 4: Security] SQL Injection vulnerability pattern
// Jules should detect this string concatenation and suggest parameterized queries.
// ----------------------------------------------------
export function findUserByUsernameRawQuery(username: string) {
  // This is a fake database connection simulating a raw query that is vulnerable
  const dummyDbConnection = {
    query: (q: string) => { console.log(`Executing: ${q}`); return []; }
  };

  // VULNERABLE: Direct string concatenation
  const sql = "SELECT * FROM users WHERE username = '" + username + "'";
  
  return dummyDbConnection.query(sql);
}

// TODO: implement proper secure authentication flow
