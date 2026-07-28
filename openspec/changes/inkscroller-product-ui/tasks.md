# Tasks: Inkscroller Product UI — Compact Visual Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~250–320 |
| 400-line budget risk | Low |
| Chained PRs recommended | Yes |
| Suggested split | PR A (content model + captures + placeholders) → PR B (carousel layout + CSS + JS + contract tests) |
| Delivery strategy | auto-chain |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Content model: `ProductMedia[]` + ES captures + EN placeholders | PR A (base = feature branch) | `npx vitest run src/localized-html-contract.test.ts` | `npm run build` (Astro content type-checks) | Revert `src/content/inkscroller.ts` only |
| 2 | Carousel layout + CSS + JS + contract test updates | PR B (base = PR A branch) | `npx vitest run src/localized-html-contract.test.ts src/rendered-responsive-overflow.test.ts` | `npm run dev` → inspect `/es/proyectos/inkscroller` and `/en/projects/inkscroller` at 320/768/1440px | Revert `InkScrollerPage.astro`, `global.css`, both test files |

---

## Phase 1: Content Model — PR A

- [x] 1.1 In `src/content/inkscroller.ts`, change `media: ProductMedia` → `media: Array<ProductMedia & SlideMeta>` with `SlideMeta = { title: string; description: string }`
- [x] 1.2 Add ES `media` array (3 entries): `{ kind: "capture", src: "/inkscroller/library.png", alt: "...", title: "Find", description: "..." }`, then Manga detail, then Reader
- [x] 1.3 Add EN `media` array (3 entries): `{ kind: "placeholder", label: "Preview", disclosure: "..." }` with matching `title`/`description`
- [x] 1.4 In `src/localized-html-contract.test.ts`, add assertion: `media` is `ProductMedia[]` with length 3 per locale
- [ ] 1.5 Run `npx vitest run src/localized-html-contract.test.ts` — content model assertions pass

## Phase 2: Carousel Layout + CSS — PR B

- [ ] 2.1 In `InkScrollerPage.astro`, replace sections 3–5 with `.inkscroller-carousel` track: `scroll-snap-type: x mandatory`, each slide = `.featured-phone` + screen slot (`<img>` ES / `<div>` placeholder EN)
- [ ] 2.2 Add hero grid: `display: grid; grid-template-columns: 1fr auto` at `@media (min-width: 768px)`, stacks below
- [ ] 2.3 In `src/styles/global.css`, add `.inkscroller-carousel` block: track overflow-x, snap-align, slide `max-width: min(18rem, 90vw)`
- [ ] 2.4 Add dot indicators + prev/next arrow buttons to carousel markup; arrow buttons keyboard-focusable
- [ ] 2.5 In `InkScrollerPage.astro` scoped `<script>`, add ~10-line `setInterval` (5s) advancing `scrollLeft`; pause on `mouseenter`/`focusin`; skip if `matchMedia('(prefers-reduced-motion: reduce)')`

## Phase 3: Contract Test Updates — PR B

- [ ] 3.1 In `localized-html-contract.test.ts`, assert ES carousel has 3 `<img>` inside `.featured-phone-screen`; assert EN has zero `<img>`, has placeholder `<div>`
- [ ] 3.2 In `rendered-responsive-overflow.test.ts`, add product-route cases at 320/375/768/1440px: no horizontal overflow, carousel contained
- [ ] 3.3 Run full suite: `npx vitest run` — all contract + overflow tests pass
