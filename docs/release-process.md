# Release Process

This repo releases Production only from version tags. `develop` gets Vercel Preview deployments, `main` does not auto-deploy from branch pushes, and pushed `v*` tags trigger the Production deployment workflow.

## Quick path

1. Open and merge a release PR from `develop` to `main` after checks and reviews pass.
2. Sync `main`, create an annotated `v*` tag from `main`, and push the tag.
3. Create a GitHub Release with generated notes, add human Highlights, then confirm the Vercel Production workflow and production smoke check succeed.

## Release contract

| Ref       | Deployment behavior                                                                |
| --------- | ---------------------------------------------------------------------------------- |
| `develop` | Creates Vercel Preview deployments.                                                |
| `main`    | Does not auto-deploy from branch pushes.                                           |
| `v*` tags | Trigger `.github/workflows/vercel-production.yml` and deploy Production to Vercel. |

## Good release checklist

- [ ] Release PR from `develop` to `main` is opened.
- [ ] Required checks and reviews pass.
- [ ] Version metadata is updated before tagging, when applicable.
- [ ] Release PR is merged and local `main` is synced.
- [ ] Annotated `v*` tag is created from `main`.
- [ ] GitHub Release is created with generated notes and human Highlights.
- [ ] Vercel Production workflow succeeds.
- [ ] Production URL smoke check passes.

## Commands

Set the release version first:

```bash
VERSION=v1.2.3
```

Sync `main`:

```bash
git switch main
git pull --ff-only origin main
```

Create an annotated tag from `main`:

```bash
git tag -a "$VERSION" -m "Release $VERSION"
```

Push the tag to trigger Production deployment:

```bash
git push origin "$VERSION"
```

Create the GitHub Release with generated notes:

```bash
gh release create "$VERSION" --verify-tag --title "$VERSION" --generate-notes
```

Optional: preview generated notes before creating the release:

```bash
OWNER_REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
gh api "repos/$OWNER_REPO/releases/generate-notes" \
  -f tag_name="$VERSION" \
  -f target_commitish=main
```

## Release notes template

Use generated notes for the full change list, then add concise human context at the top.

```markdown
## Highlights

- What maintainers or users should notice first.

## Changes

- Generated release notes go here.

## Deployment

- Production deployment source: `<tag>`.
- Vercel Production workflow: `<link>`.

## Verification

- Checks completed before merge.
- Production smoke check completed at `<production-url>`.

## Known Notes

- Any known limitations, follow-ups, or operational notes.
```

## Rollback guidance

Do not delete tags casually after a public release. Tags and releases are part of the audit trail.

Prefer rollback by reverting the problematic change on `main`, then creating a newer corrective release and tag. If the issue needs an urgent production recovery, keep the recovery visible in Git history, GitHub Releases, and deployment history.
