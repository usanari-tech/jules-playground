// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------
export function getJwtToken(userId: string) {
  // SECURITY CONCERN: Hardcoded secrets in code can be leaked through source control.
  // REASONING: Read sensitive configuration from environment variables dynamically.
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("Missing environment variable: JWT_SECRET");
  }

  // A dummy token generation
  return `${userId}-${jwtSecret}`;
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
