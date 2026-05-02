// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets (FIXED)
// ----------------------------------------------------

export function getJwtToken(userId: string) {
  const jwtSecret = process.env.JWT_SECRET;

  // SECURE: Fail fast if environment variable is missing
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is missing");
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
