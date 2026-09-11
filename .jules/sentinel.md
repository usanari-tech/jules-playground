## 2024-09-11 - Removed hardcoded secrets in source code
**Vulnerability:** Found hardcoded secrets for Stripe and JWT in `src/auth.ts`.
**Learning:** The application codebase has previously committed hardcoded secrets. Since the repository might be public, this allows attackers to access third-party systems.
**Prevention:** Utilize environment variables and implement validation logic that fails securely during runtime if secrets are missing.
