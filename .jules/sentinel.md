## 2026-07-26 - [Remove Hardcoded Secrets]
**Vulnerability:** Found hardcoded `JWT_SECRET` in `src/auth.ts`.
**Learning:** Secrets should be managed securely via environment variables to prevent accidental exposure.
**Prevention:** Ensure `process.env` is strictly used for sensitive data and fail-fast validation is applied if variables are missing.
