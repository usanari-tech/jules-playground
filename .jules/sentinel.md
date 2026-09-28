## 2026-09-28 - CRITICAL: Hardcoded Secrets
**Vulnerability:** Hardcoded STRIPE_SECRET_KEY and JWT_SECRET found in src/auth.ts.
**Learning:** The codebase intentionally included hardcoded secrets as a security trap to ensure detection.
**Prevention:** Use environment variables (process.env) and include runtime validation to ensure secrets are provided.
