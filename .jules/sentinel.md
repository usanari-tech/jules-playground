## 2026-07-04 - Removed Hardcoded Secrets
**Vulnerability:** Found hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` in `src/auth.ts`.
**Learning:** These variables exposed critical credentials in the source code.
**Prevention:** Ensured secrets are dynamically loaded from `process.env` and implemented fail-fast mechanisms throwing errors if missing.
