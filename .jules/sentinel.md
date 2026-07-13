## 2024-05-24 - Hardcoded Secrets Removed
**Vulnerability:** Found hardcoded `JWT_SECRET` and `STRIPE_SECRET_KEY` in `src/auth.ts`.
**Learning:** These constants would allow attackers who gain access to the source code to forge JWT tokens and potentially access the connected Stripe account.
**Prevention:** Use `process.env` to inject secrets at runtime and never commit them to the repository. Introduce a fail-fast mechanism to avoid silent failures if variables are missing.
