## 2024-05-15 - Hardcoded Secrets in Config
**Vulnerability:** Critical hardcoded secrets (JWT_SECRET, STRIPE_SECRET_KEY) found in src/auth.ts.
**Learning:** Hardcoded credentials are a common pattern in initial development but pose severe security risks if committed to version control.
**Prevention:** Always read sensitive configuration dynamically via environment variables (e.g., process.env) and fail securely if missing. Add tests to enforce this configuration loading.
