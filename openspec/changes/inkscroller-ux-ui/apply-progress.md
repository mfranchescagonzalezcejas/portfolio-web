# Apply Progress: InkScroller UX/UI — PR 1 Foundation + PR 2 Home Discovery/Media

## Delivery

- Strategy: `auto-chain`; chain strategy: `feature-branch-chain`.
- PR 2 is the home discovery/media slice, based on PR 1 and targeting its immediate branch.
- Excluded: product-route, SEO/content, beta-CTA, reduced-motion baseline, `vercel.json`, remote media, dependencies, menus/galleries, commits, pushes, and GitHub changes.

## Completed Tasks

- [x] 1.1–1.4 Canonical product page foundation.
- [x] 2.1 Product-route build-output contracts.
- [x] 3.1–3.4 Product layout, reduced motion, verification, and restored shared header.
- [x] 4.1 Approved Library, Manga detail, and Reader images copied byte-for-byte as local versioned 1080×2340 JPEGs.
- [x] 4.2 Locale-correct header and featured canonical destinations plus typed ordered mockups; repository links retained.
- [x] 4.3 Direct links and three decorative lazy images rendered without a menu/gallery abstraction.
- [x] 4.4 Scoped cover/top-center frame fitting and ≤640px stacking.
- [x] 5.1–5.4 Hydrated/build/browser contracts and validation completed.

## Work Unit Evidence

| Evidence | Result |
|---|---|
| Focused test | `npm run test -- src/App.test.tsx src/localized-html-contract.test.ts` — exit 0; 2 files, 56 tests passed. |
| Full regression | `npm run test` — exit 0; 8 files, 80 tests passed. |
| Quality | `npm run typecheck`, `npm run lint`, and `npm run format:check` — all exit 0; typecheck reported 0 errors, warnings, and hints. |
| Runtime/browser | `npm run build && npx vitest run src/rendered-responsive-overflow.test.ts` — exit 0; 9 tests passed for EN/ES at 320/375/768/1440px. |
| Asset integrity | `file` + three `cmp -s` checks — exit 0; exactly three approved byte-for-byte 1080×2340 JPEGs. |
| Rollback | Revert only the PR 2 home/header data, featured markup/CSS, three assets, and PR 2 contracts; retain PR 1 product pages. |

## Diff / Review Budget

- PR 2 authored text: `+300/-75` = **375 changed lines** (binary JPEGs excluded).
- Budget: 375/800.

## Notes

- The Spanish captures are decorative on both homes and do not claim English app localization.
- Canonical routes, EN product-preview truthfulness, header restoration, beta CTA, and unrelated work remain unchanged.
- Strict TDD mode was inactive.
