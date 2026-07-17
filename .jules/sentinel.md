## 2026-07-17 - [Remove hardcoded secrets]
**Vulnerability:** Hardcoded API secrets in src/auth.ts (STRIPE_SECRET_KEY, JWT_SECRET) which could be leaked if the repository is public or accessed by unauthorized individuals.
**Learning:** Hardcoded secrets were present directly in the source code as top-level constants.
**Prevention:** Always use environment variables for secrets and implement a fail-fast mechanism to catch missing secrets early at runtime.
