// ==========================================
// Jules Playground: Security Test
// ==========================================

// ----------------------------------------------------
// [TRAP 3: Security] Hardcoded secrets
// Jules security agent should quickly detect this and suggest using .env variables.
// ----------------------------------------------------
const STRIPE_SECRET_KEY = "sk_test_4eC39HqLyjWDarjtT1zdp7dc_DUMMY_SECRET";
const JWT_SECRET = "super-secret-key-12345";

export function getJwtToken(userId: string) {
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
    query: (q: string, params?: any[]) => { console.log(`Executing: ${q} with params:`, params); return []; }
  };

  // SECURE: Use parameterized query to prevent SQL injection
  const sql = "SELECT * FROM users WHERE username = ?";
  
  return dummyDbConnection.query(sql, [username]);
}

// TODO: implement proper secure authentication flow
