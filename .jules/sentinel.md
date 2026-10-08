## 2026-10-08 - Replaced Hardcoded Secrets
**Vulnerability:** Found hardcoded sensitive keys (e.g. STRIPE_SECRET_KEY, JWT_SECRET) embedded in the source code.
**Learning:** Source code repository should not contain hardcoded secrets to prevent leakage and unauthorized access.
**Prevention:** Utilize `.env` variables (e.g. `process.env.SECRET_KEY`) for secure dynamic configurations and validate them before initialization.
