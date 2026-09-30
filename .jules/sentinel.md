## 2026-09-30 - Remove hardcoded secrets
**Vulnerability:** Hardcoded STRIPE_SECRET_KEY and JWT_SECRET in src/auth.ts.
**Learning:** This repo contains dummy secrets that are loaded statically, exposing sensitive API keys to source control and compiled outputs.
**Prevention:** Replace hardcoded static string constants with dynamic environment variables (e.g. process.env.SECRET) and add proper runtime validation to ensure the environment configuration is populated before execution.
