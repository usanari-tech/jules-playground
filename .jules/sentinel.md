## 2026-08-11 - Prevent Hardcoded Secrets
**Vulnerability:** Found hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` directly in `src/auth.ts`.
**Learning:** This exposes sensitive credentials which could be accidentally checked into version control. It appears this repo had these intentionally placed as a TRAP, but the pattern highlights a need to carefully manage secrets in code.
**Prevention:** Use `process.env` variables instead of hardcoded strings for all sensitive keys and credentials, and include runtime validation to ensure they exist.
