# Security Policy

## Scope

This repository is research and documentation focused. Security controls apply to repository integrity, automation, CI secrets, and any web/test surfaces (including the static `index.html` site).

## Reporting a vulnerability

Please report potential vulnerabilities privately to the repository owner via GitHub Security Advisories or direct maintainer contact.

Include:

- Description of the issue
- Reproduction steps
- Impact assessment
- Suggested remediation (if available)

## Security practices

- Do not commit secrets, credentials, or private keys.
- Prefer stdin or environment variables for tokens (e.g. `ZENODO_TOKEN` / `--token-stdin`). Never pass live tokens as argv.
- Use branch protections and required checks (`npm test`, `npm run build`, CodeQL, Semgrep).
- Keep dependency and CI permissions minimal (`contents: read` by default; elevate only where a job writes).
- Pin third-party Actions where practical; Dependabot watches `github-actions`.
- Review jury on every PR: OpenRouter AI review, Jules, Semgrep, CodeQL.

## Supported surfaces

| Surface | Notes |
| --- | --- |
| Static site (`index.html`) | No backend; treat as public content |
| Baseline Node scripts | Local filesystem checks only |
| Zenodo publisher | Requires caller-supplied token; sandbox by default |
