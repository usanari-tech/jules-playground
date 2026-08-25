## 2026-08-25 - Prevent Hardcoded Secrets in Source Code
**Vulnerability:** Hardcoded sensitive credentials (STRIPE_SECRET_KEY, JWT_SECRET) were found directly in the source code.
**Learning:** Source code is often stored in version control systems and distributed across environments. Embedding secrets directly exposes them to anyone with read access to the repository.
**Prevention:** Always load sensitive credentials dynamically at runtime using environment variables (e.g., `process.env`) and implement runtime validation to ensure they are present before proceeding with sensitive operations.
