# Portfolio Web

Static personal landing page MVP built with Astro and Tailwind CSS.

The site introduces the owner, highlights selected work, and provides contact paths without adding backend, CMS, blog, or app-like scope.

## Requirements

- Node.js compatible with the installed Astro toolchain.
- npm, using the committed `package-lock.json` for reproducible installs.

## Local setup

```bash
npm install
npm run dev
```

The local development server is provided by Astro. Use the URL printed by the command output.

## Quality gates

Run these before opening or updating a merge request:

```bash
npm run check
npm run lint
npm run format:check
npm run build
```

Useful development commands:

```bash
npm run format
npm run preview
```

`npm run preview` serves the production build locally after `npm run build`.

## Vercel deployment settings

- Framework preset: Astro
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Server/runtime requirement: none; the MVP is a static site.

## MVP scope

Included:

- Hero/intro content.
- Professional summary.
- Featured projects, including InkScroller.
- Contact/social links.
- Responsive, semantic, keyboard-friendly layout.
- Static build suitable for Vercel.

Explicitly excluded from this MVP:

- Blog or CMS.
- Newsletter flows.
- Backend APIs or authentication.
- Dashboard/app functionality.
- Advanced animations.
- Railway deployment for this portfolio site; Railway remains reserved for the InkScroller backend.

## Content placeholders

Final owner copy and destinations still need confirmation before public launch. Current placeholder content is kept in `src/data/site.ts`, including the placeholder email address and any placeholder project URLs.

Configured links are validated before rendering. Invalid contact or project links are dropped from the published page instead of being emitted as broken interactive links.
