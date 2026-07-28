# Design: InkScroller UX/UI

## Technical Approach

Keep the completed static product routes, `InkScrollerPage`, SEO, truthful EN placeholder, and single hydrated `SiteHeader` unchanged. The follow-up only extends existing home/header data and the existing three `FeaturedProject` phone frames: direct localized links come from `site.ts`; three approved local captures replace placeholders. No dropdown, gallery abstraction, client state, remote media, or dependency.

## Architecture Decisions

| Option | Tradeoff | Decision |
|---|---|---|
| Existing `LinkItem[]` vs. a new CTA model | Rendering must handle more than two links | Prepend the localized product route with an explicit CTA label; map every configured link so both repository links remain. |
| Existing `NavItem[]` vs. a product menu/dropdown | One more horizontally scrollable mobile item | Add one localized InkScroller item; `SiteHeader` admits root-relative items alongside its current anchor allowlist. |
| Project-owned mockups vs. hard-coded component assets | Adds one small data shape | `site.ts` owns ordered capture metadata shared by EN/ES project records; `FeaturedProject` only renders it. |
| Existing frames vs. gallery/carousel | Three stacked phones lengthen narrow pages | Preserve frames; stack at ≤640px and retain the three-phone row above it. |

## Data Flow

    siteContentByLocale[locale] -> App -> SiteHeader direct route
                                -> FeaturedProject -> links + 3 phone images

`site.ts` owns locale labels, canonical destinations, image order, paths, and dimensions. Components own markup only; `global.css` owns frame fit and breakpoints. The same approved Spanish evidence appears decoratively on both homes without claiming English app localization; product-page media truth remains unchanged.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/content/site.ts` | Modify | Add localized nav/product links and typed ordered mockups. |
| `src/sections/header/SiteHeader.tsx` | Modify | Render configured root-relative nav items directly. |
| `src/sections/projects/FeaturedProject.tsx` | Modify | Map all links and render three decorative images in current frames. |
| `src/styles/global.css` | Modify | Add image fit and narrow one-column frame layout; do not touch product-page CSS. |
| `public/inkscroller/home-{library,manga-detail,reader}-es-v1.jpg` | Create | Byte-for-byte approved 1080×2340 captures. |
| `src/App.test.tsx` | Modify | Hydrated home/header link and image contracts. |
| `src/localized-html-contract.test.ts` | Modify | Built-home route, asset, order, and markup contracts. |
| `src/rendered-responsive-overflow.test.ts` | Modify | Real-browser crop, intrinsic size, and overflow checks. |

## Interfaces / Contracts

```ts
type ProjectMockup = {
  src: `/inkscroller/${string}`;
  width: 1080;
  height: 2340;
};
// Project adds: mockups?: ProjectMockup[]
```

Copy only `Library Screen.jpg`, `Manga_detail screen.jpg`, and `Reader screen.jpg` from the approved download directory, respectively to the three versioned names above. Do not copy the other captures, transform bytes, generate derivatives, or reference the external source path.

Each `<img>` uses its intrinsic `width`/`height`, `loading="lazy"`, `decoding="async"`, `alt=""`, and the already `aria-hidden="true"` mockup wrapper. It fills the screen with `object-fit: cover` and top-center positioning. At 320/375px all three frames stack with transforms reset; at 768/1440px they keep the existing row. No horizontal gallery.

## Testing Strategy

| Path | Checks |
|---|---|
| `src/App.test.tsx` | EN/ES header and featured CTAs target matching canonical routes; both repository links remain; exactly three hidden empty-alt lazy images render in order. |
| `src/localized-html-contract.test.ts` | `/en/` and `/es/` built HTML contains local versioned assets, dimensions, direct links, no remote/source paths; canonical product-route assertions remain green. |
| `src/rendered-responsive-overflow.test.ts` | Both homes at 320, 375, 768, 1440: no document overflow; three images load at 1080×2340, cover their clipped screens, remain top-anchored, and the header link is keyboard reachable with visible focus. |
| Quality | Run `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run format:check`. |

## Threat Matrix

Application links change, but no executable/process/VCS boundary is crossed.

| Boundary | Applicability | Design response | Planned RED tests |
|---|---|---|---|
| Documentation-like paths | N/A: no classification/execution | None | None |
| Git repository selection | N/A: no Git invocation | None | None |
| Commit state | N/A: no commit automation | None | None |
| Push state | N/A: no push automation | None | None |
| PR commands | N/A: no PR automation | None | None |

## Migration / Rollout

No migration or flag. Roll back independently: remove the featured internal `LinkItem`; remove the header `NavItem` and root-relative admission; restore placeholder rendering/CSS while leaving links; then delete unreferenced assets. Product routes, `InkScrollerPage`, `BaseLayout`, product content, reduced-motion baseline, and `vercel.json` remain intact.

## Open Questions

None.
