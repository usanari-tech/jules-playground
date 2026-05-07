## 2024-05-07 - Hardcoded secrets removal
**Vulnerability:** A hardcoded `JWT_SECRET` was present in `src/auth.ts`, exposing a critical security key directly in the codebase.
**Learning:** Hardcoded secrets often slip into codebases during quick dummy implementations or testing phases. Failing to validate their presence using fail-fast strategies can result in silent security failures in production.
**Prevention:** Use `.env` variables injected at runtime, and implement a fail-fast mechanism (e.g., throwing an error) if the required environment variable is not present. Avoid committing sensitive test strings to source control.
