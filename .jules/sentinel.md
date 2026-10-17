## 2026-10-17 - Fixed Hardcoded Secrets in auth.ts
**Vulnerability:** Hardcoded STRIPE_SECRET_KEY and JWT_SECRET were present in the source code.
**Learning:** This repo intentionally includes a trap to test agent detection. Leaving secrets in plain text can lead to full system compromise if the repository is leaked or accessed by unauthorized individuals.
**Prevention:** Use environment variables (process.env) combined with robust runtime validation.
