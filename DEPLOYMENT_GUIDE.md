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
5. Set production branch to `main` when ready.
6. Confirm deployment URL and update `README.md` if different from placeholder.

## Deployment automation reference
- Use Vercel Git integration to auto-deploy on pushes to the configured branch.
- Protect the production branch with required checks (`npm test`, `npm run build`).
