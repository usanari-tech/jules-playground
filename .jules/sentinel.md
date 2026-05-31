## 2024-05-24 - Hardcoded Secrets in Config
**Vulnerability:** Hardcoded API keys (STRIPE_SECRET_KEY, JWT_SECRET) were found directly in the source code of `src/auth.ts`.
**Learning:** Storing secrets in source control exposes them to anyone with repository access. Even if it's a test or dummy key, the pattern is dangerous. It's critical to enforce dynamic secret loading via environment variables.
**Prevention:** Implement a fail-fast mechanism (e.g., throwing an error) if required environment variables are missing at runtime. Never hardcode secrets in source code.
