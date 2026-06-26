# Contributing

Thanks for helping improve this personal portfolio repository. Keep changes focused, reviewable, and aligned with the protected GitHub workflow.

## Quick path

1. Open or find an issue for the change.
2. Wait for a maintainer to add `status:approved` before opening a pull request.
3. Open a focused PR that links the approved issue and uses exactly one `type:*` label.
4. Run the quality gates before requesting review.

Choose the documentation issue form for docs-only updates. Choose the maintenance issue form for CI/workflows, dependency follow-up, repository metadata, release process, or similar upkeep.

## Protected workflow

| Requirement | Expected practice                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| Issue first | Every PR links an approved issue with `Closes #<number>`, `Fixes #<number>`, or `Resolves #<number>`. |
| Approval    | The linked issue needs `status:approved` before implementation review.                                |
| PR labels   | Add exactly one `type:*` label that matches the PR scope.                                             |
| Checks      | CI and required repository checks must pass before merge.                                             |
| Releases    | Production deploys only from pushed `v*` tags, not from ordinary branch pushes.                       |

Dependabot may open weekly dependency PRs automatically. Maintainers still triage those PRs and, when following the protected workflow, link them to an approved tracking issue before merge.

## Local setup

```bash
npm ci
npm run dev
```

## Quality gates

Run these before opening or updating a PR:

```bash
npm run test
npm run typecheck
npm run lint
npm run format:check
npm run build
npm audit --audit-level=high
```

## Pull request expectations

- Keep each PR to one clear work unit.
- Update docs when workflow, release, or contributor behavior changes.
- Do not include secrets, tokens, private client data, or generated build output.
- Use conventional commit messages if committing locally.

## License note

No open-source license has been selected yet. Do not assume reuse rights beyond what GitHub's terms allow for viewing and forking public repositories.
