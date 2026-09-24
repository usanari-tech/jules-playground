## 2026-09-24 - Extract Hardcoded Secrets
**Vulnerability:** Hardcoded API and JWT secrets in `src/auth.ts`.
**Learning:** Found secrets directly embedded in source code (TRAP 3).
**Prevention:** Replaced hardcoded declarations with references to environment variables and added a check to fail securely if variables are undefined.
