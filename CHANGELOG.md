# Changelog

## [Unreleased]

### Added
- Full review-jury GitHub Actions: CI, OpenRouter AI PR review, Jules, Semgrep, CodeQL.
- `CONTRIBUTING.md` with setup, PR checklist, and review-jury map.
- Dependabot for GitHub Actions and npm.
- `requirements.txt` for the Zenodo publisher helper.
- `.gitignore` for Node/Python/local env noise.
- Zenodo publisher `--token-stdin` and `ZENODO_TOKEN` env support (no argv secret leak).

### Fixed
- Default-branch links: documentation and website now use `master` (repo default) instead of `main`.
- Baseline tests now require review workflows and CONTRIBUTING coverage.

### Changed
- Package version bumped to `0.2.0` for the fleet-maintenance baseline refresh.

## [0.1.0] — 2026-05-25

### Added
- Website-in-test surface (`index.html`) for one-iteration S2M visibility.
- Explicit research engine, assets inventory, and artifacts inventory sections in `README.md`.
- Baseline validations for website surface plus research/assets/artifacts coverage.
- Revvel-standards documentation baseline:
  - README
  - DEPLOYMENT_GUIDE
  - GO_TO_MARKET
  - BRAND_GUIDELINES
  - SECURITY
- Minimal `package.json` and baseline validation scripts in `scripts/`.
