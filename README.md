# Portfolio Web

Personal landing page built with **Astro** and **Tailwind CSS**. The current version is an MVP/base: it is ready to run, build, and deploy as a static site, but final copy, links, and visual tuning are still pending.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Astro, usually:

```text
http://localhost:4321
```

## Project status

| Area | Status |
|---|---|
| Stack | Astro + Tailwind CSS |
| Deployment target | Vercel |
| Output | Static site in `dist/` |
| Backend | Not included in the MVP |
| Content | Real positioning and social links started; project-specific URLs and visual tuning pending |

## Quality gates

Run these before opening or updating a merge request:

```bash
npm run check
npm run lint
npm run format:check
npm run build
```

Useful local commands:

```bash
npm run format
npm run preview
```

`npm run preview` serves the production build locally after `npm run build`.

## Vercel settings

Use these settings when importing the GitLab repo into Vercel:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |

No server runtime is required for the MVP.

## MVP scope

Included:

- Hero/introduction.
- Professional summary.
- Featured projects, including InkScroller.
- Contact/social links.
- Responsive, semantic, keyboard-friendly layout.
- Static deployment suitable for Vercel.

Out of scope for this MVP:

- Blog or CMS.
- Newsletter flows.
- Backend APIs or authentication.
- Dashboard/app functionality.
- Advanced animations.
- Railway deployment for this portfolio site; Railway remains reserved for the InkScroller backend.

## Content placeholders

The editable site content lives in:

```text
src/data/site.ts
```

Before a real public launch, confirm or replace the remaining content values for:

- La Mercè 2024 public URL, if available
- Barcelona a la Butxaca public URL, if available
- Portfolio source URL, if the repo becomes public or gets a public mirror
- final personal copy and visual tone

Configured links are validated before rendering. Invalid contact or project links are dropped from the published page instead of being emitted as broken interactive links.
