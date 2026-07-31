// ==========================================
// Jules Playground: Security Test
// ==========================================

declare var process: any;

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------
// SECURITY FIX: Removed hardcoded STRIPE_SECRET_KEY as it was unused and a security risk.
// SECURITY FIX: Removed hardcoded JWT_SECRET and replaced with environment variable for security.

export function getJwtToken(userId: string) {
  // Read environment variable dynamically for fail-fast configuration testing
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is missing');
  }

  // A dummy token generation
  return `${userId}-${secret}`;
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
