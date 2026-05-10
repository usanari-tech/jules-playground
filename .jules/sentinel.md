## 2024-05-10 - [Hardcoded Secrets]
**Vulnerability:** Hardcoded API keys and secrets in code
**Learning:** Hardcoded secrets in code (like `STRIPE_SECRET_KEY` and `JWT_SECRET`) pose a critical security risk as they can be easily leaked if the source code is exposed or shared. It also prevents dynamic key rotation without re-deploying code.
**Prevention:** Always read secrets dynamically from `process.env` at runtime and never check them into version control. Add fail-fast validation to ensure secrets exist when required.
