# DevDigi Portfolio Web

[![CI](https://github.com/mfranchescagonzalezcejas/portfolio-web/actions/workflows/ci.yml/badge.svg)](https://github.com/mfranchescagonzalezcejas/portfolio-web/actions/workflows/ci.yml)
[![Production deploy](https://github.com/mfranchescagonzalezcejas/portfolio-web/actions/workflows/vercel-production.yml/badge.svg)](https://github.com/mfranchescagonzalezcejas/portfolio-web/actions/workflows/vercel-production.yml)

Production portfolio site for **Mercedes Franchesca Gonzalez Cejas** and the **DevDigi** personal developer brand. It presents a mobile-development profile focused on Flutter, Android, iOS, clean architecture, production delivery, QA validation, and selected project work.

Live site: **https://www.devdigi.dev**

Latest validated release: **v0.2.3**

## What this site contains

| Area | Current state |
|---|---|
| Positioning | Mobile Developer focused on Flutter, Android, iOS, API integration, CI/CD, QA, and product quality. |
| Content | Hero, about, experience, featured project, selected projects, case studies, skills, education, languages, and contact paths. |
| Locales | `/` defaults to English, `/en` serves English, and `/es` serves Spanish. |
| Featured work | Inkscroller, Inkscroller Frontend, Inkscroller Backend, DevDigi Portfolio Web, AppSwiftUI, AppUIKit, and AppAndroid. |
| Case studies | Public, non-confidential references for La Mercè, Barcelona a la Butxaca, and Nescafé Dolce Gusto QA validation. |
| Deployment | Static Astro output deployed to Vercel Production through tag-driven GitHub Actions releases. |

## Tech stack

| Layer | Tools |
|---|---|
| Framework | Astro |
| UI | React islands, Tailwind CSS |
| Language | TypeScript |
| Testing and validation | Vitest, Astro check, ESLint, Prettier, production build |
| Hosting | Vercel |
| Release automation | GitHub Actions, GitHub Releases, GitHub Environments/Deployments |

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Astro, usually:

```text
http://localhost:4321
```

## Useful commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local Astro dev server. |
| `npm run build` | Build the static production output in `dist/`. |
| `npm run preview` | Serve the production build locally after building. |
| `npm run typecheck` | Run Astro and TypeScript checks. |
| `npm run lint` | Run ESLint. |
| `npm run format:check` | Check formatting without modifying files. |
| `npm run format` | Format the project. |
| `npm run test` | Run the production build and Vitest suite. |

## Quality gates

Run these before opening or updating a pull request:

```bash
npm run test
npm run typecheck
npm run lint
npm run format:check
npm run build
npm audit --audit-level=high
```

`npm run test` already includes a production build, but the explicit build command is kept in the checklist because deployment depends on static output correctness.

## Deployment model

Production is intentionally released by version tag, not by every push to `main`.

| Git event | Result |
|---|---|
| Push to `develop` | Vercel Preview deployment. |
| Push to `main` | No automatic Vercel Production deployment. `main` is the protected integration branch. |
| Push tag `v*` | GitHub Actions builds and deploys Vercel Production, then records a GitHub `Production` deployment. |

Production workflow:

```text
.github/workflows/vercel-production.yml
```

The verified `v0.2.3` release created a successful GitHub `Production` deployment and aliased the Vercel deployment to:

```text
https://www.devdigi.dev
```

## Release process

Patch releases follow the protected PR flow:

1. Bump `package.json` and `package-lock.json`.
2. Merge the bump through an approved issue and PR.
3. Create an annotated tag for the next validated version, for example:

   ```bash
   git tag -a v0.2.4 -m "Release v0.2.4"
   git push origin v0.2.4
   ```

4. Verify the `Deploy production to Vercel` workflow succeeds.
5. Confirm Vercel Production is `Ready` and `www.devdigi.dev` resolves to the new deployment.
6. Publish the GitHub Release with generated notes and a short validation summary.

See the full maintainer guide:

[Release process guide](docs/release-process.md)

## Repository workflow

| Guide | Purpose |
|---|---|
| [Contributing](CONTRIBUTING.md) | Issue-first PR workflow, quality gates, and contributor expectations. |
| [Security](SECURITY.md) | Private vulnerability reporting and supported security scope. |
| [Release process](docs/release-process.md) | Tag-driven Production release steps. |

## Vercel settings

Use these settings when importing or validating the GitHub repo in Vercel:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

No server runtime is required. The portfolio is a static site.

## Content editing

Primary site copy and structured content live in:

```text
src/content/site.ts
```

That file owns:

- English and Spanish copy.
- Navigation labels.
- Contact links.
- Experience entries.
- Project cards.
- Public case studies.
- Skills, education, and language sections.

Configured links are validated before rendering. Invalid contact, project, experience, or case-study links are dropped instead of being published as broken interactive links.

## Project scope

This repository is the public portfolio website only.

Included:

- Static Astro portfolio.
- Responsive and accessible layout.
- English and Spanish routes.
- Project and case-study content.
- Contact, CV, GitHub, and LinkedIn paths.
- CI checks and tag-driven Production releases.

Out of scope:

- Blog or CMS.
- Newsletter flows.
- Backend APIs or authentication.
- Dashboard or product-app functionality.
- Railway deployment for this portfolio site; Railway remains reserved for the Inkscroller backend.

## License

No open-source license has been selected for this repository. The code is public for portfolio review purposes, but reuse, redistribution, or derivative work is not granted without permission.
