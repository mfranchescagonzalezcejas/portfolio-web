## Exploration: inkscroller-product-ui

Sub-change under `inkscroller-ux-ui` (PR 1 + PR 2 already shipped). Scope is the visual/narrative redesign of the canonical localized product pages `/es/proyectos/inkscroller` and `/en/projects/inkscroller`, including finally wiring in the three approved Spanish captures that are already on disk.

### Current State

`src/layouts/InkScrollerPage.astro` is a single 70rem column with six stacked sections, all text-first:

| # | Section | Layout | Media? |
|---|---|---|---|
| 1 | `inkscroller-hero` | eyebrow + h1 + description, single column | none |
| 2 | proof strip | title + 3-item `<ul>` | none |
| 3 | capabilities | 1-col mobile, 3-col grid ≥768px (h2 spans full) | none |
| 4 | editorial story `01 → 02 → 03` | single column ordered list, mono numerals | none |
| 5 | `inkscroller-media` | bordered card, single image capped at `width: min(100%, 22rem)` (352px) | one image OR placeholder |
| 6 | `inkscroller-beta` | bordered card, secondary pill CTA at the end | none |

`src/content/inkscroller.ts` declares `media: ProductMedia` as a single `capture | placeholder` union, and BOTH locales currently emit `kind: "placeholder"` (ES still says "Las capturas verificadas en español se añadirán en la siguiente entrega"). The three approved 1080×2340 captures live in `public/inkscroller/home-library-es-v1.jpg`, `home-manga-detail-es-v1.jpg`, `home-reader-es-v1.jpg` (verified 1080×2340, JFIF baseline, ES only) and are already used decoratively on the home `FeaturedProject` via `.featured-phone` in `src/styles/global.css` (lines 1019–1092). The product page re-implements its own ad-hoc `<img>` styling (line 77 of `InkScrollerPage.astro`) instead of reusing that device-frame primitive.

The shared device frame primitive already exists and works: `.featured-phone` (9.72rem × 19.75rem outer, 0.5rem padding, 1.8rem radius, top notch 3.5rem × 0.875rem centered at 0.625rem, screen gradient `var(--device-screen-start) → var(--device-screen-end)`, `object-fit: cover; object-position: top center`, transform stagger for `.featured-phone-1/3` translateY 1.1rem and `.featured-phone-2` translateY -0.35rem, stack vertical ≤640px with transforms reset). The `--hero-device-outer/inner`, `--device-notch`, `--device-screen-start/end`, `--device-line-strong/muted` color tokens are all live in both themes. The only thing missing on the product page is the intent to use them.

Contract surface today (`src/localized-html-contract.test.ts` lines 1031–1102): asserts `sectionText.length === 6`, last section contains beta text, `.inkscroller-media img` is null on both routes (will flip for ES), placeholder disclosure strings are in body.

### Affected Areas

- `src/content/inkscroller.ts` — change `media` from single capture/placeholder to a list shape (`media: ProductMedia[]`); flip ES to three capture entries referencing the approved assets with real `alt` text; add a new `highlights: { eyebrow, title, body, screen }[]` field for the sectioned feature blocks; add `stepScreens: { library, detail, reader }` keys so each story step can name its paired screen.
- `src/layouts/InkScrollerPage.astro` — replace the six-section linear stack with a hero-with-floating-screen, alternating `feature + screen` blocks, a `01 → 02 → 03` story where each step is a labeled device card, a three-device fan strip reusing `.featured-phone` primitive (or a new `.product-phone` variant scoped to this page), and the unchanged secondary beta CTA. Update the in-file `<style>` block.
- `src/styles/global.css` — only if a new `.product-phone` scoped variant is preferable to reusing `.featured-phone`; otherwise the page stays self-contained.
- `public/inkscroller/` — no new assets; reuse the three approved ES captures. No new EN assets (placeholder stays honest).
- `src/pages/es/proyectos/inkscroller.astro` and `src/pages/en/projects/inkscroller.astro` — unchanged (they just forward to the page).
- `src/localized-html-contract.test.ts` — adjust section count, heading IDs/alt-text/three-image ES order assertions, EN placeholder text stays asserted.
- `src/rendered-responsive-overflow.test.ts` — add a new product-route block at 320/375/768/1440px asserting: no overflow, three device frames contained, screen aspect ≈ 1080/2340, EN has zero `<img>` inside `.inkscroller-media` area, alt text present on ES, focus order across new sections.
- `src/App.test.tsx` — only if header/SiteHeader needs the new in-page anchors (likely not; the page uses existing localized home anchors).

