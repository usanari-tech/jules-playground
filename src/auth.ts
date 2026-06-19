// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// Security Fix: Removed hardcoded secrets to prevent leakage.
// Using environment variables for sensitive data.
// ----------------------------------------------------

export function getJwtToken(userId: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Internal Configuration Error');
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
