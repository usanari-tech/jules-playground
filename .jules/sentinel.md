## 2024-05-24 - Hardcoded Secrets Removed
**Vulnerability:** Hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` found in `src/auth.ts`.
**Learning:** Found explicit traps for hardcoded secrets, fixed using environment variables and failing securely.
**Prevention:** Use `.env` files or environment variables and add runtime validation to ensure secrets are defined.
