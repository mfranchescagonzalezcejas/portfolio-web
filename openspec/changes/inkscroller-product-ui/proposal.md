# Proposal: Inkscroller Product UI — Compact Visual Redesign

## Intent

Replace the six-section linear product page `/es/proyectos/inkscroller` and `/en/projects/inkscroller` with a compact, media-rich layout: two-column hero, CSS scroll-snap carousel with auto-play, and unchanged secondary beta CTA. Merge the capabilities, story, and media sections into a single carousel that gives each approved ES capture a device-frame slot. EN keeps honest placeholder cards — no fake screenshots.

## Scope

### In Scope
- Hero: two-column (copy left, Library capture in `.featured-phone` device right), proof strip below
- Carousel: horizontal `scroll-snap-x` strip, each slide = device frame + screenshot + title + description
- Auto-play (5s interval), pause on `:hover` / `:focus-within` / keyboard, respect `prefers-reduced-motion: reduce`
- Three carousel slides: Find (Library) → Save (Manga detail) → Continue (Reader)
- Beta CTA: unchanged, secondary, last
- EN: same layout with labeled placeholder cards per slide
- Slide markup accepts `<video>` without structural change (video-ready contract)
- `ProductMedia` → `ProductMedia[]` in content model

### Out of Scope
- Alternating feature-screen blocks, three-device fan, or story rail (exploration Approach 1 — replaced by carousel)
- New visual language, color tokens, or device-frame CSS (reuse `.featured-phone`)
- New captures or EN assets
- JS carousel library — native CSS scroll-snap plus minimal timer only

## Capabilities

> Contract between proposal and specs phases.
> Existing capability: `inkscroller-product-pages` at `openspec/changes/inkscroller-ux-ui/specs/inkscroller-product-pages/spec.md`.

### New Capabilities
- `inkscroller-product-carousel`: CSS scroll-snap carousel with auto-play, reduced-motion respect, keyboard accessibility, and video-ready slide slots

### Modified Capabilities
- `inkscroller-product-pages`: requirements for two-column hero composition, carousel-as-primary-media, `ProductMedia[]` shape, and EN placeholder carousel treatment

## Approach

Replace sections 3–5 (capabilities, story, media) with one `scroll-snap-x` carousel using native CSS `scroll-snap-type: x mandatory` + `scroll-snap-align: center`. Each slide wraps a `.featured-phone` device frame (already shipped on home page), reusing its 9.72rem × 19.75rem dimensions, notch, screen area, and color tokens. Auto-play via a ~10-line JS `setInterval` that advances `scrollLeft`; no library, no dependency. Pause on `:hover`, `:focus-within`, and `prefers-reduced-motion: reduce`. Slide markup is content-agnostic: an `<img>`, placeholder `<div>`, or future `<video>` inside the screen area — structural change is zero.

Hero becomes `display: grid; grid-template-columns: 1fr auto` at ≥768px (copy left, device right), stacking vertical at <768px. Proof strip and beta CTA stay as-is.

Content model: `media: ProductMedia` becomes `media: ProductMedia[]` aligned to carousel slide order.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/content/inkscroller.ts` | Modified | `media` → `ProductMedia[]` (3 entries ES, 3 entries EN) |
| `src/layouts/InkScrollerPage.astro` | Modified | Two-column hero, carousel replaces sections 3–5, scoped `<style>` |
| `src/styles/global.css` | Modified | Add `.inkscroller-carousel` block (~40 lines) |
| `src/localized-html-contract.test.ts` | Modified | Section count bump, per-slide media assertions, EN img == null |
| `src/rendered-responsive-overflow.test.ts` | Modified | Carousel overflow + reduced-motion assertions at 320/375/768/1440px |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Carousel JS timer fragile across browsers | Low | CSS scroll-snap is native; JS only drives auto-advance, degrades gracefully |
| EN placeholder cards read as broken images | Low | Same `.featured-phone` frame + labeled "preview" card, matching dimensions |
| Contract test section count breaks | High | Explicitly bump `sectionText.length` and split `.inkscroller-media` assertions per-locale |
| Overflow at 320px with device frames | Medium | `max-width: min(18rem, 90vw)` per slide; existing overflow test covers this |

## Rollback Plan

Revert `InkScrollerPage.astro` to current six-section stack, restore `ProductMedia` (not array). Carousel CSS block is self-contained — drop ~40 lines from `global.css`. Content model rollback is additive-safe (array → single picks `[0]` if needed).

## Dependencies

- None. Approved ES captures in `public/inkscroller/`; `.featured-phone` primitive already shipped.

## Success Criteria

- [ ] ES: Library capture in hero device + 3 carousel slides with real screenshots and alt text
- [ ] EN: same layout, 3 labeled placeholder cards, zero `<img>` in carousel
- [ ] Carousel auto-plays (5s), pauses on hover/focus/keyboard, stops on reduced-motion
- [ ] No overflow at 320/375/768/1440px (existing overflow test extended)
- [ ] Slide markup structurally unchanged when swapping `<img>` → `<video>`
- [ ] All contract tests pass after updating section count and media assertions
