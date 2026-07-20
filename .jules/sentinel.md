## 2025-02-20 - Hardcoded Secrets Removed
**Vulnerability:** Found hardcoded JWT and Stripe secret keys directly in the source code in `src/auth.ts`.
**Learning:** Hardcoded secrets could be inadvertently leaked via version control if the code is public or shared.
**Prevention:** Use environment variables for all secrets and include a fail-fast mechanism to immediately abort execution if necessary secrets are not found.
