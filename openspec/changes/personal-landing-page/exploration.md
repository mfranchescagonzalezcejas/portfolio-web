## Exploration: personal-landing-page

### Current State
The repository is in bootstrap state only: Git metadata, a template README, and OpenSpec scaffolding are present. There is no application runtime, no build tooling, no dependency manager lockfile, no source directory, and no test/lint/type-check setup yet.

### Affected Areas
- `openspec/config.yaml` — establishes baseline constraints (no detected stack, no test runner, strict TDD disabled).
- `openspec/specs/` — currently empty baseline specs; later phases will define product behavior.
- `openspec/changes/personal-landing-page/` — active change folder where proposal/spec/design/tasks artifacts should be created in next phases.
- `README.md` — currently GitLab template content, likely to be replaced once implementation starts (outside this explore phase).

### Approaches
1. **Simple static HTML/CSS (optionally tiny vanilla JS)** — hand-written single-page site served as static files.
   - Pros: Lowest complexity, fastest path to first deploy, near-zero dependencies, very low maintenance.
   - Cons: Manual component reuse, less ergonomic scaling if portfolio grows into blog/content-heavy site.
   - Effort: Low

2. **Astro** — content-first static site with islands architecture.
   - Pros: Excellent for personal/marketing pages, strong performance defaults, easy markdown/content sections, can add framework islands only where needed.
   - Cons: Slightly higher setup complexity than pure static HTML/CSS, introduces build pipeline and project conventions.
   - Effort: Medium

3. **Vite + React** — SPA-style setup using React and Vite tooling.
   - Pros: Familiar component model, strong ecosystem, easy future growth into interactive app features.
   - Cons: More tooling/runtime overhead than needed for a simple landing page, hydration/client JS can be heavier by default.
   - Effort: Medium

### Recommendation
Recommend **Astro** as the default for this change because it balances simplicity and long-term flexibility for a personal landing page: static-first output, excellent performance, and clean content structure without committing to full SPA complexity. If the immediate goal is strictly “ship a one-page card today,” static HTML/CSS is an acceptable fast-track alternative.

Short IDE note: VS Code (or VSCodium) with Prettier + ESLint provides the smoothest setup for Astro/React scaffolding and markdown-heavy content editing.

### Risks
- Tooling decision churn risk: starting with React SPA may add unnecessary complexity for current scope.
- Scope creep risk: adding blog/CMS/advanced animations too early can delay launch of core personal page.
- Missing quality baseline risk: with no runner configured yet, future phases must explicitly define lint/test/build commands.

### Ready for Proposal
Yes — proceed to `sdd-propose` with Astro as primary approach and static HTML/CSS as fallback, including clear scope boundaries for an MVP landing page.
