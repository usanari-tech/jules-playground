## 2026-10-21 - Fixed Hardcoded Secrets
**Vulnerability:** Hardcoded secrets (`STRIPE_SECRET_KEY` and `JWT_SECRET`) were found directly in `src/auth.ts`.
**Learning:** This exposes sensitive data if the repository is ever made public or accessed by unauthorized users.
**Prevention:** Always use environment variables (e.g., `process.env.SECRET`) and never commit secrets to the codebase.
