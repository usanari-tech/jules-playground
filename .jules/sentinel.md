## 2026-09-27 - Replaced Hardcoded Secrets with Environment Variables
**Vulnerability:** Found hardcoded secrets (`STRIPE_SECRET_KEY` and `JWT_SECRET`) in `src/auth.ts`.
**Learning:** The application was directly exposing sensitive keys in the source code, which is a critical security risk.
**Prevention:** Utilize environment variables (`process.env.VAR_NAME`) for all sensitive configuration and secrets, and implement fail-secure runtime validation to ensure they are present.
