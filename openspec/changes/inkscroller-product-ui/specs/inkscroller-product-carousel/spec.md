# Inkscroller Product Carousel Specification

## Purpose

CSS scroll-snap carousel that replaces the linear capability/story/media sections on Inkscroller product pages. Native CSS + minimal JS timer; no library dependency.

## Requirements

### Requirement: Scroll-Snap Track

The carousel MUST use `scroll-snap-type: x mandatory` on the track and `scroll-snap-align: center` on each slide. Touch and pointer scrolling MUST work natively without JS.

#### Scenario: Native touch scroll

- GIVEN a touch-device visitor on the carousel
- WHEN they swipe horizontally
- THEN the track scrolls natively and snaps to the nearest slide center.

#### Scenario: Mouse-drag scroll

- GIVEN a desktop visitor
- WHEN they click-drag the carousel track
- THEN the track scrolls and snaps to the nearest slide.

### Requirement: Three Ordered Slides

The carousel MUST contain exactly three slides in order: Find (Library), Save (Manga detail), Continue (Reader). Each slide MUST wrap a `.featured-phone` device frame containing the slide media.

#### Scenario: ES slide content

- GIVEN the Spanish product page
- WHEN the carousel renders
- THEN slide 1 shows the Library capture, slide 2 the Manga detail capture, slide 3 the Reader capture, each with title and description.

#### Scenario: EN slide content

- GIVEN the English product page
- WHEN the carousel renders
- THEN each slide shows a labeled placeholder card inside a `.featured-phone` frame with matching dimensions and zero `<img>` elements.

### Requirement: Auto-Play with Pause Controls

The carousel MUST auto-advance every 5 seconds. Auto-play MUST pause on `:hover`, `:focus-within`, and keyboard interaction. Auto-play MUST NOT start when `prefers-reduced-motion: reduce` is active.

#### Scenario: Auto-advance

- GIVEN the carousel is visible and idle
- WHEN 5 seconds elapse
- THEN the track scrolls to the next slide, wrapping from last to first.

#### Scenario: Pause on hover

- GIVEN the carousel is auto-advancing
- WHEN the visitor hovers the track
- THEN auto-advance pauses until hover ends.

#### Scenario: Pause on focus

- GIVEN the carousel is auto-advancing
- WHEN a keyboard user focuses any control inside the carousel
- THEN auto-advance pauses until focus leaves.

#### Scenario: Reduced motion

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the carousel renders
- THEN auto-play does not start; slides remain manually scrollable.

### Requirement: Dot and Arrow Navigation

The carousel MUST provide dot indicators showing the active slide and arrow buttons for previous/next. Arrow buttons MUST be keyboard-accessible with visible focus.

#### Scenario: Dot indicators

- GIVEN the carousel renders
- WHEN slide 2 is active
- THEN the second dot is visually distinct and the others are inactive.

#### Scenario: Arrow navigation

- GIVEN the carousel is on slide 1
- WHEN the visitor activates the next arrow
- THEN the track scrolls to slide 2.

#### Scenario: Arrow keyboard access

- GIVEN a keyboard-only visitor
- WHEN focus reaches the carousel arrows
- THEN Tab reaches each arrow and Enter/Space activates it with visible focus.

### Requirement: Video-Ready Slide Container

Each slide's screen area MUST accept `<img>`, placeholder `<div>`, or `<video>` without structural markup changes. Swapping media type MUST NOT require CSS or layout changes.

#### Scenario: Image to video swap

- GIVEN a slide currently displaying an `<img>`
- WHEN the `<img>` is replaced with a `<video>` element
- THEN the slide layout, frame dimensions, and snap behavior remain unchanged.

### Requirement: Responsive Overflow Prevention

The carousel MUST NOT cause horizontal overflow at 320px, 375px, 768px, or 1440px. Each slide MUST constrain to `max-width: min(18rem, 90vw)`.

#### Scenario: Narrow viewport

- GIVEN a 320px viewport
- WHEN the carousel renders
- THEN no horizontal overflow occurs and slides remain fully visible.

#### Scenario: Wide viewport

- GIVEN a 1440px viewport
- WHEN the carousel renders
- THEN slides are centered and do not stretch beyond their device-frame dimensions.
