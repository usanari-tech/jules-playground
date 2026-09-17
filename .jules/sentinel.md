## 2026-09-17 - Hardcoded Secrets
**Vulnerability:** Hardcoded STRIPE_SECRET_KEY and JWT_SECRET found in src/auth.ts.
**Learning:** Hardcoding secrets exposes them in source control, which can lead to credential leakage if the repo is compromised. It also makes rotation difficult.
**Prevention:** Use environment variables (e.g. process.env) to manage configuration and secrets externally. Add runtime checks to fail securely if secrets are missing.
