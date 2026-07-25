## 2025-07-25 - Prevented Hardcoded Secrets & Environment Variable Pollution
**Vulnerability:** Hardcoded API keys and secrets (e.g., `STRIPE_SECRET_KEY`, `JWT_SECRET`) embedded directly in the codebase.
**Learning:** Hardcoded secrets in version control systems risk exposure. Additionally, when testing secure fail-fast mechanisms that rely on environment variables, tests must use try-finally blocks to clean up `process.env` reliably to avoid polluting the test environment for subsequent test cases.
**Prevention:** Use environment variables (e.g., `process.env.JWT_SECRET`) for secrets with runtime fail-fast logic (throwing errors if missing). In automated tests, carefully manage `process.env` state and properly clean up using `delete` for originally undefined variables.
