// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------
export function getJwtToken(userId: string) {
  // [SECURE] Read from environment, don't hardcode
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Fail securely without exposing internal state
    throw new Error("Authentication configuration is missing.");
  }
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
