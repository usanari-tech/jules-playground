## 2024-05-24 - [Critical Security Fix] Hardcoded Secrets in auth.ts
**Vulnerability:** Hardcoded sensitive tokens (`JWT_SECRET`, `STRIPE_SECRET_KEY`) found directly in code literals in `src/auth.ts`.
**Learning:** These variables being hardcoded could easily be committed to source control resulting in compromised security boundaries and monetary losses. This codebase does not currently have measures to validate or require secrets at a configuration stage.
**Prevention:** Always read sensitive tokens from `process.env` during runtime. Implement fail-fast mechanism (throwing errors) when the required configuration values aren't present.