### Real product-page patterns to reference

| Pattern | Origin | Why it matters here |
|---|---|---|
| Hero with one large floating product screen on the right, copy anchored on the left, monospace metadata strip below | **Linear** (`linear.app`) | Same dark editorial palette, same `Space Grotesk` display + `JetBrains Mono` accent (we already have both fonts and the `--accent-teal` token). The single dominant screen sets the product's visual language before any sectional proof. |
| Alternating two-column blocks: copy one side, single device frame the other, alternating left/right per feature | **Stripe** product pages (`stripe.com/payments`, `stripe.com/tax`) | Lets each capability get its own screen context without forcing all three phones into one column. Pairs well with the three already-approved Spanish captures (Library → Save, Manga detail → Continue, Reader → Focused interface). |
| Three-device fan behind the page, then a numbered "How it works" rail where each step shows a labeled phone card | **Figma Config** and **Pitch** changelog pages | Reuses the exact `.featured-phone` primitive we already shipped (transforms stagger the row; `object-position: top center` keeps the header visible at any device height). |
| `01 → 02 → 03` editorial rail with monospace numerals, each step as a card with a small screen next to the title | **Notion template pages**, **Reflect.app** changelog | Reuses the existing `01/02/03` story pattern but adds the missing visual: today the steps are pure prose, the user has to scroll to the bottom to see one tiny image. |
| Honest non-capture preview card on the EN side (brand-tinted, labeled "preview", not a fake screenshot) | **Vercel** and **Linear** before their launch pages have real assets | The EN placeholders are honest today; the redesign must keep that honesty. A simple bordered card with the existing `section.eyebrow` typography and the disclosure text reads as intentional, not missing. |

### Approaches

#### 1. Alternating feature-screen blocks + labeled story rail + three-device fan (recommended shape)

Layout flow:
- **Hero** — two-column from ≥768px (`hero-copy` left, `hero-screen` right with the **Library** capture in a single `.featured-phone`-styled device). On mobile, copy first, then the phone below at full width but max 18rem.
- **Proof strip** — three pill items (or `<ul>` of short strings), unchanged conceptually, full-width below the hero.
- **Highlights** — three alternating blocks. Block 1: copy left, **Manga detail** device right. Block 2: copy right, **Reader** device left. Block 3: copy left, a small UI fragment (icon + text, no phone) right, capping the highlights with a quiet "what the app does not do" beat that keeps the page honest about scope.
- **Story `01 → 02 → 03`** — each step is a card with the mono number, title, description, AND a small `6:13` device thumbnail paired to that step (Find → Library, Save → Manga detail, Continue → Reader). At ≥1024px, three cards in a row; at <1024px they stack.
- **Three-device fan** — the same `.featured-phone` triplet from the home page (transforms staggered), 9.72rem × 19.75rem, captioned below ("Library · Detail · Reader"), optional.
- **Beta CTA** — unchanged: secondary, bordered, last, 44px target.

