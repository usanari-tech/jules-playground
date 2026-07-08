## 2024-07-08 - Fixed Hardcoded Secrets in auth.ts
**Vulnerability:** Hardcoded API keys and secrets were found directly embedded in `src/auth.ts` (`STRIPE_SECRET_KEY` and `JWT_SECRET`).
**Learning:** Storing secrets in source code easily exposes them if code is shared, leaked, or committed to version control.
**Prevention:** Use environment variables (like `process.env`) to securely provide configuration secrets at runtime, and implement fail-fast mechanisms to catch misconfigurations.
