# Tasks: Personal Landing Page

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 650-900 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | MR1 scaffold → MR2 content → MR3 polish (sequential into `develop`) |
| Delivery strategy | ask-on-risk |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

> Note: Guard vocabulary requires `stacked-to-main`; this project uses develop-based stacking, so feature MRs target `develop` and stabilize there before `develop` is promoted to `main`.

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Scaffold Astro + Tailwind + quality scripts | MR1 `feature/personal-landing-scaffold` → `develop` | Autonomous baseline; no feature content yet |
| 2 | Implement content model + landing sections | MR2 `feature/personal-landing-content` → `develop` | Open after MR1 merges; delivers all spec-visible behavior |
| 3 | Validate links/accessibility, docs, final cleanups | MR3 `feature/personal-landing-polish` → `develop` | Open after MR2 merges; finalize and prepare stabilization |
| 4 | Stabilize release branch flow | `develop` → `main` | Final promotion after develop validation window |

## Phase 1: Foundation / Tooling

- [x] 1.1 Create `package.json` with scripts: `dev`, `build`, `preview`, `check`, `format`, `format:check`, `lint`; add Astro/Tailwind deps and lock via `package-lock.json`.
- [x] 1.2 Create baseline config files: `astro.config.mjs`, `tailwind.config.mjs`, and `tsconfig.json` aligned to static Astro output.
- [x] 1.3 Create `src/styles/global.css` with Tailwind directives, base typography/colors, and visible `:focus-visible` defaults.

## Phase 2: Core Content + Components

- [x] 2.1 Create `src/data/site.ts` with typed `LinkItem`, `Project`, `SiteContent`, plus URL validation helpers that drop/flag invalid links before render.
- [x] 2.2 Seed `src/data/site.ts` content for hero, summary, contacts, and featured projects ensuring InkScroller is first, described, and linked externally.
- [x] 2.3 Create layout/page skeleton: `src/layouts/BaseLayout.astro` (metadata + skip link) and `src/pages/index.astro` composing sections in required order.
- [x] 2.4 Create section components: `src/components/Hero.astro`, `Summary.astro`, `ProjectCard.astro`, `Projects.astro`, `ContactLinks.astro` using semantic HTML and keyboard-friendly links.

## Phase 3: Integration + Verification

- [ ] 3.1 Wire validated data into `src/pages/index.astro` and `src/components/Projects.astro` so invalid contact/project links are not published.
- [ ] 3.2 Create `public/` assets only if available (icons/images optional) and verify page still passes core scenarios without media.
- [ ] 3.3 Run and fix baseline gates: `npm run check`, `npm run lint`, `npm run format:check`, `npm run build`; ensure static `dist/` output.
- [ ] 3.4 Manual acceptance via `npm run preview`: mobile/desktop readability, no horizontal scroll, tab order, focus visibility, outbound link behavior.

## Phase 4: Documentation + Delivery Readiness

- [ ] 4.1 Replace template `README.md` with local setup, quality gate commands, Vercel build/output settings, and MVP scope exclusions.
- [ ] 4.2 Add tracking alignment note in `openspec/changes/personal-landing-page/tasks.md` checklist comments (or adjacent section) mapping tasks to GitLab Issues/Board cards.
