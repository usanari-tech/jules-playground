## 2026-08-27 - Fixed Hardcoded Secrets in auth.ts
**Vulnerability:** Hardcoded API keys (STRIPE_SECRET_KEY, JWT_SECRET) were present in the source code.
**Learning:** Secrets in code can be easily exposed if the source code is compromised or accidentally pushed to a public repository. Using a validation check prevents the application from failing open if the environment variable is not set.
**Prevention:** Use environment variables (e.g., process.env.SECRET) and ensure robust runtime validation for their presence.
