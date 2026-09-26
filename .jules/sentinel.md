## 2026-09-26 - Fixed Hardcoded Secrets
**Vulnerability:** Found hardcoded credentials (`STRIPE_SECRET_KEY` and `JWT_SECRET`) embedded directly in the source code (`src/auth.ts`).
**Learning:** Hardcoding secrets exposes sensitive keys in the codebase, leading to potential security breaches if the repository is compromised. Node.js environment variables (`process.env`) should be utilized for securely managing secrets.
**Prevention:** Rely on secure environment management configurations and validate required environment variables at runtime, intentionally failing fast if missing, to avoid silent insecure fallback behaviors.
