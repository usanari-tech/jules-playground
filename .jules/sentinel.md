## 2024-05-24 - Hardcoded Secrets in Source Code
**Vulnerability:** Found hardcoded secrets (`JWT_SECRET` and `STRIPE_SECRET_KEY`) directly embedded within `src/auth.ts`, exposing them to version control.
**Learning:** Even placeholder or dummy secrets should not be hardcoded, as this establishes an insecure pattern that might be copied to production logic. It bypasses environment configuration management.
**Prevention:** Always read sensitive configurations from environment variables (`process.env`) and implement a fail-fast mechanism (e.g., throwing an `Error`) if required variables are missing at runtime to prevent silent failures with undefined behavior.
