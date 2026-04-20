## 2024-05-24 - Hardcoded Secrets

**Vulnerability:** Hardcoded API keys (Stripe, JWT) discovered in `src/auth.ts` source code as part of a security trap.
**Learning:** Found intentional hardcoded secrets vulnerability in module scope. The issue demonstrates the risks of committing secrets into version control.
**Prevention:** Implement checks against committing hardcoded secrets. Move all sensitive keys to `.env` variables and ensure they are read dynamically with fail-fast mechanisms throwing secure generic errors if not present.
