## 2026-06-09 - Remove Hardcoded Secrets
**Vulnerability:** Found hardcoded global constants (STRIPE_SECRET_KEY, JWT_SECRET) in src/auth.ts, which could expose sensitive tokens in source control.
**Learning:** Security logic must avoid static top-level secrets. Fail-fast error throwing on missing environment variables must be tested correctly using process.env mocking.
**Prevention:** Always read environment variables dynamically when generating tokens (e.g. process.env.JWT_SECRET) and throw errors if missing.
