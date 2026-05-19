# Design: Personal Landing Page

## Technical Approach

Create a static-first Astro site with Tailwind CSS. The repo has only OpenSpec scaffolding and a GitLab-template README, so implementation should scaffold the app from zero: Astro entry page, shared layout, section components, local typed content data, and Vercel-compatible static output. This maps to the spec by making hero/summary, featured projects, contacts/social links, responsive accessibility, static deployment, and quality gates first-class deliverables.

## Architecture Decisions

| Topic | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Frontend runtime | Astro static output with Tailwind | Plain HTML/CSS, Vite React SPA | Astro keeps MVP static and performant while allowing components and future content growth without SPA overhead. |
| Styling | Tailwind utility classes plus one global stylesheet | CSS modules, custom CSS only | Tailwind accelerates responsive layout and consistent spacing; global CSS handles base tokens/focus states. |
| Content | Local TypeScript data in `src/data/site.ts` | CMS, markdown collection, backend API | MVP needs deterministic static content. Local typed data lets invalid project/contact URLs be filtered or fail build validation without introducing CMS/backend scope. |
| Deployment | Vercel static build using `npm run build` | Railway, GitLab Pages | Vercel matches the agreed target; Railway is reserved for InkScroller backend, not this MVP. |

## Data Flow

Build-time data only; no server runtime.

```text
src/data/site.ts ──validate──→ src/pages/index.astro
       │                         │
       └──→ Section components ───┘
                  │
                  └──→ Static HTML/CSS in dist/ → Vercel
```

Invalid contact/social/project URLs should be excluded or fail validation during build so broken interactive links are not published.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Create | Astro/Tailwind dependencies and scripts: `dev`, `build`, `preview`, `check`, `format`, `lint`. |
| `package-lock.json` | Create | Lock npm dependency graph for reproducible Vercel/local installs. |
| `astro.config.mjs` | Create | Astro static site config and Tailwind integration. |
| `tailwind.config.mjs` | Create | Content globs and theme extension. |
| `tsconfig.json` | Create | Astro TypeScript baseline. |
| `src/pages/index.astro` | Create | Landing page composition and section order. |
| `src/layouts/BaseLayout.astro` | Create | HTML shell, metadata, skip link, global styles import. |
| `src/components/Hero.astro` | Create | Owner identity, concise summary, primary contact CTA. |
| `src/components/Summary.astro` | Create | Professional value statement. |
| `src/components/ProjectCard.astro` | Create | Reusable project card with safe outbound links. |
| `src/components/Projects.astro` | Create | Featured projects list, with InkScroller highlighted first. |
| `src/components/ContactLinks.astro` | Create | Contact/social navigation. |
| `src/data/site.ts` | Create | Typed hero, summary, projects, contact/social content and URL validation helpers. |
| `src/styles/global.css` | Create | Tailwind directives, base colors, typography, focus-visible defaults. |
| `public/` | Create | Static icons/images only if available; page must work without optional media. |
| `README.md` | Modify | Replace GitLab template with setup, quality gates, and deployment notes. |

## Interfaces / Contracts

`src/data/site.ts` should export typed static data:

```ts
type LinkItem = { label: string; href: string; external?: boolean };
type Project = { name: string; description: string; featured?: boolean; links: LinkItem[] };
type SiteContent = { hero: { name: string; tagline: string; summary: string }; projects: Project[]; contacts: LinkItem[] };
```

`projects` MUST include InkScroller with a concise description and at least one valid external link. Components receive already-validated data and render semantic HTML only.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Static validation | Types, Astro diagnostics, broken data shape | `npm run check` using `astro check` after scaffolding. |
| Formatting/lint | Consistent source style and basic defects | Add Prettier with Astro/Tailwind plugin and ESLint if compatible; pin `npm run format:check` and `npm run lint`. |
| Build | Static deployment artifact | `npm run build`; verify `dist/` output and no backend/server requirement. |
| Manual acceptance | Responsive/keyboard/content behavior | Use `npm run preview`, test mobile/desktop widths, keyboard tab order, visible focus, outbound links. |

## Migration / Rollout

No migration required. Scaffold the static site, verify locally, then connect the GitLab repository to Vercel. Vercel settings: framework Astro, install `npm install`, build `npm run build`, output `dist`. No backend, auth, CMS, blog, API routes, or Railway service are part of the MVP.

## Open Questions

- [ ] Final owner copy, contact/social URLs, and InkScroller destination links are still needed before implementation can finalize content.
- [ ] Confirm npm as the package manager; design assumes npm because no lockfile exists and Vercel supports it by default.
