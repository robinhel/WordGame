# Ruleset for WordGame

Use this as a baseline for the `main` branch.

## Target
- Branches: `main`

## Recommended rules
1. Require a pull request before merging: ON
2. Require status checks to pass before merging: ON
3. Block force pushes: ON
4. Restrict who can push: ON (maintainers/teachers/CI-app only)
5. Bypass permissions: Keep minimal (admins only)

## Required status checks
When `Require status checks to pass before merging` is enabled, mark these checks as required:
- `Frontend Quality (Lint, Build, Vitest)`
- `Backend Tests (.NET)`
- `API Tests (post-they)`
- `E2E Tests (Playwright BDD)`

## Optional hardening
- Require conversation resolution before merge: ON
- Require linear history: ON
- Require signed commits: Optional
