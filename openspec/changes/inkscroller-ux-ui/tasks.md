# Tasks: InkScroller UX/UI

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | 300–450 authored lines for this slice (binary media excluded) |
| 800-line budget risk | Low |
| Chained PRs recommended | Yes |
| Suggested split | PR 2 home discovery/media slice only |
| Delivery strategy | auto-chain |
| Chain strategy | feature-branch-chain |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|---|---|---|---|---|---|
| 1 | Add home links, approved captures, frame wiring, focused contracts, and responsive evidence; PR #2 base = PR #1 branch | PR 2 | `npm run test -- src/App.test.tsx src/localized-html-contract.test.ts` | `npm run build` + responsive Chrome harness at 320/375/768/1440px | Revert only home/header data, FeaturedProject/media CSS, three assets, and slice contracts |

## Phase 1: Foundation and Contract

- [x] 1.1 Extend `src/layouts/BaseLayout.astro` with optional page SEO/canonical/alternate props while preserving home defaults; verify `vercel.json` remains unchanged.
- [x] 1.2 Create `src/content/inkscroller.ts` with `ProductMedia` discriminated types, localized ES/EN SEO/copy/links, EN non-capture placeholder, and explicit beta-unavailable wording.
- [x] 1.3 Create `src/layouts/InkScrollerPage.astro` with semantic hero, proof, capability-value, `01 → 02 → 03` narrative, media slot, final secondary CTA, and the existing hydrated site header.
- [x] 1.4 Create `src/pages/es/proyectos/inkscroller.astro` and `src/pages/en/projects/inkscroller.astro` as thin locale selectors passing canonical/alternate metadata.

## Phase 2: Contract Tests

- [x] 2.1 Extend `src/localized-html-contract.test.ts` with build-output assertions for both exact routes, locale copy, canonical/hreflang metadata, shared hydrated header, semantic section order, and CTA-last.

## Phase 3: Integration and Verification

- [x] 3.1 Add the minimum scoped layout styles in `src/layouts/InkScrollerPage.astro`; preserve existing home styles and 44px focus targets.
- [x] 3.2 Add reduced-motion smooth-scroll suppression to `src/styles/global.css` without changing unrelated landing-page rules.
- [x] 3.3 Run `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run format:check`; inspect both routes at 320/375/768/1440px with the local Chrome harness for keyboard and reduced motion.
- [x] 3.4 Correct the route-level header regression: reuse the hydrated production `SiteHeader` on both product routes with locale-correct props, header clearance, and build-output coverage.

## Phase 4: Next Autonomous Home Discovery and Media Slice (PR 2)

- [x] 4.1 Copy only `Library Screen.jpg`, `Manga_detail screen.jpg`, and `Reader screen.jpg` to the three versioned `public/inkscroller/home-*.jpg` paths; verify 1080×2340 dimensions and no other captures.
- [x] 4.2 Extend `src/content/site.ts` with typed ordered mockups and locale-correct InkScroller project/header destinations, preserving both repository links.
- [x] 4.3 Update `src/sections/projects/FeaturedProject.tsx` and `src/sections/header/SiteHeader.tsx` to render the direct links and three decorative lazy images without a menu/gallery abstraction.
- [x] 4.4 Add scoped frame fit, intrinsic-space, and ≤640px stacking rules in `src/styles/global.css`; preserve product-page styles and reduced-motion behavior.

## Phase 5: Focused Contracts and Responsive Verification

- [x] 5.1 Extend `src/App.test.tsx` with ES/EN direct featured/header link assertions, preserved repository links, and exactly three empty-alt lazy images in order.
- [x] 5.2 Extend `src/localized-html-contract.test.ts` with built-home asset paths, dimensions, local-only references, direct links, and truthful English labeling.
- [x] 5.3 Extend `src/rendered-responsive-overflow.test.ts` to verify both homes at 320/375/768/1440px: no overflow, contained top-anchored crops, intrinsic image sizes, and visible keyboard focus.
- [x] 5.4 Run focused contracts, `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`, and the browser harness; record exact results before apply completion.

## Deferred Follow-up

- Product routes, SEO, content, reduced-motion baseline, and `vercel.json` remain complete from PR 1.

## Phase 6: SiteHeader Product-Route Navigation Correction

- [x] 6.1 Add minimal `SiteHeader` route context so localized home and section links resolve to `/en` or `/es` from InkScroller product routes, while preserving hash-only home behavior and canonical InkScroller routes; add ES/EN rendered contracts.

Rollback: delete the two routes, page layout, content, product tests/styles, and global motion rule; remove only added `BaseLayout` props and their callers, preserving `personal-landing-page`, home links, and `vercel.json` fallbacks.

## Phase 7: Home FeaturedProject Phone-Frame Fit Remediation

- [x] 7.1 Correct the existing `src/styles/global.css` `.featured-phone-screen`/image aspect fit so all three 1080×2340 home captures fill their frames without visual gaps or unintended content loss; preserve `src/content/site.ts`, screenshot bytes/order, decorative semantics, and desktop/mobile stacking behavior. Add focused assertions in `src/rendered-responsive-overflow.test.ts` for frame containment, fit, and the three unchanged assets, then validate `/en/` and `/es/` in the desktop and mobile browser harnesses.
