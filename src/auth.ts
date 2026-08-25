// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------
// @ts-ignore
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
// @ts-ignore
const JWT_SECRET = process.env.JWT_SECRET;

export function getJwtToken(userId: string) {
  // Security Fix: Prevent usage of hardcoded secrets
  // Secrets should always be loaded via environment variables to avoid exposing them in version control.
  if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable for security reasons');
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
