# Proposal: Personal Landing Page

## Intent

Create a fast, accessible personal landing MVP that introduces the owner, communicates professional value, highlights selected work, and provides clear contact paths.

## Scope

### In Scope
- Astro + Tailwind static frontend for hero, summary, featured projects, and contact/social links.
- InkScroller as a featured project with concise description and external links.
- Responsive, semantic, accessible structure with metadata and performance-minded defaults.
- Vercel-ready production build and minimal quality gates.
- GitLab Issues/Boards as the implementation tracking workflow.

### Out of Scope
- Blog, CMS, newsletter, dynamic content, or editorial workflows.
- Advanced animations, auth, APIs, dashboards, or app-like features.
- Backend services in this MVP; Railway remains reserved for the InkScroller backend.
- Jira tracking and Vite/React SPA setup.

## Capabilities

### New Capabilities
- `personal-landing-page`: Visible MVP content, project highlighting, link behavior, accessibility, responsiveness, deploy target, and quality gates.

### Modified Capabilities
- None.

## Approach

Build a static-first Astro site styled with Tailwind. Keep content data simple and local, feature InkScroller prominently, and deploy through Vercel. Track work in GitLab Issues/Boards. Add only the tooling needed for format/lint/type/build verification.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/` | New | Astro pages, layouts, components, content data, and Tailwind styles. |
| `public/` | New | Static assets such as icons or images. |
| `package.json` | New | Astro/Tailwind dependencies and build/quality scripts. |
| `astro.config.*`, `tailwind.config.*` | New | Static site and styling configuration. |
| `README.md` | Modified | Replace bootstrap template with local setup and build instructions. |
| `openspec/specs/personal-landing-page/spec.md` | New | Product behavior spec created in the spec phase. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Scope creep delays launch | Med | Keep blog/CMS/animations/backend explicitly deferred. |
| Tooling overhead exceeds MVP needs | Low | Use only Astro, Tailwind, and minimal quality scripts. |
| Deployment mismatch | Low | Target Vercel from the start and verify production build locally. |
| Tracking drift | Low | Keep implementation tasks mirrored in GitLab Issues/Boards. |

## Rollback Plan

Revert implementation commit(s), remove Astro/Tailwind/Vercel config, and restore the bootstrap README if tooling or deployment causes friction. OpenSpec artifacts remain as audit trail until archive or cancellation.

## Dependencies

- Final personal copy, contact/social URLs, InkScroller links, and preferred assets.
- Node/package manager choice and Vercel project access.

## Success Criteria

- [ ] Site presents hero, summary, InkScroller/selected projects, and contact/social links.
- [ ] Layout works on mobile and desktop with semantic, keyboard-friendly markup.
- [ ] Production build, minimal quality gates, and Vercel deployment path are verified.
