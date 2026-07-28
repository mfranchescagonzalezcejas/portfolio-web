# InkScroller Product Pages Specification

## Purpose

Specify localized InkScroller discovery and product pages.

## Requirements

### Requirement: Canonical Localized Product Routes

The system MUST serve static canonical ES and EN pages with matching copy and no locale-home fallback.

#### Scenario: Spanish canonical route

- GIVEN a request for `/es/proyectos/inkscroller`
- WHEN it renders
- THEN it returns the Spanish product page, not Spanish home.

#### Scenario: English canonical route

- GIVEN a request for `/en/projects/inkscroller`
- WHEN it renders
- THEN it returns the English product page, not English home.

### Requirement: Locale-Correct Discovery Links

The featured home card and `SiteHeader` MUST directly target the canonical route for their locale. `SiteHeader` MUST NOT use a dropdown or menu for InkScroller.

#### Scenario: Featured-card link

- GIVEN either localized home page
- WHEN the featured InkScroller card is activated
- THEN it opens that locale's canonical InkScroller route.

#### Scenario: Header link

- GIVEN `SiteHeader` in either locale
- WHEN InkScroller navigation is activated
- THEN one direct link opens the matching route without a menu.

### Requirement: Localized Content and Truthful Media

The system MUST provide localized hero, proof, capability-value, and `01 → 02 → 03` content. Spanish media MUST use verified local 6:13 captures. English media MUST be an explicit non-capture preview and MUST NOT imply an English screenshot exists.

#### Scenario: Spanish product evidence

- GIVEN the Spanish product page
- WHEN product media is inspected
- THEN every displayed capture is verified, local, and Spanish.

#### Scenario: English product preview

- GIVEN no genuine English capture exists
- WHEN the English media area renders
- THEN it states that it is not a capture.

### Requirement: Home Phone-Frame Evidence

Existing home phone frames MUST show the approved Spanish Library, Manga detail, and Reader captures as decorative evidence. They MUST lazy load with intrinsic dimensions. English home content MUST NOT imply English screenshots.

#### Scenario: Approved lazy captures

- GIVEN the home phone frames render
- WHEN their media is inspected
- THEN all three are decorative, deferred offscreen, and reserve intrinsic space.

#### Scenario: Truthful English home

- GIVEN the English home page shows phone-frame evidence
- WHEN a visitor encounters a supplied capture
- THEN it is not represented as an English screenshot.

### Requirement: Responsive and Accessible Presentation

Product pages MUST preserve keyboard order and visible focus. Phone captures MUST crop within frames. Home and product layouts MUST NOT overflow from 320px through 1440px.

#### Scenario: Keyboard interaction

- GIVEN a keyboard-only product-page visitor
- WHEN focus advances through controls
- THEN each control is reachable in reading order with visible focus.

#### Scenario: Responsive layouts

- GIVEN home and product pages at 320px, 375px, 768px, or 1440px
- WHEN their sections and phone frames render
- THEN content is usable and captures are contained, cropped, and overflow-free.

### Requirement: Final Secondary Beta CTA

The beta CTA MUST follow primary content, remain secondary, and state beta status without promising unavailable access or functionality.

#### Scenario: CTA hierarchy

- GIVEN a visitor reads a product page
- WHEN the beta CTA appears
- THEN it follows narrative and media as a secondary action.

#### Scenario: Unavailable beta access

- GIVEN enrollment is unavailable
- WHEN the CTA renders
- THEN it does not claim immediate access or completed signup.

### Requirement: Motion Preferences and Validation

The system MAY use CSS-only motion but MUST suppress non-essential motion for reduced-motion users. Validation MUST cover routes, truthful media, links, frames, focus, CTA placement, and viewport overflow.

#### Scenario: Reduced motion

- GIVEN a visitor prefers reduced motion
- WHEN either product page renders
- THEN non-essential motion is suppressed without removing content.

#### Scenario: Release validation

- GIVEN localized home and product pages are release-ready
- WHEN both locales are checked at 320px, 375px, 768px, and 1440px
- THEN all specified behaviors pass without a locale-home fallback.
