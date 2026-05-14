## 2024-10-24 - [Hardcoded Secrets Removed]
**Vulnerability:** Hardcoded API keys and secrets (`STRIPE_SECRET_KEY` and `JWT_SECRET`) were stored directly in `src/auth.ts`, exposing them to source control.
**Learning:** Checking in hardcoded secrets into version control compromises the security of the application.
**Prevention:** Always use environment variables (e.g., `process.env.JWT_SECRET`) to load secrets dynamically at runtime, and implement fail-fast mechanisms to throw an error if required secrets are missing to prevent insecure defaults.
