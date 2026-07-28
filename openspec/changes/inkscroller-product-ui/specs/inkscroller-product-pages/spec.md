# Delta for Inkscroller Product Pages

## MODIFIED Requirements

### Requirement: Localized Content and Truthful Media

The system MUST provide localized hero, proof, and carousel content. Spanish media MUST use verified local 6:13 captures arranged as a three-slide carousel. English media MUST be explicit non-capture placeholder cards inside `.featured-phone` frames and MUST NOT imply an English screenshot exists. The content model MUST expose `media` as `ProductMedia[]` aligned to carousel slide order.

(Previously: `media` was a single `ProductMedia`; sections 3–5 were linear capability, story, and media blocks.)

#### Scenario: Spanish product evidence

- GIVEN the Spanish product page
- WHEN product media is inspected
- THEN the hero device shows the Library capture and the carousel contains three slides (Find, Save, Continue) with verified Spanish captures and alt text.

#### Scenario: English product preview

- GIVEN no genuine English capture exists
- WHEN the English carousel renders
- THEN each slide contains a labeled placeholder card inside a `.featured-phone` frame with the same dimensions as the Spanish device frames and zero `<img>` elements.

#### Scenario: Content model array shape

- GIVEN the content data file
- WHEN `media` is accessed
- THEN it is a `ProductMedia[]` with three entries matching carousel slide order.

### Requirement: Responsive and Accessible Presentation

Product pages MUST preserve keyboard order and visible focus. The two-column hero MUST stack vertically below 768px. Phone captures MUST crop within frames. Home and product layouts MUST NOT overflow from 320px through 1440px. Carousel auto-play MUST pause on `:hover`, `:focus-within`, and keyboard interaction, and MUST NOT activate for `prefers-reduced-motion: reduce`.

(Previously: single-column hero at all breakpoints; no carousel auto-play or pause behavior.)

#### Scenario: Two-column hero

- GIVEN a viewport ≥ 768px
- WHEN the product page renders
- THEN the hero displays copy in the left column and a `.featured-phone` device frame in the right column.

#### Scenario: Stacked hero on narrow viewports

- GIVEN a viewport < 768px
- WHEN the product page renders
- THEN the hero stacks vertically with copy above the device frame.

#### Scenario: Keyboard interaction

- GIVEN a keyboard-only product-page visitor
- WHEN focus advances through controls
- THEN each control is reachable in reading order with visible focus, including carousel arrows and dots.

#### Scenario: Responsive layouts

- GIVEN home and product pages at 320px, 375px, 768px, or 1440px
- WHEN their sections, hero grid, and carousel render
- THEN content is usable, captures are contained, cropped, and overflow-free.

### Requirement: Motion Preferences and Validation

The system MAY use CSS scroll-snap and auto-play motion but MUST suppress auto-play for reduced-motion users. Validation MUST cover routes, truthful media, links, frames, focus, CTA placement, carousel auto-play/pause, and viewport overflow.

(Previously: only CSS-only motion suppression; no carousel auto-play validation.)

#### Scenario: Reduced motion

- GIVEN a visitor prefers reduced motion
- WHEN either product page renders
- THEN carousel auto-play does not start; manual scrolling remains functional without removing content.

#### Scenario: Release validation

- GIVEN localized home and product pages are release-ready
- WHEN both locales are checked at 320px, 375px, 768px, and 1440px
- THEN all specified behaviors pass including carousel auto-play, pause controls, and overflow constraints without a locale-home fallback.

## ADDED Requirements

### Requirement: Two-Column Hero with Proof Strip

The hero section MUST use `display: grid; grid-template-columns: 1fr auto` at ≥ 768px with copy in the first column and a `.featured-phone` device frame showing the Library capture in the second column. Below 768px it MUST stack vertically. A proof strip MUST appear directly below the hero.

#### Scenario: Desktop hero layout

- GIVEN a viewport ≥ 768px on the Spanish product page
- WHEN the hero renders
- THEN copy occupies the left column and the Library capture appears in a `.featured-phone` device frame on the right.

#### Scenario: Proof strip below hero

- GIVEN the hero section
- WHEN the page renders
- THEN the proof strip appears immediately below the hero with no intervening sections.

### Requirement: Final Secondary Beta CTA Preserved

The beta CTA MUST remain the last section on the page, follow all carousel content, and retain its secondary visual weight. It MUST NOT be promoted to primary or moved above the carousel.

#### Scenario: CTA after carousel

- GIVEN a visitor reads through the product page
- WHEN they reach the end
- THEN the beta CTA is the last section, visually secondary, after the carousel.
