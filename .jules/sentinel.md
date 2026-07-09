## 2024-07-09 - Fix hardcoded secrets
**Vulnerability:** Hardcoded JWT and Stripe secrets (`STRIPE_SECRET_KEY` and `JWT_SECRET`) found in `src/auth.ts`.
**Learning:** Secrets were committed directly to the repository codebase which exposes them to anyone with read access to the repo.
**Prevention:** Enforce the use of environment variables (`process.env`) and add fail-fast logic to ensure secrets are provided at runtime, without being committed to the source control.
