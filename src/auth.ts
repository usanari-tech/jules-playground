// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets - FIXED
// Moved to environment variables for secure management.
// ----------------------------------------------------
export function getJwtToken(userId: string) {
  // Security Enhancement: Read secret dynamically from environment
  // and fail securely if missing to avoid exposing sensitive info.
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Authentication configuration error');
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
