## 2025-02-27 - Hardcoded Secrets in Config
**Vulnerability:** Found hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` in `src/auth.ts`.
**Learning:** Development environments often leave dummy secrets in source control which can leak into production or expose internal structures.
**Prevention:** Always use `process.env` and validate presence of critical secrets during initialization.
