# Ocean2 V2 Research

<!-- AUTO-PACKAGE-BADGES:START -->

<!-- AUTO-PACKAGE-BADGES:END -->

Ocean2 V2 Research is the ship-to-market (S2M) research repository for the Ocean2 V2 wave-energy concept: a deep-ocean wave energy converter using a bobbing-ball overtopping cycle and optional onboard hydrogen conversion.

**Default branch:** `master`  
**Live website (test):** [https://ocean2-v2-research.vercel.app](https://ocean2-v2-research.vercel.app)  
**Fleet maintenance WR:** [revvel-standards#16884](https://github.com/midnghtsapphire/revvel-standards/issues/16884)

## What this repository does now

- Maintains the core technical and commercialization documents:
  - `Walter-Evans-Ocean2-V2-SSRN-Paper.md`
  - `Walter-Evans-Ocean2-V2-Invention-Disclosure.md`
  - `Walter-Evans-Ocean2-V2-Roadmap.md`
- Tracks revvel-standards S2M documentation for planning, security, deployment, brand, and go-to-market execution.
- Provides baseline validation scripts (`npm test`, `npm run build`) to keep documentation, assets, artifacts, and website structure release-ready.
- Runs a full review jury on PRs: CI, OpenRouter AI review, Jules, Semgrep, and CodeQL.

## Website in test (Vercel)

- Target: `https://ocean2-v2-research.vercel.app`
- Status: Static website surface via `index.html` for one-iteration S2M testing.
- Automation reference: See `DEPLOYMENT_GUIDE.md` for Vercel deployment steps.

## Research engine and suggestions

- Core market and technical research lives in `GO_TO_MARKET.md` (market context, wedge strategy, risks, and execution priorities).
- Foundational technical evidence and invention positioning:
  - `Walter-Evans-Ocean2-V2-SSRN-Paper.md`
  - `Walter-Evans-Ocean2-V2-Invention-Disclosure.md`
  - `Walter-Evans-Ocean2-V2-Roadmap.md`
- Website-first summary surface: `index.html` exposes research highlights and launch priorities for immediate review.

### Concrete improvement backlog (2026-08 fleet sweep)

| Area | Finding | Action in this pass |
| --- | --- | --- |
| CI / review jury | No `.github/workflows` | Added CI + OpenRouter + Jules + Semgrep + CodeQL |
| Docs DX | No `CONTRIBUTING.md`; README linked `main` while default branch is `master` | Added CONTRIBUTING; fixed branch links |
| Security | Zenodo helper required `--token` on argv (process-list leak) | Added `--token-stdin` / env token support |
| Tests | Baseline only checked a short file list | Expanded required workflows/docs checks |
| Deps | No Dependabot | Added Dependabot for Actions + npm |
| Python | No `requirements.txt` for Zenodo helper | Added pinned `requests` range |

## Assets inventory

- `ocean2_infographic.jpg` — core visual explainer asset
- `ocean2_roadmap.jpg` — roadmap visual asset
- `infographic_notes.md` — supporting copy + usage notes for infographic assets

## Artifacts inventory

- `Walter-Evans-Ocean2-V2-SSRN-Paper.md` — technical artifact
- `Walter-Evans-Ocean2-V2-Invention-Disclosure.md` — IP artifact
- `Walter-Evans-Ocean2-V2-Roadmap.md` — commercialization artifact
- `GO_TO_MARKET.md` — S2M execution artifact

## S2M value analysis

- **Strategic value:** Converts high-energy offshore wave resources into a modular, exportable energy pathway.
- **Goal alignment:** Supports long-horizon climate infrastructure and blue-economy commercialization.
- **Priority rationale:** Focuses on transmission-constrained offshore contexts where cable costs are a major blocker.

## Revenue potential framing (3-year directional)

A conservative path to first commercial traction can combine:

- Engineering services + pilot deployment contracts
- IP licensing for converter and control architecture
- Energy offtake / hydrogen offtake partnerships

Directional objective: establish a credible path to eight-figure annualized project value with pilot-to-array conversion milestones.

**Keywords / SEO surface:** wave energy converter, overtopping WEC, offshore hydrogen, blue economy, ocean energy pilot, S2M research.

## Quick start

```bash
# No runtime npm dependencies yet; install is kept for forward compatibility.
npm install
npm test
npm run build
```

## Repository documents

- `GO_TO_MARKET.md` — market research, positioning, launch strategy, and evidence-backed assumptions
- `DEPLOYMENT_GUIDE.md` — operational deployment and Vercel automation notes
- `BRAND_GUIDELINES.md` — narrative and brand system for Ocean2 communications
- `SECURITY.md` — responsible disclosure and security posture for docs + automation
- `CONTRIBUTING.md` — how to develop, test, and open PRs
- `CHANGELOG.md` — tracked release changes
- `index.html` — website-in-test surface for S2M research, assets, and artifacts

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). Open PRs against **`master`**. PRs should stay green on the review-jury workflows listed there.

## License

See `LICENSE`.
