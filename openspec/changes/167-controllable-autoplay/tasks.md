# Tasks: Controllable InkScroller Autoplay

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 400–520 across 7 files |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: localized/static hero shell; PR 2: controller and behavior contracts |
| Delivery strategy | auto-chain |
| Chain strategy | feature-branch-chain |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|---|---|---|---|---|---|
| 1 | Add labels, control, two-layer hero markup, and CSS contracts | PR 1 | `npx vitest run src/localized-html-contract.test.ts src/styles/global-css-contract.test.ts` | `npm run test -- src/localized-html-contract.test.ts src/styles/global-css-contract.test.ts`; no browser harness configured | Revert content/layout/style files and their static contracts |
| 2 | Add shared timers, precedence, teardown, and motion tests | PR 2 | `npx vitest run src/lib/carousel-render.test.ts` | `npm run test -- src/lib/carousel-render.test.ts`; jsdom/fake timers are the configured runtime harness | Revert carousel-render controller and unit tests |

## Phase 1: Static Contract

- [x] 1.1 Add EN/ES `pauseLabel` and `playLabel` values in `src/content/inkscroller.ts`; verify both locale objects expose `Pause`/`Play` and `Pausar`/`Reproducir` with the static contract command above.
- [x] 1.2 Update `src/layouts/InkScrollerPage.astro` with exactly one native toggle immediately after `#inkscroller-carousel`, initial `aria-pressed="false"`, localized data labels, and sibling current/next theme-aware hero pictures/capture payload; verify EN/ES generated HTML and both layer data with `npx vitest run src/localized-html-contract.test.ts`.
- [x] 1.3 Add persistent control placement, visible focus, 44px target, and reduced-motion hero rules in `src/styles/global.css`; verify selector/property contracts with `npx vitest run src/styles/global-css-contract.test.ts`.

## Phase 2: Controller Integration

- [x] 2.1 Extend `initializeInkScrollerPage(document)` in `src/lib/carousel-render.ts` with document-local teardown, `userPaused`, hover/focus sets, reduced-motion snapshot, and `syncAutoplay()` owning 5s carousel and 4.5s hero intervals; verify type/lint with `npm run typecheck && npm run lint`.
- [x] 2.2 Implement toggle semantics, 450ms staged hero commit, overlap protection, manual-navigation preservation, theme-source synchronization, and cleanup of intervals/timeouts/observers/clones in `src/lib/carousel-render.ts`; verify `npm run typecheck`.

## Phase 3: Verification

- [x] 3.1 Extend `src/lib/carousel-render.test.ts` with fake-timer tests for both cadences, toggle/ARIA labels, reduced-motion startup and explicit Play, hover/focus precedence, stale-transition cancellation, reinitialization, and paused arrows/dots/keyboard navigation; verify `npx vitest run src/lib/carousel-render.test.ts`.
- [x] 3.2 Extend `src/localized-html-contract.test.ts` and `src/styles/global-css-contract.test.ts` for exact EN/ES control output, two hero layers, theme dimensions/sources, focus target, and reduced-motion CSS; verify `npm run test`.
- [x] 3.3 Run final repository verification: `npm run test && npm run typecheck && npm run lint && npm run format:check && npm run build`; confirm all spec scenarios pass and no E2E task is added because no E2E runner is configured.
