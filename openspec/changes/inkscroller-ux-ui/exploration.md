## Exploration: inkscroller-ux-ui

### Current State
The clean `feat/inkscroller-ux-ui` branch is identical to `develop` and contains no canonical InkScroller page, InkScroller page data module, screenshots, or `/es/proyectos/inkscroller` and `/en/projects/inkscroller` source routes. Vercel's locale catch-all rewrites currently send those URLs to the localized home page. The product is represented only by the home-page featured project and repository links.

The earlier product-page audit therefore cannot be reproduced on this branch. The underlying header issue remains relevant: at mobile widths the existing header deliberately scrolls its navigation and hides its contact CTA; its language toggle and theme button are below a 44px target. Existing CSS already provides a reduced-motion baseline for hero/project hover effects.

### Affected Areas
- `src/pages/es/proyectos/inkscroller.astro` and `src/pages/en/projects/inkscroller.astro` — new static route entry points required before product-page UX can exist.
- `src/layouts/InkScrollerPage.astro` — a localized, static-first page composition; do not retrofit the home-page layout.
- `src/content/inkscroller.ts` — typed ES/EN product copy, proof points, progression content, links, and explicit preview state.
- `src/styles/global.css` — page-scoped responsive layout, 44px targets, and reduced-motion-safe micro-interactions; also the shared header rules if the mobile defect is fixed in this slice.
- `public/inkscroller/` — only verified, local ES captures; EN must use an honest non-capture treatment until real English captures exist.
- `vercel.json` — verify route behavior after static paths are introduced; retain locale fallback behavior.
- `src/localized-html-contract.test.ts` and `src/rendered-responsive-overflow.test.ts` — extend static-route, localization, and 320/375/768/desktop containment contracts.

### Approaches
1. **Static-first dedicated product page** — Add one localized Astro layout with typed local content, real ES screenshots, truthful EN preview states, and CSS-only interaction polish.
   - Pros: Matches the existing Astro architecture, preserves static output, needs no dependency or remote asset, and gives a coherent narrative foundation.
   - Cons: Requires page and content primitives before visual enrichment.
   - Effort: Medium

2. **Enrich the existing home featured-project card** — Add proof, progression, and screenshots to `FeaturedProject`.
   - Pros: Smaller initial diff and reuses existing component/data flow.
   - Cons: Cannot establish canonical URLs, makes the home page carry case-study complexity, and does not solve localized page semantics.
   - Effort: Low

3. **Interactive showcase with a carousel or animation library** — Build a highly interactive device gallery and scroll-driven narrative.
   - Pros: More visual spectacle.
   - Cons: Conflicts with the restrained goal, adds accessibility and performance risk, and is unnecessary for the available evidence.
   - Effort: High

### Recommendation
Choose **static-first dedicated product page** as the smallest coherent first slice. Establish the two canonical routes, a typed localized content source, and one shared page layout with: a compact hero/proof strip, a capability-to-value bridge, an editorial `01 → 02 → 03` progression, locally bundled ES captures in correct 6:13 device frames, an honest EN preview treatment, and the beta CTA as the final secondary action. Use CSS-only reveal/hover polish behind `prefers-reduced-motion`; do not add a carousel, remote assets, or dependencies.

Keep the shared-header repair scoped to the same change only if both product pages use it: preserve visible keyboard access, make all controls at least 44×44px, and replace horizontal nav scrolling/hidden CTA with a responsive pattern that does not conceal the intended action. Otherwise record it as a separate shared-shell follow-up.

Validation should combine `npm run typecheck`, `npm run lint`, `npm run test`, static HTML assertions for both routes and locales, and Chrome visual checks at 320, 375, 768, and 1440px in light/dark plus reduced-motion modes. Checks must confirm no horizontal page overflow, focus visibility and keyboard order, 44px targets, screenshot aspect/crop correctness, truthful EN non-capture copy, and the beta CTA's secondary/end-of-page position.

### Risks
- The requested canonical pages and prior screenshot assets are absent from the clean base; implementation must not claim that prior browser evidence was revalidated until local assets/routes are restored.
- The broad Vercel locale catch-all may mask a missing page in development or production; route-specific build and rendered-HTML tests are required.
- Reusing Spanish screenshots as English product evidence would misrepresent the localized experience; use explicit preview copy until English captures exist.
- Shared header changes can regress the home page and existing overflow contracts; retain/add cross-route responsive checks.

### Ready for Proposal
Yes — proceed to `sdd-propose` with the dedicated static-first page as scope, explicitly noting that route/content/media creation is foundational because the clean branch has no canonical product pages. Keep the unrelated `personal-landing-page` change untouched.
