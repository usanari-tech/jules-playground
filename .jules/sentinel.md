## 2024-05-15 - Hardcoded Credentials in Source Code
**Vulnerability:** Found hardcoded credentials `STRIPE_SECRET_KEY` and `JWT_SECRET` in `src/auth.ts`.
**Learning:** The application was storing sensitive keys directly in version control.
**Prevention:** Rely on environment variables (e.g. `process.env`) instead of hardcoded strings.
