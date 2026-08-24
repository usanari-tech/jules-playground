## 2025-02-28 - Hardcoded Secrets Removed
**Vulnerability:** Hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` found in `src/auth.ts`
**Learning:** Hardcoding secrets exposes them in source control, which is a critical risk.
**Prevention:** Always use environment variables for sensitive keys and provide runtime validation.
