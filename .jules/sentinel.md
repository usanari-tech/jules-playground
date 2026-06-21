## 2024-05-24 - [Fix Hardcoded Secrets]
**Vulnerability:** Hardcoded API keys and secrets (`STRIPE_SECRET_KEY` and `JWT_SECRET`) found in `src/auth.ts`.
**Learning:** Hardcoding secrets exposes them in source control, leading to potential unauthorized access.
**Prevention:** Never hardcode secrets. Always use environment variables (e.g., `process.env.JWT_SECRET`) and implement fail-fast mechanisms throwing a generic error if they are missing at runtime.
