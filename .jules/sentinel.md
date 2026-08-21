## 2026-08-21 - Hardcoded Secrets
**Vulnerability:** Hardcoded API keys (STRIPE_SECRET_KEY, JWT_SECRET) were found directly in the source code.
**Learning:** Hardcoded secrets are a critical security vulnerability as they expose sensitive information to anyone with access to the source code, potentially leading to unauthorized access and data breaches.
**Prevention:** Always use environment variables to manage and store sensitive information and secrets securely.
