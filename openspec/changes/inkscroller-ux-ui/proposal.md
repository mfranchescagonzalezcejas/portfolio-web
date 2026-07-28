# Proposal: InkScroller UX/UI

## Intent

Make InkScroller discoverable from the localized home page and credible through its existing canonical product pages, using approved Spanish app evidence without implying English localization.

## Scope

### In Scope
- Preserve static ES `/es/proyectos/inkscroller` and EN `/en/projects/inkscroller` routes.
- Preserve typed local ES/EN content, one shared product-page layout, and its `01 → 02 → 03` narrative.
- Preserve truthful ES/EN media states, reduced-motion behavior, and responsive/accessibility contracts.
- A localized direct link from the featured home InkScroller project to its canonical ES/EN route.
- A localized direct InkScroller link in `SiteHeader`; no dropdown for one destination.
- Replace the three home phone placeholders with the supplied 1080×2340 Spanish Library, Manga detail, and Reader captures, copied into versioned public assets.
- Decorative media treatment, intrinsic sizing and lazy loading, plus responsive crop verification.

### Out of Scope
- Remote assets, new dependencies, carousels, scroll libraries, CMS, or backend work.
- English screenshots until genuine EN captures exist.
- A menu abstraction, generic gallery, or unrelated changes to `personal-landing-page`.

## Capabilities

### New Capabilities
- `inkscroller-product-pages`: Localized canonical InkScroller pages and home/header discovery links with truthful Spanish media and accessible responsive presentation.

### Modified Capabilities
- None.

## Approach

Keep the static product-page implementation. Extend `site.ts`, `FeaturedProject`, and `SiteHeader` with locale-specific canonical paths. Copy only the three approved Spanish captures from `/home/merce/Descargas/drive-download-20260726T185531Z-1-001` into `public/inkscroller/`; retain device frames, use decorative empty-alt/hidden treatment, intrinsic dimensions, and `loading="lazy"`. Use existing CSS—no gallery or new UI abstraction.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/pages/{es, en}/.../inkscroller.astro` | Preserve | Canonical localized static routes |
| `src/layouts/InkScrollerPage.astro` | Preserve | Shared page composition |
| `src/content/inkscroller.ts` | Preserve | Typed localized copy and preview state |
| `src/content/site.ts` | Modified | Localized project and header link data |
| `src/sections/projects/FeaturedProject.tsx` | Modified | Canonical project CTA and three capture-backed phone frames |
| `src/sections/header/SiteHeader.tsx` | Modified | Direct localized InkScroller navigation item |
| `public/inkscroller/` | Modified | Versioned approved Spanish Library, Manga detail, and Reader captures |
| `src/styles/global.css` | Modified | Scoped responsive, focus, motion styles |
| `vercel.json` | Verify | Preserve fallback while static routes win |
| `src/*contract*.test.ts` | Modified | Route, locale, and overflow assertions |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Catch-all masks a missing route | Med | Build and rendered-route assertions |
| EN implies unavailable capture | Med | Explicit non-capture preview copy |
| Header work regresses home | Low | Change only if route accessibility requires it; test cross-route |
| Published captures expose third-party content | Low | User approved publication; retain only supplied app evidence and review assets before release |
| Responsive crop hides UI evidence | Med | Check all three frames at 320–1440px |

## Rollback Plan

Revert the home CTA, header link, capture references, and copied assets independently; retain current product-page work and Vercel fallback. If necessary, revert the foundational product-page slice separately.

## Dependencies

- User-approved Spanish captures from `/home/merce/Descargas/drive-download-20260726T185531Z-1-001`.

## Success Criteria

- [ ] Both canonical localized routes render static, localized, keyboard-accessible pages without horizontal overflow at 320–1440px.
- [ ] ES uses only local 6:13 captures; EN clearly states its preview is not a capture.
- [ ] Motion respects reduced-motion, and the beta CTA is secondary and last.
- [ ] Home and header links resolve directly to the matching ES/EN canonical route.
- [ ] All three supplied Spanish captures render in existing frames with lazy loading, intrinsic sizing, decorative accessibility treatment, and verified responsive crops.
