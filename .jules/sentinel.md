## 2024-05-17 - Hardcoded Secrets in Source Code
**Vulnerability:** Hardcoded `STRIPE_SECRET_KEY` and `JWT_SECRET` found in `src/auth.ts`.
**Learning:** Storing secrets in source code is a critical vulnerability that could allow attackers to access sensitive services or forge authentication tokens if the source code is compromised.
**Prevention:** Always use environment variables for sensitive secrets and implement a fail-fast mechanism (e.g., throwing an error) if required variables are missing at runtime.
