## 2026-05-12 - Hardcoded Secrets Extraction
**Vulnerability:** Found hardcoded `JWT_SECRET` and `STRIPE_SECRET_KEY` variables inside `src/auth.ts`.
**Learning:** Hardcoded credentials present a significant risk if source code is exposed. Always isolate secrets from the codebase.
**Prevention:** Utilize environment variables (e.g. `process.env`) instead. Implement a fail-fast mechanism to securely prevent the application from starting if these variables are omitted, reducing the risk of silent failures or insecure fallbacks.
