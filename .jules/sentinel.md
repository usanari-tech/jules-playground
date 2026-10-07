## 2026-10-07 - Hardcoded Secrets
**Vulnerability:** Hardcoded API keys (STRIPE_SECRET_KEY, JWT_SECRET) in source code.
**Learning:** The project pattern previously committed secrets directly into auth.ts.
**Prevention:** Replaced hardcoded strings with environment variables (process.env) and added a runtime validation check.
