## 2026-10-16 - Replaced Hardcoded Secrets with Environment Variables
**Vulnerability:** CRITICAL: Hardcoded API keys (STRIPE_SECRET_KEY, JWT_SECRET) were present in the source code (`src/auth.ts`).
**Learning:** Hardcoding sensitive values in the source code directly exposes them to anyone with access to the repository, significantly increasing the risk of unauthorized access or data breaches.
**Prevention:** Utilize environment variables (e.g., `process.env`) to securely load configuration data at runtime without explicitly committing secrets into source control.
