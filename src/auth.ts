// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------
// SECURITY FIX: Removed hardcoded STRIPE_SECRET_KEY and JWT_SECRET.
// Secrets should be loaded from environment variables to prevent exposure in source control.

export function getJwtToken(userId: string) {
  // Read secret dynamically from environment variables
  const jwtSecret = process.env.JWT_SECRET;

  // Fail securely if the required environment variable is missing
  if (!jwtSecret) {
    throw new Error("Missing required configuration: JWT_SECRET environment variable is not set");
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
