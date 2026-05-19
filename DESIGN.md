# Portfolio Web Design Direction

This document defines the next visual direction for the portfolio. The current site is a working MVP; the next pass should make it feel more personal, more mobile-engineering oriented, and less like a generic dark landing page.

## Design goal

Create a professional but distinctive portfolio for **Mercedes Franchesca Gonzalez Cejas**, positioned as a **Software Engineer specialized in Flutter and mobile development**.

Use **Mercy** as the short personal brand/name in compact UI areas such as the navigation mark. The hero should show the full name at least once for recruiter clarity and consistency with LinkedIn/GitHub/GitLab.

The site should communicate three things quickly:

1. She builds real mobile products, not just demos.
2. Her strongest area is Flutter/mobile, with Android/iOS and backend awareness.
3. Her work style values clean architecture, maintainability, product thinking, and delivery quality.

## Visual direction

| Area           | Direction                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| Mood           | Dark, calm, technical, polished, slightly personal                                                   |
| Brand feel     | Professional portfolio with subtle Kagerae-inspired identity                                         |
| Shape language | Rounded cards, soft borders, layered panels, restrained glow                                         |
| Color base     | Deep navy/slate background                                                                           |
| Accent colors  | Teal as primary; blue/cyan as secondary accents; violet only if it adds depth without stealing focus |
| Typography     | Clean sans-serif; strong hierarchy; avoid decorative fonts for now                                   |
| Motion         | Minimal; hover/focus states only until the content is stable                                         |

## Color direction

The visual identity should lean into the user's preferred colors: **teal and blue**, including multiple tones rather than a single flat accent.

Recommended palette direction:

| Role             | Color family                    | Usage                                            |
| ---------------- | ------------------------------- | ------------------------------------------------ |
| Background       | deep navy / blue-black          | page background and large sections               |
| Surface          | slate / dark teal-tinted panels | cards and content blocks                         |
| Primary accent   | teal                            | buttons, focus, badges, key highlights           |
| Secondary accent | sky / blue                      | gradients, subtle dividers, secondary highlights |
| Optional depth   | violet, very restrained         | small glow or gradient depth only                |

Avoid making the site feel neon or cyberpunk-heavy. The target is polished, calm, and technical with a teal/blue identity.

## Layout direction

### Hero

The hero should become more specific and memorable.

Current content to preserve:

```text
Software Engineer specialized in Flutter and mobile development.
```

Recommended structure:

- small eyebrow: `Mobile Software Engineer`
- large name: `Mercedes Franchesca Gonzalez Cejas`
- headline/supporting text: `Software Engineer specialized in Flutter and mobile development.`
- short supporting paragraph
- primary actions: GitLab, GitHub, LinkedIn

### About

The About section should read like a compact professional profile, not a long CV paragraph.

Recommended treatment:

- left column: section label and short context
- right column: stronger statement + compact paragraph
- optional skill chips below: `Flutter`, `Dart`, `Android/Kotlin`, `iOS/Swift`, `REST APIs`, `Clean Architecture`, `CI/CD`

### Projects

Projects should feel like proof of work.

Recommended order:

1. **InkScroller** — featured, largest card.
2. **La Mercè 2024** — production Flutter app.
3. **Barcelona a la Butxaca** — air quality feature and app maintenance/evolution.
4. **Portfolio Web** — optional smaller meta/project card.

InkScroller should visually stand out because it is the strongest portfolio project.

### Experience

The landing should separate professional experience from personal projects. This avoids making Worldline work look like personal side projects and gives recruiters faster context.

Recommended hierarchy:

1. **Worldline — Native Apps Developer** as the primary experience block.
   - La Mercè 2024: Flutter app released to production.
   - Barcelona a la Butxaca: air quality feature plus maintenance/evolution.
   - Nescafé Dolce Gusto: QA validation, Jira, test plans, device flows.
2. **Avanade — Front-End Intern** as a smaller early-career block.
   - PowerApps and Microsoft ecosystem client work.

### Education

Education should be compact and supportive, not dominant.

Include:

- Telecommunications Engineering — UPF.
- AI Development Master — BIG School, in progress.
- English B2 — EOI Vall d’Hebron.

### Contact

Contact should stay simple and not expose email publicly.

Use only:

- LinkedIn
- GitLab
- GitHub

## Content rules

- Do not publish email on the site.
- Do not link private repositories.
- Prefer public GitHub links for recruiters when a mirror exists.
- Use GitLab as source-of-truth context, but GitHub as the default public project link when available.
- Do not invent URLs for La Mercè 2024 or Barcelona a la Butxaca; add links only when confirmed.

## Component impact

Likely files for the design pass:

| File                                | Expected change                                           |
| ----------------------------------- | --------------------------------------------------------- |
| `src/styles/global.css`             | stronger background, design tokens, base visual polish    |
| `src/components/Hero.astro`         | improved hierarchy and action layout                      |
| `src/components/Summary.astro`      | shorter, more scannable profile section                   |
| `src/components/Projects.astro`     | featured project layout and responsive grid               |
| `src/components/ProjectCard.astro`  | card hierarchy, featured variant, link treatment          |
| `src/components/ContactLinks.astro` | simpler closing section with social links                 |
| `src/data/site.ts`                  | optional skill chips or richer project metadata if needed |

## Accessibility constraints

- Preserve visible focus states.
- Keep contrast high on all text and buttons.
- Avoid tiny text below `text-sm` for meaningful content.
- Do not rely on color alone to indicate featured/project status.
- Keep semantic sections and headings in logical order.

## Pencil artifact

Initial design exploration file:

```text
design/portfolio_web.pen
```

Use it for visual exploration before implementing major layout changes. The implementation source of truth remains the Astro codebase.

## Next design task

Create a first visual redesign proposal for the current landing page:

- one desktop frame
- one mobile frame
- no new content invented
- use the current content from `src/data/site.ts`
- focus on layout, rhythm, hierarchy, and visual identity