Pros: every capability is paired to a real screen, the page reads top-to-bottom as `claim → evidence → claim → evidence` which is what product pages from Linear/Stripe do, EN placeholder is a single labeled card not a missing chunk, the device frame primitive is reused (no new CSS surface), responsive collapse is straightforward (each block stacks, devices scale down, three-device fan stacks vertical at ≤640px).
Cons: alternating blocks can feel busy if every block alternates — mitigated by making Block 3 a text-only beat. Three-device fan at the bottom is a small redundancy with the story rail thumbnails; acceptable if its job is "let the visitor see all three at once with the staggered hero composition".
Effort: Medium.

#### 2. Single hero device + grid of small feature tiles (Notion / Superhuman shape)

One large phone carrying the Library capture in the hero (centered or right-anchored), then a 2×2 (or 1×3 ≥1024px) grid of feature tiles below. Each tile is a 6:13 device thumbnail plus a 2-line caption. No alternating blocks. Story `01 → 02 → 03` becomes a horizontal rail above the grid.

Pros: visually simpler, fewer "fancy" CSS patterns, easier to keep overflow-free at 320px, single device-frame size, fast to scan.
Cons: every tile competes for attention; with only three Spanish captures the grid either repeats them or feels sparse; loses the editorial cadence of alternating evidence.
Effort: Low–Medium.

#### 3. Single super-large tilted device with a vertical feature list beside it (Headway/Reflect shape)

One big tilted device carries the **Reader** capture, copy flows in a single column to the right, story steps become a single timeline. Uses a stronger color treatment (teal glow behind the device).

Pros: dramatic, works well for a single hero visual.
Cons: only uses one of the three approved captures, the tilt interacts poorly with reduced-motion users and small screens, the glow risks looking like marketing rather than a portfolio piece, and it does not use the existing `.featured-phone` stagger primitive we already validated.
Effort: Medium–High.

### Recommendation

**Approach 1** — alternating feature-screen blocks + labeled story rail + (optional) three-device fan. Rationale:

1. **Reuses the device frame primitive that already shipped in the home page**, which means we inherit the responsive behavior (≤640px stack, transforms reset, top-centered object-fit crop) that the overflow test already proves across 320/375/768/1440px for the same screen bytes.
2. **Uses all three approved Spanish captures** in context: Library anchors the hero, Manga detail proves the "save" claim in a highlight, Reader proves the "continue" claim AND appears in the story rail AND the closing fan. Each screen has a job.
3. **Keeps EN truthful**: the same shape is rendered, but each device slot becomes a labeled placeholder card with the existing disclosure string. The visitor cannot mistake it for a missing image — the placeholder is part of the layout, not a gap.
4. **Fits the editorial tone**: the dark `oklch(0.2 0.025 250)` surface, teal `oklch(0.74 0.13 190)` accent, `Space Grotesk` display + `JetBrains Mono` numerals, hairline `--border` dividers are already the system. We are rearranging the existing primitives, not introducing a new visual language.
5. **Stays within the 400-line review budget per PR** if split into two chained PRs (see Effort): PR A wires the new content model + ES captures + EN placeholder copy; PR B ships the new layout markup + scoped CSS + updated contracts. Each PR is autonomous and rollback-bounded.

The Hero `01 → 02 → 03` editorial cadence stays — that is one of the parent change's validated contracts (`sectionText` order) and is genuinely the strongest part of the current page. The redesign ADDS the missing visual evidence to each step and to the proof/capabilities sections, rather than inventing a new structure.

### Risks

