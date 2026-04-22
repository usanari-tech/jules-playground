## 2024-04-22 - [CRITICAL] Fixed Hardcoded Secrets in auth.ts
**Vulnerability:** Found hardcoded secrets (`JWT_SECRET` and `STRIPE_SECRET_KEY`) embedded directly in `src/auth.ts`, exposing them to version control.
**Learning:** Required secrets should never be hardcoded or initialized with default values in production code. A secure fallback or fail-fast approach is needed.
**Prevention:** Always read secrets dynamically using `process.env`. If a required secret is missing during runtime, immediately throw an error rather than allowing the application to proceed insecurely.
