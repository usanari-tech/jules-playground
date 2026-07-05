## 2024-05-24 - Hardcoded Secrets Removed
**Vulnerability:** Hardcoded API keys (e.g. `STRIPE_SECRET_KEY`, `JWT_SECRET`) embedded directly into source code.
**Learning:** Found explicit mock strings intended for local environments, potentially leaked to version control if untouched. Discovered a lack of environment variable binding causing secrets to be permanently injected into modules.
**Prevention:** Avoid statically defining credentials in module-level constants. Instead, bind dynamically with `process.env` at runtime inside functions along with a fail-fast missing credential guard to ensure no silent failures with undefined tokens.
