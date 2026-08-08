# Deployment Guide

## Purpose

This repository is documentation-first. Deployment currently refers to publishing and validating a web-test surface and keeping research artifacts release-ready.

## Prerequisites

- Node.js 20+
- npm 10+
- Vercel account connected to `midnghtsapphire/ocean2-v2-research`

## Local validation

```bash
# No dependencies to install yet; npm install is included for forward compatibility.
npm install
npm test
npm run build
```

## Vercel website-in-test setup

1. Import the repository into Vercel.
2. Framework preset: **Other / Static Site**.
3. Build command: `npm run build`
4. Output directory: `.` (serves repository root including `index.html`)
5. Set production branch to **`master`** (this repository's default branch).
6. Confirm deployment URL (`https://ocean2-v2-research.vercel.app`) and update `README.md` if it changes.

## Deployment automation reference

- Use Vercel Git integration to auto-deploy on pushes to `master`.
- Protect `master` with required checks: `CI` (`npm test`, `npm run build`), CodeQL, Semgrep.
- Optional secrets for review jury: `OPENROUTER_API_KEY`, `JULES_API_KEY`.

## Review jury workflows

| Workflow | File |
| --- | --- |
| CI | `.github/workflows/ci.yml` |
| OpenRouter AI review | `.github/workflows/ai-pr-review-openrouter.yml` |
| Jules | `.github/workflows/jules-pr-reviewer.yml` |
| Semgrep | `.github/workflows/semgrep.yml` |
| CodeQL | `.github/workflows/codeql.yml` |
