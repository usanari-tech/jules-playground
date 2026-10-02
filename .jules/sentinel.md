
## 2026-10-02 - Prevent Hardcoded Secrets Deployment
**Vulnerability:** Hardcoded API keys (STRIPE_SECRET_KEY, JWT_SECRET) were present directly in the codebase.
**Learning:** The project currently lacks automated pre-commit checks or CI/CD rules to reject code with hardcoded credentials.
**Prevention:** Rely on environment variables via process.env instead of hardcoding secrets. Recommend adding a secret scanning tool like Gitleaks to the CI pipeline to prevent secrets from reaching the repository.
