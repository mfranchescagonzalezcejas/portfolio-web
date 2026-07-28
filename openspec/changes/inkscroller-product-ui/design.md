# Design: Inkscroller Product UI — Compact Visual Redesign

## Technical Approach

Replace sections 3–5 (capabilities, story, media) with a CSS scroll-snap carousel driven by a lightweight JS timer. The hero becomes a two-column grid at ≥768px: copy left, a single `.featured-phone` device frame with the Library capture right. The content model shifts from single `ProductMedia` to `ProductMedia[]`, where each entry carries title, description, and a media slot (capture, placeholder, or future video). Reuse the existing `.featured-phone` device frame primitive; carousel slides drop the home-page-specific transform modifiers. Scoped styles in `InkScrollerPage.astro` handle page-specific layout; global CSS gains only the carousel container block.

## Architecture Decisions

| Decision | Option | Tradeoff | Choice |
|---|---|---|---|
| Device frame primitive | Reuse `.featured-phone` | Zero new CSS surface, inherits proven responsive behavior | **Reuse** — no `.product-phone` variant |
| | Create `.product-phone` | Clean separation, but duplicates 40+ lines of frame CSS | Rejected |
| Carousel driver | CSS scroll-snap + 10-line JS timer | Native snap, degrades without JS, no dependency | **Chosen** |
| | Swiper/glide library | More features, but adds dependency and bundle size | Rejected |
| Auto-play pause | `:hover` / `:focus-within` CSS + JS `mouseenter`/`focusin` | Simple, accessible, works with keyboard | **Chosen** |
| | IntersectionObserver only | Doesn't catch keyboard focus inside carousel | Rejected |
| EN placeholder shape | Styled box inside `.featured-phone-screen` | Same dimensions as device, reads as intentional | **Chosen** |
| | Standalone card outside frame | Breaks carousel rhythm, looks like missing content | Rejected |

## Data Flow

```
inkscrollerContent[locale].media: ProductMedia[]
  → InkScrollerPage.astro maps → .featured-phone per slide
  → screen slot: <img> (ES) | placeholder <div> (EN) | <video> (future)
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/content/inkscroller.ts` | Modify | `media: ProductMedia` → `media: ProductMedia[]` (3 entries per locale) |
| `src/layouts/InkScrollerPage.astro` | Modify | Two-column hero; replace sections 3–5 with carousel; add scoped `<style>` |
| `src/styles/global.css` | Modify | Add `.inkscroller-carousel` block (~35 lines) |
| `src/localized-html-contract.test.ts` | Modify | Bump section count; assert 3 ES slides; assert EN placeholder |
| `src/rendered-responsive-overflow.test.ts` | Modify | Add product-route overflow cases at 320/375/768/1440px |

## Interfaces / Contracts

```typescript
// src/content/inkscroller.ts
export type ProductMedia =
  | { kind: "capture"; src: `/inkscroller/${string}`; alt: string; width: number; height: number }
  | { kind: "placeholder"; label: string; disclosure: string }
  | { kind: "video"; src: string; alt: string; width: number; height: number }; // video-ready

type SlideMeta = { title: string; description: string };

type InkScrollerContent = {
  // ...
  media: Array<ProductMedia & SlideMeta>;
};
```

Slide markup contract: the `.featured-phone-screen` child may be `<img>`, `<video>`, or a placeholder `<div>` without changing ancestor structure.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit | — | N/A (markup-only change) |
| Integration | Section count, ES img presence, EN placeholder honesty | Update `localized-html-contract.test.ts` |
| E2E | Overflow, device frame containment, reduced-motion | Extend `rendered-responsive-overflow.test.ts` with product-route cases |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Rollback: revert `InkScrollerPage.astro` to six-section stack and restore single `ProductMedia`.

## Open Questions

None.
