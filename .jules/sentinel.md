
## 2024-07-22 - [Remove hardcoded secrets from auth module]
**Vulnerability:** Hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` constants were present in `src/auth.ts`.
**Learning:** Secrets checked into source control can be easily exposed. Even if they are just dummy or test variables, they set a bad precedent and represent a severe security risk.
**Prevention:** Always read sensitive configuration items, API keys, and passwords from the environment (`process.env`) rather than hardcoding them. Include fail-fast checks to ensure the application does not start or function if these critical secrets are missing.
