# Security Policy

## Scope
This repository is research and documentation focused. Security controls apply to repository integrity, automation, and any future web/test surfaces.

## Reporting a vulnerability
Please report potential vulnerabilities privately to the repository owner via GitHub Security Advisories or direct maintainer contact.

Include:
- Description of the issue
- Reproduction steps
- Impact assessment
- Suggested remediation (if available)

## Security practices
- Do not commit secrets, credentials, or private keys.
- Use branch protections and required checks (`npm test`, `npm run build`).
- Keep dependency and CI permissions minimal.

