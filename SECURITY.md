# Security Policy

This portfolio repository is a static public website. Please report security issues privately and avoid publishing exploit details before they are reviewed.

## Reporting a vulnerability

Email the maintainer using the contact path published on the live site:

https://www.devdigi.dev

Include:

- A clear description of the issue.
- Steps to reproduce or validate the concern.
- Impact and affected files, routes, or workflows.
- Any safe proof of concept that does not expose secrets or personal data.

## Please do not

- Open a public GitHub issue for sensitive security reports.
- Include secrets, tokens, private client data, or personal data in reports.
- Run destructive tests against the live site or deployment providers.

## Supported scope

| Area                                                    | Status       |
| ------------------------------------------------------- | ------------ |
| Static website source                                   | Supported    |
| GitHub Actions workflows                                | Supported    |
| Vercel deployment configuration documented in this repo | Supported    |
| Third-party services not controlled by this repo        | Out of scope |

## Dependency updates

Dependabot proposes dependency updates for npm and GitHub Actions. Maintainers triage those PRs and link them to an approved tracking issue before merge when following the protected workflow.
