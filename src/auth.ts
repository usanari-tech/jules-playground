// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------

export function getJwtToken(userId: string) {
  // Security Fix: Do not hardcode secrets like STRIPE_SECRET_KEY or JWT_SECRET.
  // Use environment variables instead.
  // Fail fast and securely if the required environment variable is missing.
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Server configuration error');
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
