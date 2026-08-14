## 2024-05-18 - Hardcoded API Keys and Secrets
**Vulnerability:** Critical secrets (STRIPE_SECRET_KEY and JWT_SECRET) were hardcoded directly in the source code.
**Learning:** Storing secrets in source code can expose them via source control, presenting a critical security risk.
**Prevention:** Always use environment variables (`process.env`) to load sensitive configuration at runtime. Avoid committing secrets to version control.
