# Contributing to Ocean2 V2 Research

Thank you for helping keep this ship-to-market (S2M) research repository accurate and release-ready.

## What this repo is

Documentation-first research for the Ocean2 V2 wave-energy concept (bobbing-ball overtopping cycle + optional onboard hydrogen conversion). Code here is intentionally thin: baseline validators, a static website surface, and a Zenodo publisher helper.

## Development setup

```bash
# Node 20+ recommended
npm install
npm test
npm run build
```

Python helper (optional, Zenodo publishing only):

```bash
python3 -m pip install -r requirements.txt
# Prefer stdin for secrets (never put tokens on the command line):
printenv ZENODO_TOKEN | python3 Walter-Evans-zenodo_auto_publish.py \
  --token-stdin \
  --file Walter-Evans-Ocean2-V2-SSRN-Paper.md \
  --title "Ocean2 V2" \
  --description "Research preprint"
```

## Pull request checklist

1. Default branch is **`master`** — open PRs against `master`.
2. Run `npm test` and `npm run build` locally.
3. Keep docs, assets, and artifacts inventories in sync (README + `index.html`).
4. Do not commit secrets, tokens, or private keys.
5. Prefer conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `test:`.
6. Draft PRs are fine while review-jury workflows run; mark ready when green.

## Review jury (required workflows)

PRs should pass:

| Check | Workflow |
| --- | --- |
| Baseline test/build | `ci.yml` |
| OpenRouter AI review | `ai-pr-review-openrouter.yml` |
| Jules review | `jules-pr-reviewer.yml` |
| Semgrep SAST | `semgrep.yml` |
| CodeQL | `codeql.yml` |

Secrets (optional but recommended on the repo): `OPENROUTER_API_KEY`, `JULES_API_KEY`.

## Docs map

- `README.md` — overview, inventories, quick start
- `GO_TO_MARKET.md` — market + wedge strategy
- `DEPLOYMENT_GUIDE.md` — Vercel static deploy
- `BRAND_GUIDELINES.md` — narrative system
- `SECURITY.md` — disclosure + practices
- `CHANGELOG.md` — release notes
- Core artifacts: SSRN paper, invention disclosure, roadmap

## Reporting issues

Open an issue with reproduction steps for broken validators, missing assets, or incorrect research claims. For security issues, use GitHub Security Advisories (see `SECURITY.md`).
