---
emoji: 📊
description: Daily repository activity report as a GitHub issue
on:
  schedule: daily
  workflow_dispatch:
permissions:
  contents: read
  issues: read
  pull-requests: read
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  create-issue:
---

# Daily Repository Activity Report

## Task

Create a daily report issue for this repository.

Before collecting activity, exclude issues whose title starts with `Daily Repository Activity Report -` from new-issues and blocker results. Check whether today's report issue already exists; if it does, use `noop` rather than creating a duplicate.

Focus on:

1. New issues opened in the last 24 hours
2. Pull requests merged in the last 24 hours
3. Open blockers

Use GitHub data from this repository only.

For open blockers:

- Include open issues labeled `blocker` or `blocked`
- Include open pull requests labeled `blocker` or `blocked`
- If there are no blocker-labeled items, state that clearly

## Output Requirements

Create one issue titled:

`Daily Repository Activity Report - YYYY-MM-DD`

Replace `YYYY-MM-DD` with the actual UTC date in ISO format (for example, `2026-06-17`).

Issue body requirements:

- Use GitHub-flavored markdown
- Include sections:
  - `## Summary`
  - `## New Issues (Last 24h)`
  - `## Merged Pull Requests (Last 24h)`
  - `## Open Blockers`
- For each listed item, include number, title, and URL
- Include explicit counts in each section
- If a section has no items, write `None`

## Safe Outputs

- Use `create-issue` to publish the daily report.
- Always create the report issue when there is activity to report.
- Use `noop` with a short reason only when all three report sections would be `None`.
