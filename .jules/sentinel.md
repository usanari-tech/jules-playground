## 2026-08-29 - Hardcoded Secrets Found
**Vulnerability:** Hardcoded API keys (STRIPE_SECRET_KEY, JWT_SECRET) were present in the source code.
**Learning:** The codebase lacked a proper configuration system for secrets, leading to them being hardcoded.
**Prevention:** Use environment variables for all secrets and fail securely at runtime if they are missing.