| Risk | Mitigation |
|---|---|
| Alternating blocks push the page past 1440px readable width | Constrain `.inkscroller-page` to `min(100% - 2rem, 80rem)` (was 70rem); every block maxes at `min(100%, 36rem)` per side; overflow test already asserts `documentElement.scrollWidth === width` at 1440. |
| Three uses of the same screenshots (hero, highlights, story rail, fan) feel repetitive | Cap usage: hero = Library, highlights = Manga detail + Reader, story rail thumbnails = the same three at smaller size (12rem), closing fan = the triplet. The screenshots are different views of the app so they read as proof, not as one image repeated. |
| EN placeholder card looks like a broken image | Style it with the same `.surface` background, `--accent-teal` top border, mono label, and the existing disclosure string — same dimensions as the device it replaces. The overflow test will assert EN has zero `<img>` inside `.inkscroller-media` and that the placeholder is keyboard-reachable. |
| The localized-html-contract test's `sectionText.length === 6` and `.inkscroller-media img === null` assertions break | Bump to the new count (likely 7–8 sections: hero, proof, 3 highlights, story, fan, beta) and split `.inkscroller-media` per-screen contract for ES vs EN. The proposal must call this out explicitly. |
| New authored text blows past 400-line PR budget | Two-PR chain: PR A (content + ES capture wiring + EN placeholder copy) ≈ 200 lines, PR B (new layout + scoped CSS + contract updates) ≈ 300–400 lines. Both auto-rollable back independently. |
| Reusing `.featured-phone` primitive on the product page couples the two pages | Either accept the coupling (it is small and intentional: same screens, same device treatment) or add a thin `.product-phone` modifier that extends the same base class. The proposal should pick one explicitly. |
| Reduced-motion users see awkward layout when transforms stagger the fan | The existing `.featured-phone` reset at `prefers-reduced-motion: reduce` already nulls the stagger; the new layout inherits it. Add one assertion in the overflow test. |

### SDD scope split

| Phase | What ships | Why |
|---|---|---|
| `sdd-propose` | Lock the chosen approach, list the four sub-changes, name PR-A/PR-B split, call out the contract-count change and the ES `<img>` flip. | The parent change's proposal left this as "foundational + first slice"; the new proposal is the visual redesign that depends on that foundation. |
| `sdd-spec` | Add `ADDED` requirements for: alternating feature-screen blocks, labeled story step, EN placeholder styling, 6:13 device frame reuse, responsive contract at 320/375/768/1440. Add `MODIFIED` for the existing `Local-Tone Content` and `Final Secondary Beta CTA` requirements to reflect the new media shape. | The current `inkscroller-product-pages` spec at `openspec/changes/inkscroller-ux-ui/specs/inkscroller-product-pages/spec.md` covers routes, link semantics, and media truthfulness but says nothing about layout composition. The new requirements close that gap. |
| `sdd-design` | Decide `.featured-phone` reuse vs. `.product-phone` variant. Document the alternating grid, the story rail pairing, and the EN placeholder treatment. Provide sequence/note for the `ProductMedia[]` shape. | The parent change's design.md covers data flow for the FOUNDATION; the new design.md covers LAYOUT composition. |
| `sdd-tasks` | Forecast the 400-line budget, recommend chained PRs (PR A: content + ES capture wiring + EN copy; PR B: layout + CSS + contract updates), include `Decision needed before apply: No`, `Chained PRs recommended: Yes`, `400-line budget risk: Medium`. | Direct SDD require: the parent change shipped as `auto-chain`/`feature-branch-chain`; this sub-change must declare the same. |
| `sdd-apply` | Two PRs, each with focused tests, responsive browser harness, and rollback boundary. | Avoids the 400-line cliff and gives reviewers a clean diff per slice. |
| `sdd-verify` | Re-run the full suite, the overflow test with the new product-route cases, and Chrome visual checks at 320/375/768/1440px in light/dark + reduced-motion. | The parent change's verify report already covers routes and home media; the new verify adds product-page media in ES and product-page layout in both locales. |

### Ready for Proposal

Yes. Proceed to `sdd-propose` with Approach 1 (alternating feature-screen blocks + labeled story rail + optional three-device fan), chained PRs A and B, and explicit amendment of the existing `inkscroller-product-pages` spec.

Direct-implementation candidates that do NOT need their own SDD cycle: the `.product-phone` variant decision (small, in-scope of `sdd-design`); the responsive test extension (mechanical addition to `rendered-responsive-overflow.test.ts`, in-scope of the tasks). No new dependencies, no new captures, no carousel, no remote media.
