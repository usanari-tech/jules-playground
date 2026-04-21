## 2024-05-24 - Hardcoded Secrets in Authentication Flow
**Vulnerability:** Found hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` in `src/auth.ts`, exposing them directly in the source code.
**Learning:** Secrets embedded in source code can easily be committed to version control and compromised.
**Prevention:** Use environment variables (e.g. `process.env.SECRET_NAME`) and implement fail-fast mechanisms to throw an Error at runtime if required environment variables are missing, instead of proceeding insecurely.
