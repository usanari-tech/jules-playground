## 2026-10-01 - Fixed Hardcoded Secrets
**Vulnerability:** Hardcoded STRIPE_SECRET_KEY and JWT_SECRET in source code.
**Learning:** Secrets were directly embedded in source code, making them easily extractable and a major security risk.
**Prevention:** Always use environment variables (e.g. process.env.SECRET) and add runtime validation to ensure they are defined before usage.
