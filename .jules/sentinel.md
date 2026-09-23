## 2026-09-23 - Fixed Hardcoded Secrets
**Vulnerability:** Hardcoded STRIPE_SECRET_KEY and JWT_SECRET in src/auth.ts.
**Learning:** The application was exposing sensitive secrets directly in the source code, which could be easily extracted by anyone with access to the repository.
**Prevention:** Use environment variables (e.g., process.env.SECRET) and add runtime validation to ensure they are present.
