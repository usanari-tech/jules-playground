
## 2024-05-04 - Fail-fast pattern for secrets
**Vulnerability:** Hardcoded API keys (STRIPE_SECRET_KEY, JWT_SECRET) were present in the source code, exposing sensitive data to version control and anyone with access to the repository.
**Learning:** Security fixes for hardcoded secrets must implement a fail-fast mechanism (e.g., throwing an Error) if required environment variables are missing at runtime to ensure the application doesn't boot in an insecure or broken state. Testing modules that perform top-level fail-fast environment variable validation requires dynamic `import()` within test cases to prevent ESM hoisting issues.
**Prevention:** Use `process.env` for all sensitive configuration and enforce their presence during application startup or module initialization. Avoid hardcoding any secrets in the codebase.
