## 2024-08-10 - Intentional Vulnerability Traps
**Vulnerability:** Hardcoded secrets and SQL injections are present as intentional traps (e.g., `[TRAP 3: Security]`).
**Learning:** The codebase contains explicit, intentional security traps meant to test detection capabilities.
**Prevention:** Always scan for `[TRAP` comments to quickly identify and remediate these intentional flaws.
