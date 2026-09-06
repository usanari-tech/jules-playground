## 2024-03-24 - [Fix] Hardcoded secrets in auth.ts
**Vulnerability:** Found hardcoded STRIPE_SECRET_KEY and JWT_SECRET in src/auth.ts.
**Learning:** The secrets were hardcoded directly as strings in the code.
**Prevention:** Use environment variables and fail securely if they are missing.
