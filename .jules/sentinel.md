## 2024-05-24 - [TRAP 3: Security] Hardcoded secrets
**Vulnerability:** Hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` found in `src/auth.ts`.
**Learning:** Found explicit hardcoded secrets as string constants inside source files, which are a major risk of leakage and unauthorized access if source code is exposed.
**Prevention:** Replaced hardcoded string constants with `process.env.VARIABLE_NAME`. Added a runtime validation check in functions like `getJwtToken` that ensures the required environment variables (e.g. `JWT_SECRET`) are present and throws an error if not to fail securely.
